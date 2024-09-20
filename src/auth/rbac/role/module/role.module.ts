import { Logger, Module } from '@nestjs/common';

import { CachingUtil } from 'src/core/utils/caching.util';

import { RoleController } from '../controller/role.controller';
import { RoleService } from '../service/role.service';
import { DBClientModule } from 'src/core/db/dbclient.module';
import { DBClient } from 'src/core/db/dbclient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/models/user.model';
import { RoleAssign } from '../model/roleAssign.model';
import { Roles } from '../model/role.model';

@Module({
  imports: [TypeOrmModule.forFeature([User, RoleAssign, Roles])],

  controllers: [RoleController],

  providers: [RoleService, Logger, DBClient, CachingUtil],

  exports: [RoleService],
})
export class RoleModule {}
