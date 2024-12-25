import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { excludePasswordInterceptor } from 'src/interceptor/password.interceptor';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseInterceptors(excludePasswordInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.usersService.getUsers(page, limit);
    }
    return this.usersService.getUsers(1, 5);
  }
  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.usersService.getUser(id);
  }
  @Post()
  createUser(@Body() user: any) {
    return this.usersService.createUser(user);
  }
  @Put(':id')
  updateUser(@Param('id') id: number, @Body() user: any) {
    return this.usersService.updateUser(id, user);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
