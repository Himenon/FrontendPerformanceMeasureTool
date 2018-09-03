import { writeFile } from 'fs'
import { Browser, launch, Page } from 'puppeteer'
import { MainArgs, SamplingData } from './types'

export class Measure {
  private running: boolean = false
  private browser: Browser | null = null
  private page: Page | null = null
  private intervalTimer: NodeJS.Timer | null = null
  private cacheData: SamplingData = { sampling: [] }
  constructor(private params: MainArgs) {}

  public prepare = async () => {
    this.browser = await launch()
    this.page = await this.browser.newPage()
    await this.page.goto(this.params.url)
  }

  public start = () => {
    this.running = true
    this.intervalTimer = setInterval(async () => {
      if (this.running && this.page) {
        const data = await this.page.metrics()
        this.cacheData.sampling.push(data)
      }
    }, this.params.interval * 1000)
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
