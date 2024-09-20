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
import { UserHabitMappingService } from '../service/userHabitMapping.service';
import { CreateUserHabitMappingDto } from '../dto/createUserHabitMapping.dto';
import { UpdateUserHabitMappingDto } from '../dto/updateUserHabitMapping.dto';

  
  @Controller('user-habit-mapping')
  export class UserHabitMappingController {
    constructor(private readonly userHabitMappingService: UserHabitMappingService) {}
  
    @Post()
    async create(@Body() createDto: CreateUserHabitMappingDto) {
      try {
        return await this.userHabitMappingService.create(createDto);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Get()
    async findAll() {
      try {
        return await this.userHabitMappingService.findAll();
      } catch (error) {
        throw new HttpException('Failed to fetch User-Habit mappings', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      try {
        return await this.userHabitMappingService.findOne(id);
      } catch (error) {
        throw new HttpException('Failed to fetch User-Habit mapping', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDto: UpdateUserHabitMappingDto) {
      try {
        return await this.userHabitMappingService.update(id, updateDto);
      } catch (error) {
        throw new HttpException('Failed to update User-Habit mapping', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      try {
        return await this.userHabitMappingService.remove(id);
      } catch (error) {
        throw new HttpException('Failed to remove User-Habit mapping', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  