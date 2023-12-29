import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('totaljobs')
  getCounter(): Promise<number> {
    return this.jobsService.getTotalJobs();
  }

  @Post()
  async createJob(
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    const newJob = await this.jobsService.createJob(title, description);
    return newJob;
  }

  @Get(':id')
  async getJobById(@Param('id') id: number) {
    const job = await this.jobsService.getJobById(id);
    return job;
  }

  @Post('jobDetails')
  async createJobDetails(
    @Body('jobId') jobId: number,
    @Body('jobDetails') JobDetails: string,
  ) {
    const newJobDetails = await this.jobsService.createJobDetails(
      jobId,
      JobDetails,
    );
    return newJobDetails;
  }
}
