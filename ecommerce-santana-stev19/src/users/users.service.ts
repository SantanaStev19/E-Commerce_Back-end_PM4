import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { updateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number): Promise<User[]> {
    try {
      if (page < 1 || limit < 1) {
        throw new BadRequestException(
          'Los valores de página y límite deben ser mayores que 0',
        );
      }

      const [users] = await this.userRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });

      return users;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener los usuarios',
        error.message,
      );
    }
  }

  async getUser(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al buscar el usuario',
        error.message,
      );
    }
  }

  async updateUser(id: string, updateUserDto: updateUserDto): Promise<User> {
    try {
      // Buscar el usuario por id
      const existingUser = await this.userRepository.findOne({ where: { id } });
      if (!existingUser) {
        throw new Error('Usuario no encontrado');
      }

      // Actualizar solo los campos proporcionados en el DTO
      await this.userRepository.update(id, updateUserDto);

      // Retornar el usuario actualizado
      return this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al actualizar el usuario',
        error.message,
      );
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al eliminar el usuario',
        error.message,
      );
    }
  }
}
