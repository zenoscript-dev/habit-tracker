import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
  } from 'typeorm';

  import { Habit } from './habit.model';
import { User } from 'src/user/models/user.model';
  
  @Entity('user_habit_mapping')
  export class UserHabitMapping {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;
  
    @ManyToOne(() => Habit)
    @JoinColumn({ name: 'habitId' })
    habit: Habit;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
  
    @Column({ type: 'enum', enum: ['active', 'inactive'] })
    status: string;
  
    @Column({ type: 'enum', enum: ['personal', 'shared'] })
    type: string;
  
    @Column({ type: 'enum', enum: ['daily', 'weekly', 'monthly'] })
    frequency: string;
  }
  