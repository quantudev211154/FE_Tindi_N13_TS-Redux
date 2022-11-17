export type RegistrationPendingType = {
  phone: string
  password: string
  fullName: string
  avatar: string
}

class RegistrationPendingManager {
  pendingRegisterAccount: RegistrationPendingType | null

  constructor() {
    this.pendingRegisterAccount = null
  }

  getPendingRegisterAccount = () => this.pendingRegisterAccount

  setPendingRegisterAccount = (pendingAccount: RegistrationPendingType) => {
    this.pendingRegisterAccount = pendingAccount
  }

  clearPendingAccount = () => {
    this.pendingRegisterAccount = null
  }
}

export const RegistrationPendingAccount = new RegistrationPendingManager()
