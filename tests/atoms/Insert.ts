import { expect, Locator } from '@playwright/test'

export class Insert {
  readonly insertLocator: Locator

  constructor(insertLocator: Locator) {
    this.insertLocator = insertLocator
  }
  async checkInsertVisible(visible: boolean): Promise<void> {
    if (visible) {
      await expect(this.insertLocator).toBeVisible({ timeout: 10000 })
    } else {
      await expect(this.insertLocator).not.toBeVisible({ timeout: 10000 })
    }
  }
  async fill(value: string): Promise<void> {
    await this.insertLocator.fill(value)
  }
}
