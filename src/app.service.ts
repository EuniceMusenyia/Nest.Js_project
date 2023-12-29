import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHelloFromWorkbay(): string {
    return 'Hello World from Workbay!';
  }
}
