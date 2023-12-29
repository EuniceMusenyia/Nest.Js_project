import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';
import { UserProject } from './user-project.entity';

@Entity('projects', { schema: 'public' })
export class Project {
  @PrimaryGeneratedColumn({ name: 'project_id' })
  projectId: number;

  @Column({ name: 'project_name', type: 'varchar' })
  projectName: string;

  @Column('timestamp without time zone', {
    name: 'application_deadline',
    nullable: true,
  })
  applicationDeadline: Date | null;

  @Column('int4', {
    name: 'career_cards',
    array: true,
    nullable: true,
    default: null,
  })
  careerCards: number[] | null;

  @ManyToOne(() => User, (user) => user.assignedProjects, { nullable: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  assignedUser: User;

// @ManyToOne(() => User, (user) => user.assignedProjects, { nullable: true })
// @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
// assignedUser: User;

// @OneToMany(() => User, (user) => user.assignedProject)
// assignedUsers: User[];

@OneToMany(() => UserProject, (userProject) => userProject.project)
assignedUsers: UserProject[];

}
