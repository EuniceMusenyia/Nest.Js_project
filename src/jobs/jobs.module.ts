import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { Job } from 'src/entity/job.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobDetails } from 'src/entity/job-details.entity';

@Module({
  controllers: [JobsController],
  providers: [JobsService],
  imports: [TypeOrmModule.forFeature([Job, JobDetails])],
})
export class JobsModule {}
