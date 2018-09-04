import { writeFile } from 'fs'
import { Browser, Page } from 'puppeteer'
import { MainArgs, PrepareScript, SamplingData } from './types'

export class Measure {
  private running: boolean = false
  private intervalTimer: NodeJS.Timer | null = null
  private cacheData: SamplingData
  constructor(private params: MainArgs, private browser: Browser, private page: Page) {
    const message = `
      Url         : ${params.url}
      Interval    : ${params.interval} sec.
      EndTime     : after ${params.end} sec.
      Output Path : ${params.output}
      Prepare Script: ${params.prepareScriptPath}
    `
    this.cacheData = {
      meta: params,
      sampling: [],
    }
    console.log(message)
  }

  public prepare = async (prepareScript: PrepareScript | null): Promise<void> => {
    if (prepareScript) {
      await prepareScript(this.page)
    } else {
      await this.page.goto(this.params.url)
    }
    return Promise.resolve()
  }

  public start = async (): Promise<void> => {
    this.running = true
    this.intervalTimer = setInterval(async () => {
      if (this.running && this.page) {
        const data = await this.page.metrics()
        this.cacheData.sampling.push(data)
      }
    }, this.params.interval * 1000)
    return Promise.resolve()
  }

  public end = () => {
    setTimeout(async () => {
      this.running = false
      if (this.intervalTimer) {
        clearInterval(this.intervalTimer)
      }
      await this.saveLog()
      if (this.browser) {
        await this.browser.close()
      }
    }, this.params.end * 1000)
  }

  private saveLog = async () => {
    await writeFile(this.params.output, JSON.stringify(this.cacheData), err => {
      if (err) {
        console.error('Throw Error', err)
        throw err
      }
    })
  }
}
