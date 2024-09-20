import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateHabitDto } from '../dto/createHabit.dto';
import { UpdateHabitDto } from '../dto/updateHabit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Habit } from '../models/habit.model';
import { Repository } from 'typeorm';

@Injectable()
export class HabitsService {
  constructor(
    private logger: Logger,
    @InjectRepository(Habit)
    private habitRepo: Repository<Habit>
  ) {}

  // Create a new habit
  async create(createHabitDto: CreateHabitDto) {
    this.logger.log(`Creating ${createHabitDto.name}`);
    try {
      const isHabitExists = await this.isHabitExists(createHabitDto.name);
      if (isHabitExists) {
        throw new HttpException('Habit already exists', HttpStatus.BAD_REQUEST);
      }

      const newHabit = this.habitRepo.create(createHabitDto);
      return await this.habitRepo.save(newHabit);
    } catch (error) {
      this.logger.error(`Failed to create habit: ${createHabitDto.name}`, error.stack);
      
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('Failed to create habit', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Find all habits
  async findAll(): Promise<Habit[]> {
    this.logger.log('Fetching all habits');
    try {
      const habits = await this.habitRepo.find();
      return habits;
    } catch (error) {
      this.logger.error('Failed to fetch all habits', error.stack);
      throw new HttpException('Failed to fetch habits', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Find one habit by id
  async findOne(id: string): Promise<Habit> {
    this.logger.log(`Fetching habit with id ${id}`);
    try {
      const habit = await this.habitRepo.findOne({ where: { id } });
      if (!habit) {
        throw new HttpException('Habit not found', HttpStatus.NOT_FOUND);
      }
      return habit;
    } catch (error) {
      this.logger.error(`Failed to fetch habit with id ${id}`, error.stack);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException('Failed to fetch habit', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Update a habit by id
  async update(id: string, updateHabitDto: UpdateHabitDto): Promise<Habit> {
    this.logger.log(`Updating habit with id ${id}`);
    try {
      const habit = await this.habitRepo.findOne({ where: { id } });
      if (!habit) {
        throw new HttpException('Habit not found', HttpStatus.NOT_FOUND);
      }

      // Merging updated values
      const updatedHabit = Object.assign(habit, updateHabitDto);
      return await this.habitRepo.save(updatedHabit);
    } catch (error) {
      this.logger.error(`Failed to update habit with id ${id}`, error.stack);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException('Failed to update habit', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Remove a habit by id
  async remove(id: string): Promise<void> {
    this.logger.log(`Removing habit with id ${id}`);
    try {
      const result = await this.habitRepo.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Habit not found', HttpStatus.NOT_FOUND);
      }
      this.logger.log(`Habit with id ${id} removed successfully`);
    } catch (error) {
      this.logger.error(`Failed to remove habit with id ${id}`, error.stack);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException('Failed to remove habit', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Check if a habit already exists
  async isHabitExists(name: string): Promise<boolean> {
    this.logger.log(`Checking if habit exists with name ${name}`);
    try {
      const habitExists = await this.habitRepo.findOne({ where: { name } });
      return !!habitExists;
    } catch (error) {
      this.logger.error(`Error finding habit with name ${name}`, error.stack);
      throw new HttpException(
        `Error finding habit: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
