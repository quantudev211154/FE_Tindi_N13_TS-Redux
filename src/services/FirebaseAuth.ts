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
} from 'firebase/auth'
import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
} from 'firebase/storage'

class MyFirebase {
  private firebaseApp: FirebaseApp
  private firebaseAuth: Auth
  private confirmationResult: ConfirmationResult | null
  private recaptchaVerifier: RecaptchaVerifier | null
  private storage: FirebaseStorage

  constructor() {
    this.firebaseApp = initializeApp(firebaseConfig)
    this.firebaseAuth = getAuth(this.firebaseApp)

    this.storage = getStorage(this.firebaseApp)

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
        callback: () => {},
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
      .catch(() => {
        if (reject) reject()
      })
  }

  confirmFirebaseAuthOTP = (
    OTP: string,
    resolve: Function,
    reject?: Function
  ) => {
    this.confirmationResult
      ?.confirm(OTP)
      .then(() => {
        resolve()
      })
      .catch(() => {
        if (reject) reject()
      })
  }

  downloadFileFromFirebaseStorage = (httpFileUrl: string) => {
    getDownloadURL(ref(this.storage, httpFileUrl))
      .then((url) => {
        const xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        xhr.onload = () => {
          const blob = xhr.response

          let customUrl = window.URL.createObjectURL(blob)

          let aTag = document.createElement('a')
          aTag.style.display = 'none'
          aTag.href = customUrl
          aTag.download = httpFileUrl
          aTag.click()
          window.URL.revokeObjectURL(customUrl)
        }
        xhr.open('GET', url)
        xhr.send()
      })
      .catch(() => {})
  }
}

export const FirebaseService = new MyFirebase()
