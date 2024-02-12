import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { CareerCardsModule } from './careerCards/careerCards.module';
import { Job } from './entity/job.entity';
import { JobDetails } from './entity/job-details.entity';
import { UsersModule } from './users/users.module';
import { User } from './entity/users.entity';
import { UserDetails } from './entity/user-details.entity';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './entity/projects.entity';
import { UserProject } from './entity/user-project.entity';
// import { UserProject } from './entity/user-project.entity';
// import { UserProjectModule } from './user-projects/user-project.module';

@Module({
  imports: [
    JobsModule,
    CareerCardsModule,
    UsersModule,
    User,
    UserDetails,
    ProjectsModule,
    // UserProjectModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'senyia',
      password: 'senyia',
      database: 'workbaydb',
      synchronize: true,
      entities: [Job, JobDetails, User, UserDetails, Project, UserProject],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
