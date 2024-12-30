import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Products } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/categories/categories.entity';
import * as data from './../data.json';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number, limit: number) {
    try {
      if (!page || !limit || page < 1 || limit < 1) {
        throw new BadRequestException('Página o valores límite no válidos');
      }

      const products = await this.productsRepository.find();

      const start = (page - 1) * limit;
      const end = start + limit;

      return products.slice(start, end);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener los productos',
        error.message,
      );
    }
  }

  async addProducts() {
    try {
      const categories = await this.categoriesRepository.find();
      if (categories.length === 0) {
        throw new BadRequestException(
          'No se encontraron categorías. Agregue categorías primero.',
        );
      }

      for (const element of data) {
        const category = categories.find(
          (category) => category.name === element.category,
        );

        if (!category) {
          throw new BadRequestException(
            `La categoria "${element.category}" no existe`,
          );
        }

        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.category = category;

        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          .orUpdate(['description', 'price', 'stock'], ['name'])
          .execute();
      }
      return 'Productos añadidos con éxito';
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al agregar productos',
        error.message,
      );
    }
  }
}
