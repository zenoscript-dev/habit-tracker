import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateRolePermissionDto } from '../dto/createRolePermission.dto';
import { RolePermissionStatus } from '../model/enums/rolePermissionStatus.enum';
import { RolePermission } from '../model/rolePermission.model';
import { RolePermissionBadRequestException } from '../exception/rolePermissionBadRequestException.exception';
import { RolePermissionExistsException } from '../exception/rolePermissionExistsException.exception';
import { UpdateRolePermissionDto } from '../dto/updateRolePermission.dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate/dist/interfaces';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import * as DateUtil from 'src/core/utils/datetime.util';
import { DBClient } from 'src/core/db/dbclient.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from '../../role/model/role.model';

@Injectable()
export class RolePermissionService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Roles)
    private roleRepo: Repository<Roles>,
    @InjectRepository(RolePermission)
    private rolePermissionRepo: Repository<RolePermission>,
  ) {}

  async create(
    createRolepermission: CreateRolePermissionDto,
  ): Promise<RolePermission | RolePermission[]> {
    let singlePermission = true;

    // Validate presence of required fields
    if (createRolepermission.permission) {
      if (
        !createRolepermission.permission.id ||
        !createRolepermission.role.id
      ) {
        throw new RolePermissionBadRequestException(
          'Missing roleId or permissionId',
        );
      }
    } else if (createRolepermission.permissions) {
      singlePermission = false;
      const perms = createRolepermission.permissions;
      for (const perm of perms) {
        if (!perm.id || !createRolepermission.role.id) {
          throw new HttpException(
            'Missing roleId or permissionId',
            HttpStatus.NOT_FOUND,
          );
        }
      }
    }

    if (singlePermission) {
      this.logger.log(
        'Creating single role permission: ' +
          JSON.stringify(createRolepermission),
        RolePermissionService.name,
      );
      let rolePermission = await this.getRolePermissionByRoleIdAndPermissionId(
        createRolepermission.role.id,
        createRolepermission.permission.id,
      );

      if (rolePermission) {
        throw new RolePermissionExistsException();
      } else {
        try {
          // Create a new RolePermission entity
          let newRolePermission = new RolePermission();
          newRolePermission.permissionId = createRolepermission.permission.id;
          newRolePermission.roleId = createRolepermission.role.id;
          newRolePermission.status =
            createRolepermission.status || RolePermissionStatus.ACTIVE;

          // Save the entity to the database
          const savedEntity =
            await this.rolePermissionRepo.save(newRolePermission);
          return savedEntity;
        } catch (error) {
          this.logger.error(
            'Failed to create role permission: ' + error.message,
            RolePermissionService.name,
          );
          throw new HttpException(
            'Failed to create role permission',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    } else {
      const perms = createRolepermission.permissions;
      const savedEntities = [];
      for (const perm of perms) {
        this.logger.log(
          'Creating role permission: ' + JSON.stringify(createRolepermission),
          RolePermissionService.name,
        );
        let rolePermission =
          await this.getRolePermissionByRoleIdAndPermissionId(
            createRolepermission.role.id,
            perm.id,
          );

        if (!rolePermission) {
          try {
            // Create a new RolePermission entity for each permission
            let newRolePermission = new RolePermission();
            newRolePermission.permissionId = perm.id;
            newRolePermission.roleId = createRolepermission.role.id;
            newRolePermission.status =
              createRolepermission.status || RolePermissionStatus.ACTIVE;

            // Save the entity to the database
            const savedEntity =
              await this.rolePermissionRepo.save(newRolePermission);
            savedEntities.push(savedEntity);
          } catch (error) {
            this.logger.error(
              'Failed to create role permission: ' + error.message,
              RolePermissionService.name,
            );
            throw new HttpException(
              'Failed to create role permission',
              HttpStatus.BAD_REQUEST,
            );
          }
        }
      }
      return savedEntities;
    }
  }

  async getRolePermissionByRoleIdAndPermissionId(
    roleId: string,
    permissionId: string,
  ): Promise<RolePermission> {
    try {
      this.logger.log(
        `get role permission By roleId and permissionId: ${roleId}, ${permissionId}`,
        RolePermissionService.name,
      );
      const rolePermission = await this.rolePermissionRepo.findOne({
        where: {
          roleId: roleId,
          permissionId: permissionId,
        },
      });
      console.log('rolepermiasjuoiuj', rolePermission);
      return rolePermission;
    } catch (error) {
      this.logger.error(
        'Failed to get role permission' + error,
        RolePermissionService.name,
      );
      throw new HttpException(
        'Failed to create role permission',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    updateRolePermissionDto: UpdateRolePermissionDto,
  ): Promise<RolePermission> {
    this.logger.log(
      `Updating role permission with ID ${id}`,
      RolePermissionService.name,
    );

    // Find the existing RolePermission
    const rolePermission = await this.rolePermissionRepo.findOne({
      where: { id },
    });

    if (!rolePermission) {
      throw new HttpException(
        ' role permission not found ',
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      rolePermission.roleId = updateRolePermissionDto.role.id;
      rolePermission.permissionId = updateRolePermissionDto.permission.id;
      rolePermission.status = updateRolePermissionDto.status;

      await this.rolePermissionRepo.save(rolePermission);

      return rolePermission;
    } catch (error) {
      this.logger.error(
        'Failed to update role permission',
        error,
        RolePermissionService.name,
      );
      throw new HttpException(
        'Failed to update entity',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: number): Promise<RolePermission> {
    try {
      this.logger.log(
        `Getting role permission by ID: ${id}`,
        RolePermissionService.name,
      );

      const rolePermission = await this.rolePermissionRepo.findOne({
        where: { id },
      });

      if (!rolePermission) {
        throw new HttpException(
          ' role permission not found ',
          HttpStatus.NOT_FOUND,
        );
      }

      return rolePermission;
    } catch (error) {
      this.logger.error(
        'Failed to get role permission',
        error,
        RolePermissionService.name,
      );
      throw new HttpException(
        'Failed to get role permission',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async paginate(
    options: IPaginationOptions,
    sort: string,
    sinceDays: number,
    status: string,
  ): Promise<Pagination<RolePermission>> {
    this.logger.log('get all role permission ', RolePermissionService.name);

    this.logger.log(
      'Calling .. get all role permission.. ',
      RolePermissionService.name,
    );
    let rolePermissionList = await this.getAll();
    let rolePermissionIds = [];
    for (let rolePermission of rolePermissionList) {
      rolePermissionIds.push(rolePermission.id);
    }
    const updatedAt = DateUtil.currentDateTime();
    updatedAt.setDate(updatedAt.getDate() - sinceDays);

    const qb = this.rolePermissionRepo.createQueryBuilder('q');
    qb.select([
      'q.id',
      'q.permissionId',
      'q.roleId',
      'q.status',
      'q.createdAt',
      'q.createdBy',
    ]);
    qb.where('q.id in (:ids)', { ids: rolePermissionIds });

    if (status) {
      qb.andWhere('q.status = :status', { status: status });
    }
    if (sort === 'ASC') qb.orderBy('q.updatedAt', 'ASC');
    else qb.orderBy('q.updatedAt', 'DESC');
    return paginate<RolePermission>(qb, options);
  }

  async getAll(): Promise<RolePermission[]> {
    try {
      const rolePermissionList = await this.rolePermissionRepo.find();
      if (!rolePermissionList)
        throw new HttpException(
          ' role permission not found ',
          HttpStatus.NOT_FOUND,
        );
      return rolePermissionList;
    } catch (error) {
      this.logger.error(`Failed to get role permission list` + error);
      throw new HttpException(
        'Failed to get role permission list',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllRole(): Promise<any> {
    try {
      const getAllRole = await this.rolePermissionRepo.find();

      console.log('RolePermission12123', getAllRole);

      return getAllRole;
    } catch (err) {
      this.logger.error(`Failed to get role permission list` + err);
      throw new HttpException(
        'Failed to get role permission list',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteByRoleAndPermissionId(
    roleId: string,
    permissonId: string,
  ): Promise<any> {
    this.logger.log(
      'Calling .. delete role permission service by roleId and permissionId.. ',
      RolePermissionService.name,
    );

    const rolePermission = await this.getRolePermissionByRoleIdAndPermissionId(
      roleId,
      permissonId,
    );
    this.logger.log(
      'Role permission exists .. ' + rolePermission,
      RolePermissionService.name,
    );
    if (!rolePermission)
      throw new HttpException(
        ' role permission not found ',
        HttpStatus.NOT_FOUND,
      );
    try {
      const deleteRolePermission = await this.rolePermissionRepo.delete(
        rolePermission.id,
      );
      return deleteRolePermission;
    } catch (error) {
      this.logger.error(
        'Failed to delete role permission' + error,
        RolePermissionService.name,
      );
      throw new HttpException(
        'Failed to delete role permission',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
