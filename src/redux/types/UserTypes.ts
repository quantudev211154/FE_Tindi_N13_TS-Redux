export enum UserStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum UserRoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type UserType = {
  id: number
  phone: string
  email?: string
  password?: string
  createdAt?: string
  updateAt?: string
  fullName: string
  status?: UserStatusEnum
  tokenVersion?: number
  avatar: string
  role?: UserRoleEnum
}
