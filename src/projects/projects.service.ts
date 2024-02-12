/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entity/projects.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './create-project.dto';
import { User } from 'src/entity/users.entity';
import { UserProject } from 'src/entity/user-project.entity';
import { UserDetails } from 'src/entity/user-details.entity';
import { ProjectWithUsers } from 'src/interface/projectwithusers.interface';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserProject)
    private readonly userProjectRepository: Repository<UserProject>,
    @InjectRepository(UserDetails)
    private readonly userDetailsRepository: Repository<UserDetails>,
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

  // async assignProjectToUser(
  //   projectId: number,
  //   userId: number,
  // )
  // {
  //   try {
  //     const userProject = new UserProject()
  //     userProject.projectId = projectId
  //     userProject.userId = userId
  //     const createdUserProject = await this.userProjectRepository.save(userProject);

  //     return createdUserProject

   
  //   }
  //   catch{
      
  //   }
  // }


  async assignProjectToUser(projectId: number, userId: number) {
    try {

      const existingProject = await this.projectsRepository.findOne({
        where: { projectId: projectId },
      });
  
      if (!existingProject) {
        return 'This project does not exist';
      }
      const existingUser = await this.userRepository.findOne({
        where: { userId: userId },
      });
  
      if (!existingUser) {
        return 'This user does not exist';
      }
  
      const existingUserProject = await this.userProjectRepository.findOne({
        where: {
          projectId,
          userId,
        },
      });
  
      if (existingUserProject) {
        return 'User already assigned to this project';
      }
  
      const userProject = new UserProject();
      userProject.projectId = projectId;
      userProject.userId = userId;
      const createdUserProject = await this.userProjectRepository.save(userProject);


      // existingUser.userDetails.totalProjects = (existingUser.userDetails.totalProjects || 0) + 1;

      // await this.userRepository.save(existingUser);
      // console.log(existingUser)

      const existingUserDetails = await this.userDetailsRepository.findOne({
        where: { userId: userId },
      });
       existingUserDetails.totalProjects = (existingUserDetails.totalProjects || 0) + 1;

      await this.userDetailsRepository.save(existingUserDetails);  

      return createdUserProject;

    } catch (error) {
      console.error('Error assigning project to user:', error);
  
      throw new Error('Error assigning project to user');
    }
  }

  async getAssignedUsers(projectId: number)
  // : Promise<User[]> 
  {
    try {
      const userProjects = await this.userProjectRepository
        .createQueryBuilder('userProject')
        .where('userProject.projectId = :projectId', { projectId })
        .leftJoinAndSelect(User, 'user', 'user.userId = userProject.userId') 
        .getRawMany();
  
      if (!userProjects || userProjects.length === 0) {
        throw new NotFoundException('No users found');
      }
 
      return userProjects;
    } catch (error) {
      console.error('Error fetching assigned users:', error);
      throw new Error('Error fetching assigned users');
    }
  }

  async getProjectsWithUsers(): Promise<ProjectWithUsers[]> {
    try {
      const projectsWithUsers = await this.projectsRepository
        .createQueryBuilder('project')
        .innerJoinAndSelect('project.assignedUsers', 'user')
        .getMany();
  
      return projectsWithUsers;
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error fetching projects with users:', error);
  
      // Return a more informative error response
      throw new Error('Failed to fetch projects with users');
    }
  }
  
  

  
  
  

  // async assignProjectToUser(
  //   projectId: number,
  //   userIds: number[],
  // ): Promise<Project> {
  //   try {
      // const project = await this.projectsRepository
      //   .createQueryBuilder('project')
      //   .leftJoinAndSelect('project.assignedUsers', 'user')
      //   .where('project.projectId = :projectId', { projectId })
      //   .getOne();

      // if (!project) {
      //   throw new NotFoundException('Project not found');
      // }

      // const existingUserIds = project.assignedUser.map((user) => user.userId);
      // const duplicateUserIds = userIds.filter((userId) =>
      //   existingUserIds.includes(userId),
      // );

      // if (duplicateUserIds.length > 0) {
      //   throw new NotFoundException(
      //     `Users with IDs ${duplicateUserIds.join(
      //       ', ',
      //     )} are already assigned to the project`,
      //   );
      // }

      // const usersToAdd = await this.userRepository.findByIds(userIds);

      // project.assignedUser = [...project.assignedUser, ...usersToAdd];

      // await this.projectsRepository.save(project);

      // for (const user of usersToAdd) {
      //   const userDetails = await this.userRepository.findOne({
      //     where: { userId: user.userId } as any,
      //   });

      //   // console.log(userDetails);

      //   if (userDetails) {
      //     userDetails.totalProjects += 1;

      //     await this.userRepository.save(userDetails);
      //   } else {
      //     console.log('UserDetails not found for user with ID:', user.userId);
      //   }

        // console.log(user);
      // }

      // await this.projectRepository.save(project);

      // return project;
  //   } catch (error) {
  //     console.error(error);
  //     throw new NotFoundException('Failed to assign project to users');
  //   }
  // }



  // async getAssignedUsers(projectId: number){
  //   try {
  //     const project = await this.projectsRepository.findOne({
  //       where: { projectId },
  //     });

  //     if (!project) {
  //       throw new NotFoundException('Project not found');
  //     }

  //     return project|| [];
  //   } catch (error) {
  //     console.error('Error fetching assigned users:', error);

  //     if (error instanceof EntityNotFoundError) {
  //       throw new NotFoundException('Project not found');
  //     }
  //     throw error;
  //   }
  // }
}
