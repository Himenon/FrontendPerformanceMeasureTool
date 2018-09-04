import { writeFile } from 'fs'
import { Browser, Page } from 'puppeteer'
import { InjectScript, MainArgs, SamplingData } from './types'
import { dynamicImport, getAbsolutePath } from './utils'

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

      # Inject Script
      Prepare Script: ${params.prepareScriptPath}
      Loop Script   : ${params.loopScriptPath}
      End Script    : ${params.endScriptPath}
    `
    this.cacheData = {
      meta: params,
      sampling: [],
    }
    console.log(message)
  }

  public prepare = async (): Promise<void> => {
    if (this.params.prepareScriptPath) {
      const prepareScript = dynamicImport(getAbsolutePath(this.params.prepareScriptPath))
      if (prepareScript) {
        await prepareScript(this.page)
      }
    } else {
      await this.page.goto(this.params.url)
    }
    return Promise.resolve()
  }

  public start = async (): Promise<void> => {
    this.running = true
    let loopScript: InjectScript | undefined
    if (this.params.loopScriptPath) {
      loopScript = dynamicImport(getAbsolutePath(this.params.loopScriptPath))
    }
    // TODO Wait 関数にする
    this.intervalTimer = setInterval(async () => {
      if (this.running) {
        const data = await this.page.metrics()
        this.cacheData.sampling.push(data)
      }
      if (loopScript) {
        await loopScript(this.page)
      }
    }, this.params.interval * 1000)
    return Promise.resolve()
  }

  /**
   * FIXIME: setIntervalが終わってから動いている気がする
   */
  public end = () => {
    let endScript: InjectScript | undefined
    if (this.params.endScriptPath) {
      endScript = dynamicImport(getAbsolutePath(this.params.endScriptPath))
    }
    setTimeout(async () => {
      this.running = false
      if (this.intervalTimer) {
        clearInterval(this.intervalTimer)
      }
      if (endScript) {
        await endScript(this.page)
      }
      await this.saveLog()
      await this.browser.close()
    }, this.params.end * 1000)
  }

  private saveLog = async () => {
    await writeFile(this.params.output, JSON.stringify(this.cacheData), err => {
      if (err) {
        console.error('Throw Error', err)
        throw err
      }
    })
    console.log('Save Log: ', getAbsolutePath(this.params.output))
  }
}
