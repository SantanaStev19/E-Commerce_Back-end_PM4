import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private JWTService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request?.headers?.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No autorizado, debes ser administrador');
    }

    try {
      const secret = process.env.JWT_SECRET;
      const user = this.JWTService.verify(token, { secret });

      user.exp = new Date(user.exp * 1000);
      user.iat = new Date(user.iat * 1000);

      if (user.isAdmin) {
        user.roles = ['admin'];
      } else {
        user.roles = ['user'];
      }

      request.user = user;

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('No autorizado');
    }
  }
}
