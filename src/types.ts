import { Page } from 'puppeteer'

export interface MainArgs {
  url: string
  end: number
  interval: number
  output: string
  prepareScriptPath?: string
  loopScriptPath?: string
  endScriptPath?: string
}

export interface SamplingData {
  meta: MainArgs
  sampling: any[]
}

export type InjectScript = (page: Page) => {}
