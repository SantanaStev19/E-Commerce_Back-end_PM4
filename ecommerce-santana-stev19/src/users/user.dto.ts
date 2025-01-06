import { PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/utils/matchPassword';

export class CreateUserDto {
  /**
   * @description Esta propidad debe tener un nombre valido
   * @example steven santana
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  name: string;
  /**
   * @description Esta propidad debe tener un email valido
   * @example steven@gmail.com
   */
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'el correo electrónico debe ser válido' })
  email: string;
  /**
   * @description Esta propidad debe tener una contraseña valido
   * @example Contaseña123&
   */
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'la contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
  })
  @MinLength(8)
  @MaxLength(15)
  password: string;
  /**
   * @description Esta propidad debe tener una contraseña valido
   * @example Contaseña123&
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  passwordConfirmation: string;
  /**
   * @description Esta propidad debe tener una direccion valido
   * @example kennedy
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;
  /**
   * @description Esta propidad debe tener un telefono valido
   * @example 3012222222
   */
  @IsNotEmpty()
  @IsNumberString()
  @Length(10, 13)
  phone: string;
  /**
   * @description Esta propidad debe tener una pais valido
   * @example Colombia
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;
  /**
   * @description Esta propidad debe tener una ciudad valido
   * @example Bogota
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}

export class updateUserDto extends PickType(CreateUserDto, [
  'name',
  'email',
  'phone',
  'address',
  'country',
  'city',
]) {}
