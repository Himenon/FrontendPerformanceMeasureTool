import { Page } from 'puppeteer'

export default async (page: Page) => {
  console.log('end: ', await page.title())
}
