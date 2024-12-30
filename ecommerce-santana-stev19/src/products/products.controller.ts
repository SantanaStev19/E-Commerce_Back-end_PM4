import { Controller, Get, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getProducts(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.productsService.getProducts(page, limit);
    }
    return this.productsService.getProducts(1, 5);
  }
  @Post('seeder')
  addProducts() {
    return this.productsService.addProducts();
  }
  // @Get(':id')
  // getProduct(@Param('id') id: string) {
  //   return this.productsService.getProduct(id);
  // }
  // @Post()
  // createProduct(@Body() products: any) {
  //   return this.productsService.createProduct(products);
  // }
  // @Put(':id')
  // updateProduct(@Param('id') id: string, @Body() user: any) {
  //   return this.productsService.updateProduct(id, user);
  // }
  // @Delete(':id')
  // deleteProduct(@Param('id') id: string) {
  //   return this.productsService.deleteProduct(id);
  // }
}
