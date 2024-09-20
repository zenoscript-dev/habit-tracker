import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export enum HabitStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned',
}

@Entity({ name: 'habits' })
@Index(['id']) // Creating an index for (id, name)
export class Habit {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4(); // UUID as primary key

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  icon: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: HabitStatus,
    default: HabitStatus.ACTIVE,
  })
  status: HabitStatus;
}
