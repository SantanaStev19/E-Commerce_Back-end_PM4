import { Injectable } from '@nestjs/common';
import * as data from './../data.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  addCategories() {
    data.map(async (product) => {
      await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({ name: product.category })
        .onConflict('("name") DO NOTHING')
        .execute();
    });
    return 'Categories added';
  }
}
