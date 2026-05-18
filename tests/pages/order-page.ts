import { expect, Locator, Page } from '@playwright/test'
import { faker } from '@faker-js/faker/locale/ar'
import { BasePage } from './base-page'
import { Button } from '../atoms/Button'
import { NotFoundPage } from './order-not-found-page'
import { OrderDetailsPage } from './order-details-page'
import { Insert } from '../atoms/Insert'

export class OrderPage extends BasePage {
  readonly statusButton: Button
  readonly title: Locator
  readonly createOrderButton: Button
  readonly nameInput: Insert
  readonly phoneInput: Insert
  readonly commentInput: Insert
  readonly confirmationPopup: Locator
  readonly logoutButton: Button

  // search popup
  protected readonly searchPopup: Locator
  readonly searchInput: Insert
  readonly searchButton: Button

  constructor(page: Page) {
    super(page)
    this.statusButton = new Button(page.getByTestId('openStatusPopup-button'))
    this.title = page.locator('h2')
    this.createOrderButton = new Button(page.getByTestId('createOrder-button'))
    this.nameInput = new Insert(page.getByTestId('username-input'))
    this.phoneInput = new Insert(page.getByTestId('phone-input'))
    this.commentInput = new Insert(page.getByTestId('comment-input'))
    this.confirmationPopup = page.getByTestId('orderSuccessfullyCreated-popup')
    this.logoutButton = new Button(page.getByTestId('logout-button'))

    //search popup
    this.searchPopup = page.getByTestId('searchOrder-popup')
    this.searchInput = new Insert(this.searchPopup.getByTestId('searchOrder-input'))
    this.searchButton = new Button(this.searchPopup.getByTestId('searchOrder-submitButton'))
  }

  async checkInnerComponents(): Promise<void> {
    await this.statusButton.checkVisible(true)
    await expect(this.title).toBeVisible()
    await this.createOrderButton.checkVisible(true)
    await this.nameInput.checkInsertVisible(true)
    await this.phoneInput.checkInsertVisible(true)
    await this.commentInput.checkInsertVisible(true)
  }

  async checkOrderCreate(): Promise<void> {
    await this.nameInput.fill(faker.person.firstName())
    await this.phoneInput.fill(faker.string.numeric(8))
    await this.commentInput.fill(faker.lorem.sentence(7))
    await this.createOrderButton.click()
    await expect(this.confirmationPopup).toBeVisible()
  }

  async checkCreateOrderBtnEnabled(enabled: boolean): Promise<void> {
    await this.createOrderButton.checkEnabled(enabled)
  }

  async logout(): Promise<void> {
    await this.logoutButton.click()
  }

  async checkOrderNotFound(): Promise<NotFoundPage> {
    await this.statusButton.click()
    await this.searchInput.fill('0')
    await this.searchButton.click()
    return new NotFoundPage(this.page)
  }

  async checkOrderFound(id: number): Promise<OrderDetailsPage> {
    await this.statusButton.click()
    await this.searchInput.fill(`${id}`)
    await this.searchButton.click()
    return new OrderDetailsPage(this.page)
  }
}
