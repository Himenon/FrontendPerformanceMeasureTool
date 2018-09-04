import { Page } from 'puppeteer'

export interface MainArgs {
  url: string
  end: number
  interval: number
  output: string
  prepareScriptPath?: string
}

export interface SamplingData {
  meta: MainArgs
  sampling: any[]
}

export type PrepareScript = (page: Page) => {}
