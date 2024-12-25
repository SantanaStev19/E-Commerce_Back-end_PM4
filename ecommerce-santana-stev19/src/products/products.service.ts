import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.respository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  getProducts(page: number, limit: number) {
    return this.productsRepository.getProducts(page, limit);
  }
  getProduct(id: string) {
    return this.productsRepository.getProduct(id);
  }
  createProduct(user: any) {
    return this.productsRepository.createProduct(user);
  }
  updateProduct(id: string, user: any) {
    return this.productsRepository.updateProduct(id, user);
  }
  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}
