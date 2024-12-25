/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

type Products = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
};

@Injectable()
export class ProductsRepository {
  private products: Products[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description:
        'High-quality over-ear wireless headphones with noise cancellation.',
      price: 199.99,
      stock: true,
      imgUrl: 'https://example.com/images/wireless-headphones.jpg',
    },
    {
      id: 2,
      name: 'Smartphone',
      description:
        'Latest-generation smartphone with an advanced camera system.',
      price: 999.99,
      stock: true,
      imgUrl: 'https://example.com/images/smartphone.jpg',
    },
    {
      id: 3,
      name: 'Gaming Laptop',
      description: 'Powerful gaming laptop with a high refresh rate display.',
      price: 1499.99,
      stock: false,
      imgUrl: 'https://example.com/images/gaming-laptop.jpg',
    },
    {
      id: 4,
      name: 'Electric Scooter',
      description: 'Foldable electric scooter with a long battery life.',
      price: 599.99,
      stock: true,
      imgUrl: 'https://example.com/images/electric-scooter.jpg',
    },
    {
      id: 5,
      name: 'Smartwatch',
      description:
        'Stylish smartwatch with fitness tracking and notification features.',
      price: 249.99,
      stock: true,
      imgUrl: 'https://example.com/images/smartwatch.jpg',
    },
  ];
  async getProducts(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + +limit;

    const products = this.products.slice(start, end);

    return products;
  }
  async getProduct(id: string) {
    return this.products.find((product) => product.id === +id);
  }
  async createProduct(product: any) {
    const id = this.products.length + 1;
    product.id = id;
    this.products.push(product);
  }
  async updateProduct(id: string, product: any) {
    const oldProduct = this.products.find((product) => product.id === +id);

    if (!oldProduct) return null;

    const updateProduct = {...oldProduct, ...product};

    const index = this.products.findIndex((product) => product.id === +id);

    this.products[index] = updateProduct;

    return updateProduct;
  }
  async deleteProduct(id: string) {
    const index = this.products.findIndex((product) => product.id === +id);

    const product = this.products[index];

    if (!index) return null;

    this.products.splice(index, 1);

    return product;
  }
}
