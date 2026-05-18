import { test } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { PASSWORD, USERNAME } from '../../config/env-data'

const correctOrderId = 18229

test('Not found test Page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  const notFoundPage = await orderPage.checkOrderNotFound()
  await notFoundPage.checkVisible(true)
})
test('Found test Page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  const detailsPage = await orderPage.checkOrderFound(correctOrderId)
  await detailsPage.checkVisible(true)
})
