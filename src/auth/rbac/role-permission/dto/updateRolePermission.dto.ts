import { IsEnum, IsNumber, IsObject, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RolePermissionStatus } from '../model/enums/rolePermissionStatus.enum';
import { Roles } from '../../role/model/role.model';
import { Permission } from '../../permission/model/permission.model';

export class UpdateRolePermissionDto {
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  id: number;

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
  @IsObject()
  permission: Permission;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsEnum(RolePermissionStatus)
  status: RolePermissionStatus;
}
