import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('job-details', { schema: 'public' })
@Unique(['jobId'])
export class JobDetails {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'job_id', type: 'integer' })
  jobId: number;

  @Column({ name: 'job_details', type: 'text' })
  jobDetails: string;
}
