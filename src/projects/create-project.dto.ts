import { IsString, IsOptional, IsArray } from 'class-validator';
import { User } from 'src/entity/users.entity';

export class CreateProjectDto {
  @IsString()
  projectName: string;

  @IsOptional()
  applicationDeadline?: Date;

  @IsArray()
  @IsOptional()
  careerCards?: number[];

  @IsArray()
  @IsOptional()
  assignedUsers?: User[];
}
