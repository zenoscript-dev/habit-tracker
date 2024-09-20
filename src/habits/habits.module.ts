import { Logger, Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from "./models/habit.model"

@Module({
  imports: [TypeOrmModule.forFeature([Habit])],
  controllers: [HabitsController],
  providers: [HabitsService, Logger],
})
export class HabitsModule {}
