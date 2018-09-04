#!/usr/bin/env node
import chalk from 'chalk'
import * as meow from 'meow'
import { main } from './main'
import { flagSchemas } from './schemas'
import { MainArgs } from './types'

export const cliMain = () => {
  const cli = meow(
    chalk`
{underline Usage}
  $ fperf <config> [...options]
  $ fperf --interval 1 --end 10 --output /your/file/path
`,
    flagSchemas,
  )
  const interval = parseInt(cli.flags.interval, 10)
  const output = cli.flags.output
  const end = parseInt(cli.flags.end, 10)
  const url = cli.flags.url
  const prepareScriptPath = cli.flags.prepareScript
  const args: MainArgs = {
    url,
    interval,
    output,
    end,
    prepareScriptPath,
  }
  main(args)
}

cliMain()
