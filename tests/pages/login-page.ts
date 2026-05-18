import { expect, Locator, Page } from '@playwright/test'
import { OrderPage } from './order-page'
import { SERVICE_URL } from '../../config/env-data'
import { BasePage } from './base-page'
import { Button } from '../atoms/Button'
import { Insert } from '../atoms/Insert'

export class LoginPage extends BasePage {
  private readonly url: string = SERVICE_URL
  readonly signInButton: Button
  readonly usernameField: Insert
  readonly passwordField: Insert
  readonly validationError: Locator
  // add more locators here

  constructor(page: Page) {
    super(page)
    this.signInButton = new Button(page.getByTestId('signIn-button'))
    this.usernameField = new Insert(page.locator('[data-name="username-input"]'))
    this.passwordField = new Insert(page.locator('[data-name="password-input"]'))
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
    await this.usernameField.checkInsertVisible(true)
    await this.passwordField.checkInsertVisible(true)
    await this.signInButton.checkVisible(true)
  }
  async checkValidationError(): Promise<void> {
    await this.usernameField.fill('99999')
    await this.passwordField.fill('99999')
    await expect(this.validationError.nth(0)).toBeVisible()
    await expect(this.validationError.nth(1)).toBeVisible()
  }
}
