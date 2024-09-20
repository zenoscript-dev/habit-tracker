import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { Base } from 'src/core/models/base.model';
import { User } from 'src/user/models/user.model';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('role')
export class Roles extends Base {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column({ nullable: false })
  description: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  status: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
