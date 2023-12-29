import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobDetails } from './job-details.entity';

@Entity('jobs_entity', { schema: 'public' })
export class Job {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description' })
  description: string;

  @OneToOne(() => JobDetails, {
    createForeignKeyConstraints: false,
    eager: false,
    nullable: false,
    cascade: true,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'jobId' })
  details: JobDetails;
}
