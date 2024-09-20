import { Base } from 'src/core/models/base.model';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
  Unique,
  Index,
  In,
} from 'typeorm';
import { RolePermissionStatus } from './enums/rolePermissionStatus.enum';

@Entity('rolepermission')
@Unique(['roleId', 'permissionId'])
export class RolePermission extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('roleId')
  @Column({ nullable: false })
  roleId: string;

  @Index('permissionId')
  @Column({ nullable: false })
  permissionId: string;

  // @Column({ nullable: false })
  // moduleId: number;

  @Column({
    type: 'enum',
    enum: RolePermissionStatus,
    default: RolePermissionStatus.ACTIVE,
    nullable: false,
  })
  status: RolePermissionStatus;
}
