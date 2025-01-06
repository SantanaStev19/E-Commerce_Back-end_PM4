import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/products/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly imageUploadRepository: FileUploadRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    try {
      // Validar el archivo recibido
      if (!file) {
        throw new BadRequestException(
          'No se ha recibido un archivo para cargar',
        );
      }

      // Verificar si el producto existe
      const product = await this.productsRepository.findOneBy({
        id: productId,
      });
      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }

      // Subir la imagen utilizando el repositorio
      const uploadedImage = await this.imageUploadRepository.uploadImage(file);
      if (!uploadedImage || !uploadedImage.secure_url) {
        throw new InternalServerErrorException(
          'Ocurrió un problema al cargar la imagen',
        );
      }

      // Actualizar el producto con la URL de la imagen
      await this.productsRepository.update(product.id, {
        imgUrl: uploadedImage.secure_url,
      });

      // Retornar el producto actualizado
      const updatedProduct = await this.productsRepository.findOneBy({
        id: productId,
      });
      if (!updatedProduct) {
        throw new InternalServerErrorException(
          'Error al recuperar el producto después de actualizar la imagen',
        );
      }

      return updatedProduct;
    } catch (error) {
      // Manejo general de excepciones
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Ocurrió un error inesperado durante el proceso de carga de la imagen',
        error.message,
      );
    }
  }
}
