import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { typeOrmConfig } from './config/typyOrm.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    AuthModule,
    CategoriesModule,
    OrderModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    FileUploadModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
