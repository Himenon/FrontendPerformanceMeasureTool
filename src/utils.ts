import { isAbsolute, resolve } from 'path'
import { InjectScript } from './types'

export const getAbsolutePath = (inputPath: string): string => {
  if (isAbsolute(inputPath)) {
    return inputPath
  }
  return resolve(process.cwd(), inputPath)
}

export const dynamicImport = (importFilePath: string): InjectScript => {
  return require(importFilePath).default
}
