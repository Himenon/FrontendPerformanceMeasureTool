import { launch } from 'puppeteer'
import { Measure } from './measure'
import { MainArgs, PuppeteerOptions } from './types'

export const main = async (args: MainArgs, options: PuppeteerOptions) => {
  const optionLog = `
   headless       : ${options.headless}
   executablePath : ${options.executablePath}
  `
  console.log(optionLog)
  const browser = await launch(options)
  const page = await browser.newPage()
  const m = new Measure(args, browser, page)
  await m.prepare()
  await m.start()
  m.end()
}
