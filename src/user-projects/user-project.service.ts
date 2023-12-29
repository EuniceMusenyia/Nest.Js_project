import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProject } from 'src/entity/user-project.entity';

@Injectable()
export class UserProjectService {
  constructor(
    @InjectRepository(UserProject)
    private userProjectRepository: Repository<UserProject>,
  ) {}

  async getUsersByProjectId(projectId: number): Promise<UserProject[]> {
    return this.userProjectRepository.find({
      where: { project: { projectId } },
      relations: ['user'], // Include the user information
    });
  }
}
