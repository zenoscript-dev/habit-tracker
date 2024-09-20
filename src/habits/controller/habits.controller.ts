import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HabitsService } from '../service/habits.service';
import { CreateHabitDto } from '../dto/createHabit.dto';
import { UpdateHabitDto } from '../dto/updateHabit.dto';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post()
  async create(@Body() createHabitDto: CreateHabitDto) {
    try {
      return await this.habitsService.create(createHabitDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.habitsService.findAll();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch habits',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const habit = await this.habitsService.findOne(id);
      if (!habit) {
        throw new HttpException('Habit not found', HttpStatus.NOT_FOUND);
      }
      return habit;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHabitDto: UpdateHabitDto,
  ) {
    try {
      const updatedHabit = await this.habitsService.update(id, updateHabitDto);
      if (!updatedHabit) {
        throw new HttpException('Habit not found', HttpStatus.NOT_FOUND);
      }
      return updatedHabit;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.habitsService.remove(id);
      return result;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
