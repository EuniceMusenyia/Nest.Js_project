import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../entity/job.entity';
import { JobDetails } from 'src/entity/job-details.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,

    @InjectRepository(JobDetails)
    private readonly jobDetailsRepository: Repository<JobDetails>,
  ) {}

  async createJob(title: string, description: string): Promise<Job> {
    const newJob = this.jobRepository.create({ title, description });
    return await this.jobRepository.save(newJob);
  }

  async getJobById(id: number): Promise<Job> {
    const job = await this.jobRepository
      .createQueryBuilder('job')
      .where('job.id = :id', { id: id })
      .leftJoinAndSelect('job.details', 'details', 'details.jobId = job.id')
      .getOne();
    if (!job) {
      throw new NotFoundException('Job with ID ${id} not found');
    }
    return job;
  }

  async getTotalJobs(): Promise<number> {
    return await this.jobRepository.count();
  }

  async createJobDetails(
    jobId: number,
    jobDetails: string,
  ): Promise<JobDetails> {
    const newJob = this.jobDetailsRepository.create({ jobId, jobDetails });
    return await this.jobDetailsRepository.save(newJob);
  }
}
