import { Logger, Module } from '@nestjs/common';
import { HabitsService } from './service/habits.service';
import { HabitsController } from './controller/habits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from "./models/habit.model"
import { UserHabitMappingService } from './service/userHabitMapping.service';
import { UserModule } from 'src/user/user.module';
import { UserHabitMapping } from './models/userHabitMapping.model';
import { UserHabitMappingController } from './controller/userHabitMapping.controller';
import { User } from 'src/user/models/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([Habit, User,UserModule, UserHabitMapping])],
  controllers: [HabitsController, UserHabitMappingController],
  providers: [HabitsService, Logger, UserHabitMappingService],
})
export class HabitsModule {}
