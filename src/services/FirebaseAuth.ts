import { FirebaseApp, initializeApp } from 'firebase/app'
import { firebaseConfig } from '../config/FirebaseConfig'
import { Auth, getAuth } from 'firebase/auth'

class FirebaseAuth {
  firebaseApp: FirebaseApp
  firebaseAuth: Auth
  confirmationResult: any
  recaptchaVerifier: any

  constructor() {
    this.firebaseApp = initializeApp(firebaseConfig)
    this.firebaseAuth = getAuth(this.firebaseApp)

    this.recaptchaVerifier = null
    this.confirmationResult = null
  }

  getFirebaseAuth = () => this.firebaseAuth

  setRecaptchaVerifier = (recaptcha: any) => {
    this.recaptchaVerifier = recaptcha
  }

  getRecaptchaVerifier = () => this.recaptchaVerifier

  setConfirmationResult = (confirmResult: any) => {
    this.confirmationResult = confirmResult
  }

  getConfirmationResult = () => this.confirmationResult
}

export const FirebaseAuthService = new FirebaseAuth()
