import { IsEnum, IsObject, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleStatus } from '../model/enums/roleStatus.enum';

export class CreateRoleDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    type: String,
    description: 'This is a optional property',
  })
  description?: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsEnum(RoleStatus)
  status: RoleStatus;
}
