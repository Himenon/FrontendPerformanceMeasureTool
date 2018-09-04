import { Page } from 'puppeteer'

// Injection Script
export default async (page: Page) => {
  const params = {
    username: process.env.USERNAME as string,
    usernameId: process.env.USERNAME_ID as string,
    password: process.env.PASSWORD as string,
    passwordId: process.env.PASSWORD_ID as string,
    submitId: process.env.SUBMIT_ID as string,
    url: process.env.LOGIN_URL as string,
    finishUrl: process.env.FINISH_URL as string,
  }
  await page.goto(params.url)
  await page.type(params.usernameId, params.username)
  await page.type(params.passwordId, params.password)
  const loginSubmit = await page.$(params.submitId)
  if (loginSubmit) {
    await loginSubmit.click()
    await page.screenshot({ path: 'output/login-finish.png', fullPage: false })
  }
  await page.goto(params.finishUrl)
  await page.screenshot({ path: 'output/goto-page-1.png', fullPage: false })
}
