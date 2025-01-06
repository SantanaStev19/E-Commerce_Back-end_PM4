import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() user: CreateUserDto) {
    const { passwordConfirmation, ...newUser } = user;
    return this.authService.signUp(newUser);
  }

  @Post('/signin')
  signIn(@Body() credential: LoginUserDto) {
    const { email, password } = credential;
    return this.authService.signIn(email, password);
  }
}
