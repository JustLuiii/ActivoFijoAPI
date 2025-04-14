export interface User {
  id: number,
  nombre: string,
  email: string,
  idSistemaAuxiliar: number,
  password: string
}

export type UserResponse = UserLogin & {
  id: number,
  token: string,
  tokenServicioExterno: string
}

export type UserLogin = Pick<User, 'password' | 'email'>
