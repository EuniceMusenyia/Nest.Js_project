/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
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


  @OneToOne(() => UserDetails, {createForeignKeyConstraints:false, eager: true,nullable:false})   
  @JoinColumn({name: 'id', referencedColumnName: 'userId'}) 
  userDetails: UserDetails;
  totalProjects: any;

  @OneToMany(() => Project,(project) => project.assignedUser) 
assignedProjects: Project[];
    userProjects: any;

//     @ManyToMany(() => Project, (project) => project.assignedUsers)
// assignedProjects: Project[];

  // @OneToMany(() => Project, (project) => project.assignedUser) 
  // assignedProjects: Project[];

// @ManyToOne(() => Project, (project) => project.assignedUsers, { nullable: true })
// @JoinColumn({ name: 'user_id', referencedColumnName: '' })
// assignedProject: Project;


// @ManyToMany(() => Project, project => project.users)
// @JoinTable({
//   name: 'project_user',
//   joinColumn: { name: 'user_id', referencedColumnName: 'userId' },
//   inverseJoinColumn: { name: 'project_id', referencedColumnName: 'projectId' },
// })
// projects: Project[];
//   totalProjects: number;




// @OneToMany(() => UserProject, (userProject) => userProject.user)
// userProjects: UserProject[];

// @OneToMany(() => UserProject, userProject => userProject.user)
// userProjects: UserProject[];


}
