import { Page } from 'puppeteer'

export default async (page: Page) => {
  console.log('title: ', await page.title())
}
