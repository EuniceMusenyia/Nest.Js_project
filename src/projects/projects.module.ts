import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entity/projects.entity';
import { User } from 'src/entity/users.entity';
import { UserDetails } from 'src/entity/user-details.entity';
import { UserProject } from 'src/entity/user-project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, User, UserDetails, UserProject]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
