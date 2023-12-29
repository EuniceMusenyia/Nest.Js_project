import { Controller, Get, Param } from '@nestjs/common';
import { UserProjectService } from './user-project.service';

@Controller('user-projects')
export class UserProjectController {
  constructor(private readonly userProjectService: UserProjectService) {}

  @Get(':projectId/users')
  async getUsersByProjectId(@Param('projectId') projectId: number) {
    return this.userProjectService.getUsersByProjectId(projectId);
  }
}
