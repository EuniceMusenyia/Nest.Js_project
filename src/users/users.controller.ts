import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { User } from 'src/entity/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
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

  @Get('usersProjects/:userId')
  // eslint-disable-next-line prettier/prettier
  async getUsersProjects(@Param('userId') userId): Promise<{ firstName: string; lastName: string }[]> {
    return this.usersService.getUsersProjects(userId);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
}
