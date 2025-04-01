export interface User {
  nombre: string,
  email: string,
  idSistemaAuxiliar: number,
  password: string
}


export type UserLogin = Pick<User, 'password' | 'email'>

export type UserResponse = UserLogin & {
  id: number,
  token: string
}