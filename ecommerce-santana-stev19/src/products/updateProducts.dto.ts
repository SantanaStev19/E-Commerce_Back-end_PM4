import {
  IsOptional,
  IsString,
  IsUUID,
  IsDecimal,
  IsInt,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDecimal()
  price?: number;

  @IsOptional()
  @IsInt()
  stock?: number;

  @IsOptional()
  @IsString()
  imgUrl?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string; // Para referenciar la categoría
}
