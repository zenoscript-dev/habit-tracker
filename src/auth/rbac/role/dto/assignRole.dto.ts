import { IsArray, IsString, ArrayNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class AssignRolesDto {
  @ApiProperty({
    type: String,
    description: 'User ID to assign roles to',
  })
  @IsUUID() // This ensures that the userId is a valid UUID format, which is common for user IDs.
  userId: UUID;

  @ApiProperty({
    type: [String],
    description: 'Array of Role IDs to assign',
    example: [
      '111e4567-e89b-12d3-a456-426614174001',
      '111e4567-e89b-12d3-a456-426614174002',
    ],
  })
  @IsArray() // This ensures that the array is not empty. // Ensures all role IDs are valid UUIDs.
  roleIds: string[];
}
