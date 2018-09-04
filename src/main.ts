import { launch } from 'puppeteer'
import { Measure } from './measure'
import { MainArgs } from './types'

export const main = async (args: MainArgs) => {
  const browser = await launch({
    appMode: true,
    headless: false,
    executablePath: '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
  })
  const page = await browser.newPage()
  const m = new Measure(args, browser, page)
  await m.prepare()
  await m.start()
  m.end()
}
