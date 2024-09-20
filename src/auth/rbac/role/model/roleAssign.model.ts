import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { basename } from 'path';
import { Base } from 'src/core/models/base.model';
import { User } from 'src/user/models/user.model';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { RoleStatus } from './enums/roleStatus.enum';

@Entity('role-assign')
export class RoleAssign extends Base {
  @ApiProperty({
    type: String,
    description: 'Primary key of the RoleAssign entity',
  })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  roleId: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: RoleStatus,
    default: RoleStatus.ACTIVE,
  })
  status: RoleStatus;
}
