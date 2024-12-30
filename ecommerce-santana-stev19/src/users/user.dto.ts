import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'el correo electrónico debe ser válido' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'la contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
  })
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'el correo electrónico debe ser válido' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'la contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
  })
  @MinLength(8)
  @MaxLength(15)
  password: string;
}
