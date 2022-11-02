import { FirebaseApp, initializeApp } from 'firebase/app'
import {
  DEFAULT_PREFIX_PHONE_NUMBER,
  firebaseConfig,
} from '../config/FirebaseConfig'
import {
  Auth,
  ConfirmationResult,
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  UserCredential,
} from 'firebase/auth'
import { RegistrationPendingAccount } from '../utilities/registration/RegistrationPending'

class FirebaseAuth {
  private firebaseApp: FirebaseApp
  private firebaseAuth: Auth
  private confirmationResult: ConfirmationResult | null
  private recaptchaVerifier: RecaptchaVerifier | null

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

  generateRecaptchatVerifier = (captchaPopupElementId: string) => {
    this.recaptchaVerifier = new RecaptchaVerifier(
      captchaPopupElementId,
      {
        size: 'invisible',
        callback: (response: any) => {},
      },
      this.firebaseAuth
    )
  }

  sendFirebaseAuthOTP = (
    phone: string,
    resolve?: Function,
    reject?: Function
  ) => {
    signInWithPhoneNumber(
      this.firebaseAuth,
      DEFAULT_PREFIX_PHONE_NUMBER + phone,
      this.recaptchaVerifier as RecaptchaVerifier
    )
      .then((confirmationResult: ConfirmationResult) => {
        this.confirmationResult = confirmationResult
        if (resolve) resolve()
      })
      .catch((err) => {
        if (reject) reject()
        else console.log(err)
      })
  }

  confirmFirebaseAuthOTP = (
    OTP: string,
    resolve: Function,
    reject?: Function
  ) => {
    this.confirmationResult
      ?.confirm(OTP)
      .then((result: UserCredential) => {
        resolve()
      })
      .catch((err: any) => {
        if (reject) reject()
        else console.log(err)
      })
  }
}

export const FirebaseAuthService = new FirebaseAuth()
