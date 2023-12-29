import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProject } from 'src/entity/user-project.entity';
import { UserProjectService } from './user-project.service';
import { UserProjectController } from './user-project.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserProject])],
  providers: [UserProjectService],
  controllers: [UserProjectController],
})
export class UserProjectModule {}
