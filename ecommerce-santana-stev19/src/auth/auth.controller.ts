import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }
  @Post('/signing')
  signIn(@Body() credential: LoginUserDto) {
    const { email, password } = credential;
    return this.authService.signIn(email, password);
  }
}
