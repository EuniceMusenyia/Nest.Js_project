import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/users.entity';
import { Project } from 'src/entity/projects.entity';
import { UserDetails } from 'src/entity/user-details.entity';
import { ProjectsService } from 'src/projects/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Project, UserDetails])],
  controllers: [UsersController],
  providers: [UsersService, UserDetails, ProjectsService],
})
export class UsersModule {}
