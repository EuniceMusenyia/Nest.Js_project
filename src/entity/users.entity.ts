/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDetails } from './user-details.entity';
import { Project } from './projects.entity';

@Entity('users', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  userId: number;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({ name: 'age', type: 'integer' })
  age: number; 

  @OneToOne(() => UserDetails, {createForeignKeyConstraints:false, eager: false, nullable:false})   
  @JoinColumn({name: 'id', referencedColumnName: 'userId'}) 
  userDetails: UserDetails;

  @OneToMany(() => Project, (project) => project.assignedUser) 
  assignedProjects: Project[];

@ManyToOne(() => Project, (project) => project.assignedUsers, { nullable: true })
@JoinColumn({ name: 'user_id', referencedColumnName: '' })
assignedProject: Project;


@ManyToMany(() => Project, project => project.users)
@JoinTable()
projects: Project[];

// @OneToMany(() => Project, (project) => project.assignedUser) 
// assignedProjects: Project[];


// @OneToMany(() => UserProject, (userProject) => userProject.user)
// assignedProjects: UserProject[];


}
