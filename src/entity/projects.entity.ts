import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';

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
  static projectId: any;

  @ManyToOne(() => User, (user) => user.assignedProjects, { nullable: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  assignedUser: User;

  @ManyToMany(() => User, (user) => user.assignedProjects)
  @JoinTable({ name: 'project_user' })
  assignedUsers: User[];

  // @ManyToMany(() => User, (user) => user.projects)
  // @JoinTable()
  // users: User[];

  // @OneToMany(() => User, (user) => user.assignedProject)
  // assignedUsers: User[];

  // @ManyToOne(() => User, (user) => user.assignedProjects, { nullable: true })
  // @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  // assignedUser: User;

  // @OneToMany(() => UserProject, (userProject) => userProject.project)
  // assignedUsers: UserProject[];

  //
}
