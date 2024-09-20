import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PermissionStatus } from '../model/enum/permissionstatus.enum';

export class CreatePermissionDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsEnum(PermissionStatus)
  status: PermissionStatus;
}
