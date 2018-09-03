import { Measure } from './measure'
import { MainArgs } from './types'

export const main = async (args: MainArgs) => {
  const m = new Measure(args)
  // TODO ここに任意のjavascriptを差し込めるようにする
  // ex: login
  m.prepare()
  m.start()
  m.end()
}
