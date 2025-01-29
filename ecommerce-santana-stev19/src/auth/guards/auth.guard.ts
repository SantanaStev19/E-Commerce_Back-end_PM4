import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from 'src/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private JWTService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader)
      throw new UnauthorizedException('No autorizado, debes ser administrador');

    const token = authHeader.split(' ')[1];

    if (!token) throw new UnauthorizedException('No autorizado');

    try {
      const secret = process.env.JWT_SECRET;

      const payload = this.JWTService.verify(token, { secret });

      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);

      request.user = payload;

      if (payload.isAdmin) {
        request.user.roles = [Role.Admin];
      } else {
        request.user.roles = [Role.User];
      }

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new UnauthorizedException('No autorizado');
    }
  }
}
