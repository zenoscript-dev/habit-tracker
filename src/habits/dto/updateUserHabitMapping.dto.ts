import { PartialType } from '@nestjs/swagger';
import { CreateUserHabitMappingDto } from './createUserHabitMapping.dto';


export class UpdateUserHabitMappingDto extends PartialType(CreateUserHabitMappingDto) {}
