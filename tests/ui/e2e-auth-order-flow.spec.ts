import { test } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'

test('Login test + order page components check', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.checkInnerComponents()
})

test('Create order test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.checkOrderCreate()
})

test('Validation test on order creation', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)

  await orderPage.nameInput.fill('1')
  await orderPage.phoneInput.fill(faker.string.numeric(8))
  await orderPage.checkCreateOrderBtnEnabled(false)

  await orderPage.nameInput.fill(faker.person.firstName())
  await orderPage.phoneInput.fill('2')
  await orderPage.checkCreateOrderBtnEnabled(false)

  await orderPage.nameInput.fill(faker.person.firstName())
  await orderPage.phoneInput.fill(faker.string.numeric(8))
  await orderPage.checkCreateOrderBtnEnabled(true)
})

test('Logout test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.logout()
  await loginPage.checkInnerComponents()
})
