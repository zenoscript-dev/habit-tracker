import { ApiProperty } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';
import { Base } from 'src/core/models/base.model';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { PermissionStatus } from './enum/permissionstatus.enum';

@Entity('permission')
export class Permission extends Base {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @PrimaryColumn({ length: 50 })
  id: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column({ nullable: false, length: 100 })
  name: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column({
    type: 'enum',
    enum: PermissionStatus,
    default: PermissionStatus.ACTIVE,
    nullable: false,
  })
  status: PermissionStatus;

  // module: AppModule;
}
