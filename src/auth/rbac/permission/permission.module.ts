import { Logger, Module } from '@nestjs/common';
import { PermissionService } from './service/permission.service';
import { PermissionController } from './controller/permission.controller';
import { CachingUtil } from 'src/core/utils/caching.util';
import { DBClient } from 'src/core/db/dbclient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './model/permission.model';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],

  controllers: [PermissionController],

  providers: [PermissionService, Logger, DBClient, CachingUtil],

  exports: [PermissionService],
})
export class PermissionModule {}
