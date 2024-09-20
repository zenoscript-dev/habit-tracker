import { PartialType } from '@nestjs/swagger';
import { CreateHabitDto } from './createHabit.dto';

export class UpdateHabitDto extends PartialType(CreateHabitDto) {}
