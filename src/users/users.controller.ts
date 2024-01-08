import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { User } from 'src/entity/users.entity';
import { UsersService } from './users.service';
import { Project } from 'src/entity/projects.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('search')
  async searchUsers(@Query('searchTerm') searchTerm: string) {
    return this.usersService.searchUser(searchTerm);
  }
  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':userId/projects')
  async getUserProjects(@Param('userId') userId: number): Promise<Project[]> {
    return this.usersService.getUserProjects(userId);
  }
}
