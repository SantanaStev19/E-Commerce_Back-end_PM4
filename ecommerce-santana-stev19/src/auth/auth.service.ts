import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(user: Partial<User>) {
    try {
      const userExists = await this.usersRepository.findOneBy({
        email: user.email,
      });
      if (userExists) {
        throw new ConflictException('El correo electrónico ya está en uso');
      }
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = { ...user, password: hashedPassword };

      const savedUser = await this.usersRepository.save(newUser);

      return savedUser;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
    }
  }

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({ email: email });

    if (!user) {
      throw new NotFoundException('usuario o contraseña incorrectos');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new NotFoundException('usuario o contraseña incorrectos');
    }

    const payload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      message: 'Sesión iniciada correctamente',
    };
  }
}
