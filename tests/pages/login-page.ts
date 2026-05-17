import { expect, Locator, Page } from '@playwright/test'
import { OrderPage } from './order-page'
import { SERVICE_URL } from '../../config/en

export class LoginPage {
  readonly page: Page
  readonly url: string = SERVICE_URL
  readonly signInButton: Locator
  readonly usernameField: Locator
  readonly passwordField: Locator
  readonly validationError: Locator
  // add more locators here

  constructor(page: Page) {
    this.page = page
    this.signInButton = page.getByTestId('signIn-button')
    this.usernameField = page.getByTestId('username-input')
    this.passwordField = page.getByTestId('password-input')
    this.validationError = page.getByTestId('username-input-error')
    // continue with the rest of the implementation below
  }

  async open() {
    await this.page.goto(this.url)
  }

  async signIn(username: string, password: string) {
    await this.usernameField.fill(username)
    await this.passwordField.fill(password)
    await this.signInButton.click()
    return new OrderPage(this.page)
  }

  async checkInnerComponents(): Promise<void> {
    await expect(this.usernameField).toBeVisible()
    await expect(this.passwordField).toBeVisible()
    await expect(this.signInButton).toBeVisible()
  }
  async checkValidationError(): Promise<void> {
    await this.usernameField.fill('99999')
    await this.passwordField.fill('99999')
    await expect(this.validationError.nth(0)).toBeVisible()
    await expect(this.validationError.nth(1)).toBeVisible()
  }
}
