import { launch } from 'puppeteer'

const main = async () => {
  const url = ''
  const MEASUREMENT_TIME = 10 // sec
  let flag: boolean = true
  const browser = await launch()
  const page = await browser.newPage()
  await page.goto(url)
  await page.screenshot({ path: 'output/screenshot.png', fullPage: true })
  const timerNumber = setInterval(async () => {
    if (flag) {
      console.log(await page.metrics())
    }
  }, 500)
  setTimeout(async () => {
    flag = false
    clearInterval(timerNumber)
    await browser.close()
  }, MEASUREMENT_TIME * 1000)
}

main()
