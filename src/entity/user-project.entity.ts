import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';
import { Project } from './projects.entity';

@Entity('user_projects', { schema: 'public' })
export class UserProject {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => User, (user) => user.assignedProjects)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Project, (project) => project.assignedUsers)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
