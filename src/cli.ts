#!/usr/bin/env node
import chalk from 'chalk'
import * as meow from 'meow'
import { main } from './main'
import { flagSchemas } from './schemas'
import { MainArgs, PuppeteerOptions } from './types'

export const cliMain = () => {
  const cli = meow(
    chalk`
{underline Usage}
  $ fperf <config> [...options]
  $ fperf --interval 1 --end 10 --output /your/file/path
`,
    flagSchemas,
  )
  const args: MainArgs = {
    url: cli.flags.url,
    interval: parseInt(cli.flags.interval, 10),
    output: cli.flags.output,
    end: parseInt(cli.flags.end, 10),
    prepareScriptPath: cli.flags.prepareScript,
    loopScriptPath: cli.flags.loopScript,
    endScriptPath: cli.flags.endScript,
  }
  const options: PuppeteerOptions = {
    headless: !cli.flags.noHeadless,
    executablePath: cli.flags.executablePath,
  }
  main(args, options)
}

cliMain()
