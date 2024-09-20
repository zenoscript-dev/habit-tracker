import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateRoleDto } from '../dto/createRole.dto';
import { RoleStatus } from '../model/enums/roleStatus.enum';
import { UpdateRoleDto } from '../dto/updateRole.dto';
import { RoleNotFoundException } from '../exception/roleNotFoundException.exception';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { AssignRolesDto } from '../dto/assignRole.dto';
import { User } from 'src/user/models/user.model';
import { Roles } from '../model/role.model';
import { In, Repository } from 'typeorm';
import { RoleAssign } from '../model/roleAssign.model';
import { DBClient } from 'src/core/db/dbclient.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Roles)
    private roleRepo: Repository<Roles>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(RoleAssign)
    private roleAssignmentRepo: Repository<RoleAssign>,
  ) {}

  async create(createRole: CreateRoleDto): Promise<any> {
    try {
      createRole.status = createRole.status || RoleStatus.ACTIVE;
      const newRole = this.roleRepo.create(createRole);
      const roleSaved = await this.roleRepo.save(newRole);
      return roleSaved;
    } catch (err) {
      this.logger.error('Error creating  role', RoleService.name, err);
      throw err;
    }
  }

  async update(id: string, updateRole: UpdateRoleDto): Promise<any> {
    this.logger.log('Updated role', RoleService.name);
    try {
      const role = await this.roleRepo.findOne({ where: { id } });
      if (!role) {
        throw new HttpException(`Role Not Found`, HttpStatus.NOT_FOUND);
      } else {
        this.logger.log('Role updated successfully');
        return await this.roleRepo.update(id, updateRole);
      }
    } catch (err) {
      this.logger.error('Error updating role', RoleService.name, err);
      throw err;
    }
  }

  async getOne(id: string): Promise<any> {
    try {
      if (!id) {
        throw new RoleNotFoundException('Role id is required');
      }
      const roleById = await this.roleRepo.find({ where: { id } });
      if (!roleById) {
        throw new HttpException('Role not found', HttpStatus.BAD_REQUEST);
      }
      console.log('roleByIds: ', roleById);

      return roleById;
    } catch (err) {
      this.logger.error(`Error in the getting roles :${err.stack}`);
      throw new RoleNotFoundException('Error in fetching the roles details');
    }
  }

  async getAllRole(): Promise<any> {
    try {
      const getAllRole = await this.roleRepo.find();
      return getAllRole;
    } catch (err) {
      this.logger.error(`error in fetching the Role details ${err.stack}`);
      throw err;
    }
  }

  async delete(id: string): Promise<any> {
    this.logger.log('Deleted role', RoleService.name);
    try {
      const role = await this.roleRepo.findOne({
        where: { id },
      });
      if (!role) {
        throw new HttpException(`Role not found`, HttpStatus.NOT_FOUND);
      } else {
        this.logger.log('Role deleted successfully');
        return await this.roleRepo.delete({ id });
      }
    } catch (err) {
      this.logger.error('Error deleting role', RoleService.name, err);
      throw err;
    }
  }

  async assignRoleToUsers(assignRoleDto: AssignRolesDto): Promise<any> {
    try {
      // Fetch roles
      const roleDetails = await this.roleRepo.find({
        where: { id: In(assignRoleDto.roleIds) },
      });

      // Check roles existence
      if (roleDetails.length !== assignRoleDto.roleIds.length) {
        throw new HttpException(
          'One or more roles not found',
          HttpStatus.NOT_FOUND,
        );
      }

      // Fetch users
      const users = await this.userRepo.find({
        where: { id: assignRoleDto.userId },
      });

      // Check user existence
      if (!users.length) {
        throw new HttpException(
          `User with ID ${assignRoleDto.userId} not found`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = users[0];

      // Update user roles
      user.roles = roleDetails;

      // Save user with updated roles
      await this.userRepo.save(user);

      // Deactivate previous role assignments
      await this.roleAssignmentRepo.update(
        { userId: user.id },
        { status: RoleStatus.INACTIVE },
      );

      // Save new role assignments
      for (const role of roleDetails) {
        const roleAssign = new RoleAssign();
        roleAssign.roleId = role.id;
        roleAssign.userId = user.id;
        roleAssign.status = RoleStatus.ACTIVE;
        roleAssign.createdBy = 'platform';
        roleAssign.createdAt = new Date();
        roleAssign.updatedBy = 'platform';
        roleAssign.updatedAt = new Date();

        // Save the role assignment
        await this.roleAssignmentRepo.save(roleAssign);
      }

      this.logger.log(`Roles assigned successfully for user ${user.userId}`);
      return { message: 'Roles assigned successfully', user };
    } catch (err) {
      this.logger.error('Error assigning roles', err.stack);
      throw err;
    }
  }
}
