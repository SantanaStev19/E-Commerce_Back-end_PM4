import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bienveidos a una aplicacion de backend de un Ecommers';
  }
}
