import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from './users.entity';

@Entity('user-details', { schema: 'public' })
@Unique(['userId'])
export class UserDetails {
  @PrimaryGeneratedColumn({ name: 'details_id' })
  detailsId: number;

  @Column({ name: 'user_id', type: 'integer' })
  userId: number;

  @Column({ name: 'email_address', type: 'text', nullable: true })
  emailAddress: string;

  @Column({ name: 'total_projects', type: 'integer', default: 0 })
  totalProjects: number;

  @Column({ name: 'project_count', type: 'integer', default: 0 })
  projectCount: number;

  // @OneToOne(() => User, (user) => user.userDetails)
  // @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  // user: User;

  @OneToOne(() => User, (user) => user.userDetails, { cascade: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user: User;
}
