import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entity/projects.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateProjectDto } from './create-project.dto';
import { User } from 'src/entity/users.entity';
// import { UserProject } from 'src/entity/user-project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = new Project();
    project.projectName = createProjectDto.projectName;
    project.applicationDeadline = createProjectDto.applicationDeadline;
    project.careerCards = createProjectDto.careerCards || [];

    return this.projectsRepository.save(project);
  }

  async getProjectById(id: number): Promise<Project> {
    try {
      const project = await this.projectsRepository.findOneOrFail({
        where: { projectId: id },
      });
      return project;
    } catch (error) {
      throw new NotFoundException('Project not found');
    }
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async assignProjectToUser(
    projectId: number,
    userId: number,
  ): Promise<Project> {
    try {
      const project = await this.projectsRepository.findOne({
        where: { projectId: projectId },
        relations: ['assignedUsers'],
      });

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      const user = await this.userRepository.findOne({
        where: { userId: userId },
        // relations: ['userDetails', 'projects'],
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      project.assignedUsers = [...project.assignedUsers, user];

      await this.projectsRepository.save(project);

      return project;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Project or User not found');
      }
      throw error;
    }
  }

  async getAssignedUsers(projectId: number): Promise<User[]> {
    try {
      const project = await this.projectsRepository.findOne({
        where: { projectId },
        relations: ['assignedUsers'],
      });

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      return project.assignedUsers || [];
    } catch (error) {
      console.error('Error fetching assigned users:', error);

      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Project not found');
      }
      throw error;
    }
  }

}
