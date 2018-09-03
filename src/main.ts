import { Measure } from './measure'
import { MainArgs } from './types'

export const main = async (args: MainArgs) => {
  const m = new Measure(args)
  m.prepare()
  m.start()
  m.end()
}
