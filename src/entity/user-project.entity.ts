import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user-projects', { schema: 'public' })
export class UserProject {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'project_id' })
  projectId: number;

  @Column({ name: 'user_id', type: 'integer' })
  userId: number;
}
