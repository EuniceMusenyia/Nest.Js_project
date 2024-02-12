import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  readonly projectName: string;

  @IsNotEmpty()
  @IsDateString()
  readonly applicationDeadline: Date;
}
