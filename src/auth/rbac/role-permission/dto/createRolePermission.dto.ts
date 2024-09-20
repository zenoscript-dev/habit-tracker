import { IsEnum, IsNumber, IsObject, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RolePermissionStatus } from '../model/enums/rolePermissionStatus.enum';
import MutuallyExclusive from 'src/core/decorators/mutualexclusive.decorators';
import { Roles } from '../../role/model/role.model';
import { Permission } from '../../permission/model/permission.model';

export class CreateRolePermissionDto {
  @ApiProperty({
    type: Roles,
    description: 'This is a required property',
  })
  @IsObject()
  role: Roles;

  @ApiProperty({
    type: Permission,
    description: 'This is a required property',
  })
  @MutuallyExclusive('perms')
  permission?: Permission;

  @ApiProperty({
    type: Permission,
    description: 'This is a required property',
  })
  @MutuallyExclusive('perms')
  permissions?: Permission[];

  @IsEnum(RolePermissionStatus)
  status: RolePermissionStatus;
}
