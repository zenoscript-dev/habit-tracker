import { Base } from 'src/core/models/base.model';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserStatus } from '../enums/userStatus.enum';
import { UUID } from 'crypto';
import { Roles } from 'src/auth/rbac/role/model/role.model';

@Entity('users')
@Index('IDX_UNIQUE_LOGIN_ID', ['loginId'], { unique: true })
export class User extends Base {
  @PrimaryGeneratedColumn('uuid')
  @Index('IDX_UNIQUE_USER_ID')
  id: UUID;

  @Column({ unique: true, nullable: false })
  loginId: string;
  @Column({ unique: true, nullable: false })
  userName: string;

  @Column({ select: true, nullable: false })
  password: string;

  @Column({ nullable: false })
  userId: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
    nullable: false,
  })
  status: UserStatus;

  // @Column({ nullable: true })
  // profilepic: string;

  @Column({ nullable: true })
  lastLoggedIn: Date;

  // @ManyToMany(() => Roles, { cascade: true })
  // @JoinTable({
  //   name: 'user_roles', // the name of the join table
  //   joinColumn: { name: 'userId', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
  // })
  roles: Roles[];

  @BeforeInsert()
  @BeforeUpdate()
  toLowerCaseloginId() {
    if (this.loginId) {
      this.loginId = this.loginId.toLowerCase();
      this.loginId = this.loginId.trim();
    }
  }
}
