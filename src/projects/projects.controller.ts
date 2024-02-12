/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { Project } from 'src/entity/projects.entity';
import { ProjectsService } from './projects.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateProjectDto } from './create-project.dto';
import { User } from 'src/entity/users.entity';
import { ProjectWithUsers } from 'src/interface/projectwithusers.interface';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('project')
  async createProject(@Body() CreateProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(CreateProjectDto);
  }

  @Get(':id')
  async getProjectById(@Param('id') id: number): Promise<Project> {
    return this.projectsService.getProjectById(id);
  }

  @Get()
  async getAllProjects(): Promise<Project[]> {
    return this.projectsService.getAllProjects();
  }

  @Post(':projectId/assignProject/:userId')
  async assignProject(
    @Param('projectId') projectId: number,
    @Param('userId') userId: number,
  ) {
    return this.projectsService.assignProjectToUser(projectId, userId);
  }

  @Get(':projectId/assignedUsers')
  async getAssignedUsers(
    @Param('projectId') projectId: number,
  ) {
    return this.projectsService.getAssignedUsers(projectId);
  }

  @Get('projects-with-users')
  async getProjectsWithUsers(): Promise<ProjectWithUsers[]> {
    return this.projectsService.getProjectsWithUsers();
  }
}
