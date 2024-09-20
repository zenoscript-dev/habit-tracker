import { Logger, Module } from '@nestjs/common';
import { RolePermissionController } from './controller/role-permission.controller';
import { RolePermissionService } from './service/role-permission.service';
import { CachingUtil } from 'src/core/utils/caching.util';
import { DBClient } from 'src/core/db/dbclient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from './model/rolePermission.model';
import { Roles } from '../role/model/role.model';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission, Roles])],
  controllers: [RolePermissionController],
  providers: [RolePermissionService, Logger, DBClient, CachingUtil],

  exports: [RolePermissionService],
})
export class RolePermissionModule {}
