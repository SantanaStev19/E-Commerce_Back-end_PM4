import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import * as data from './../data.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async addCategories() {
    try {
      // Verificar si el archivo de datos tiene contenido
      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new BadRequestException(
          'No se encontraron datos para agregar categorías',
        );
      }

      // Procesar y agregar categorías
      for (const product of data) {
        if (!product.category) {
          throw new BadRequestException(
            `El producto "${product.name}" no tiene una categoría válida`,
          );
        }

        await this.categoriesRepository
          .createQueryBuilder()
          .insert()
          .into(Categories)
          .values({ name: product.category })
          .onConflict('("name") DO NOTHING') // Evitar duplicados
          .execute();
      }

      return 'Categorías agregadas exitosamente';
    } catch (error) {
      // Manejo general de errores
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Ocurrió un error al agregar categorías',
        error.message,
      );
    }
  }
}
