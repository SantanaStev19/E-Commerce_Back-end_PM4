import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getAuth() {
    return 'Autenticado';
  }
  signIn(email: string, password: string) {
    if (!email || !password) {
      return 'Correo y Contraseña requeridos';
    }
    const user = { password: '1234' };

    if (!user) {
      return 'Usuario no encontrado';
    }
    if (user.password === password) {
      return 'iniciando sesion';
    }
    return 'Usuario o Contraseña incorrectos';
  }
}
