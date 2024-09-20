import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserHabitMapping } from '../models/userHabitMapping.model';
import { CreateUserHabitMappingDto } from '../dto/createUserHabitMapping.dto';
import { UpdateUserHabitMappingDto } from '../dto/updateUserHabitMapping.dto';
import { Habit } from '../models/habit.model';
import { User } from 'src/user/models/user.model';

@Injectable()
export class UserHabitMappingService {
  constructor(
    @InjectRepository(UserHabitMapping)
    private readonly userHabitMappingRepo: Repository<UserHabitMapping>,
    
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Habit)
    private readonly habitRepo: Repository<Habit>,
  ) {}

  async create(createDto: CreateUserHabitMappingDto) {
    const { userId, habitId } = createDto;

    // Validate if the user exists
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Validate if the habit exists
    const habit = await this.habitRepo.findOne({ where: { id: habitId } });
    if (!habit) {
      throw new HttpException('Habit not found', HttpStatus.NOT_FOUND);
    }

    // Check if the user is already mapped to this habit
    const existingMapping = await this.userHabitMappingRepo.findOne({
      where: { user: { id: userId }, habit: { id: habitId } },
    });

    if (existingMapping) {
      throw new HttpException('User is already mapped to this habit', HttpStatus.CONFLICT);
    }

    try {
      const newUserHabitMapping = this.userHabitMappingRepo.create(createDto);
      newUserHabitMapping.user = user;
      newUserHabitMapping.habit = habit;
      return await this.userHabitMappingRepo.save(newUserHabitMapping);
    } catch (error) {
      throw new HttpException('Failed to add habit', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await this.userHabitMappingRepo.find({ relations: ['user', 'habit'] });
    } catch (error) {
      throw new HttpException('Failed to retrieve User Habits', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const mapping = await this.userHabitMappingRepo.findOne({
        where: { id },
        relations: ['user', 'habit'],
      });
      if (!mapping) {
        throw new HttpException('User is not mapped to this Habit', HttpStatus.NOT_FOUND);
      }
      return mapping;
    } catch (error) {
      throw new HttpException('Failed to retrieve User Habit deails', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateDto: UpdateUserHabitMappingDto) {
    const mapping = await this.findOne(id);

    // Validate if the habit being updated exists (if habitId is being updated)
    if (updateDto.habitId) {
      const habit = await this.habitRepo.findOne({ where: { id: updateDto.habitId } });
      if (!habit) {
        throw new HttpException('Habit not found', HttpStatus.NOT_FOUND);
      }
      mapping.habit = habit;
    }

    Object.assign(mapping, updateDto);
    try {
      return await this.userHabitMappingRepo.save(mapping);
    } catch (error) {
      throw new HttpException('Failed to update User Habit', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    const mapping = await this.findOne(id);
    try {
      await this.userHabitMappingRepo.remove(mapping);
      return { message: 'Habit removed successfully' };
    } catch (error) {
      throw new HttpException('Failed to remove User Habit', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
