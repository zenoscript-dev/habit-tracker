import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import { UserContext } from 'src/core/userContext.payload';
import { CreatePermissionDto } from '../dto/createPermission.dto';
import { promises } from 'dns';

import { permission } from 'process';
import { Permission } from '../model/permission.model';
import { UpdatePermissionDto } from '../dto/updatePremission.dto';
import { PermissionNotFoundException } from '../exception/permissionNotFound.exception';
import { DBClient } from 'src/core/db/dbclient.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<any> {
    this.logger.log(
      'Creating permission for candidate',
      PermissionService.name,
    );
    try {
      // Check if the permission already exists
      const existingPermission = await this.permissionRepo.findOne({
        where: {
          // Replace these fields with those that uniquely identify a permission
          name: createPermissionDto.name,
          // Add any other unique fields if necessary
        },
      });

      if (existingPermission) {
        // If a permission with the same attributes exists, throw an exception
        throw new HttpException('Permission Already Exists', HttpStatus.FOUND);
      }

      // Create a new permission instance
      const permission = this.permissionRepo.create(createPermissionDto);

      // Save the new permission to the database
      const permissionSaved = await this.permissionRepo.save(permission);

      return permissionSaved;
    } catch (error) {
      this.logger.error(
        'Error creating permission',
        PermissionService.name,
        error,
      );
      throw error;
    }
  }

  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<any> {
    this.logger.log('Updating permission', PermissionService.name);
    try {
      const updtaePermission = await this.permissionRepo.findOne({
        where: { id },
      });
      if (!updtaePermission) {
        throw new HttpException(
          'Could not find permission',
          HttpStatus.NOT_FOUND,
        );
      } else {
        this.logger.log('Permission updated successfully');
        return await this.permissionRepo.update(id, updatePermissionDto);
      }
    } catch (error) {
      this.logger.error(
        'Error updating permission',
        PermissionService.name,
        error,
      );
      throw error;
    }
  }

  async getById(id: string): Promise<Permission> {
    try {
      this.logger.log(`get permission id: ${id}`, PermissionService.name);
      const permission = await this.permissionRepo.findOne({
        where: {
          id: id,
        },
      });
      return permission;
    } catch (error) {
      this.logger.error(`Failed to get permission with id: ${id}` + error);
      throw new HttpException(
        'Failed to get permission with id',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getAllPermission(): Promise<any> {
    try {
      const getAllPermission = await this.permissionRepo.find();
      if (!getAllPermission) {
        throw new HttpException('No permission found', HttpStatus.NO_CONTENT);
      }
      return getAllPermission;
    } catch (err) {
      this.logger.error(
        `error in fetching the purchase order details ${err.stack}`,
      );
      throw err;
    }
  }
}
