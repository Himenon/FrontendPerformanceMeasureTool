import { isAbsolute, resolve } from 'path'
import { launch } from 'puppeteer'
import { Measure } from './measure'
import { MainArgs, PrepareScript } from './types'

const getScriptPath = (inputPath: string): string => {
  if (isAbsolute(inputPath)) {
    return inputPath
  }
  return resolve(process.cwd(), inputPath)
}

const dynamicImport = (importFilePath: string): PrepareScript => {
  return require(importFilePath).default
}

export const main = async (args: MainArgs) => {
  const browser = await launch()
  const page = await browser.newPage()
  const m = new Measure(args, browser, page)
  let prepareScript = null
  if (args.prepareScriptPath) {
    prepareScript = dynamicImport(getScriptPath(args.prepareScriptPath))
  }
  await m.prepare(prepareScript)
  await m.start()
  m.end()
}
