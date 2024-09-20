import { IsEnum, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateUserHabitMappingDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  habitId: string;

  @IsEnum(['active', 'inactive'])
  status: string;

  @IsEnum(['personal', 'shared'])
  type: string;

  @IsEnum(['daily', 'weekly', 'monthly'])
  frequency: string;
}
