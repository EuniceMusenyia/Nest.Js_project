import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entity/projects.entity';
import { UserDetails } from 'src/entity/user-details.entity';
import { User } from 'src/entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserDetails)
    private readonly userDetailsRepository: Repository<UserDetails>,
  ) {}

  async createUser(user: User): Promise<User> {
    // console.log(user);
    // user.userId = user.id;

    const createdUser = await this.userRepository.save(user);

    const userDetails = new UserDetails();
    userDetails.userId = createdUser.userId;

    await this.userDetailsRepository.save(userDetails);

    return createdUser;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.userId = :userId', { userId: userId })
      .leftJoinAndSelect('user.userDetails', 'userDetails')
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async searchUser(searchTerm: string): Promise<User[]> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .where(
        'user.firstName LIKE :searchTerm OR user.lastName LIKE :searchTerm',
        { searchTerm: `%${searchTerm}%` },
      )
      .getMany();

    return users;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserProjects(userId: number): Promise<Project[]> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.userId = :userId', { userId })
      .leftJoinAndSelect('user.projects', 'projects')
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    console.log(user);

    return user.projects || [];
  }
}
