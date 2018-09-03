export interface MainArgs {
  url: string
  end: number
  interval: number
  output: string
}

export interface SamplingData {
  meta: MainArgs
  sampling: any[]
}
