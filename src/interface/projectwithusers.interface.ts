import { User } from 'src/entity/users.entity';

export interface ProjectWithUsers {
  projectId: number;
  projectName: string;
  applicationDeadline: Date | null;
  careerCards: number[] | null;
  assignedUsers: User[];
}