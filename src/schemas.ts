import * as meow from 'meow'

export const flagSchemas: meow.Options = {
  autoHelp: true,
  flags: {
    url: {
      type: 'string',
      default: 'http://example.com/',
    },
    interval: {
      type: 'string',
      alias: 'i',
      default: 10,
    },
    end: {
      type: 'string',
      default: 10,
    },
    output: {
      type: 'string',
      alias: 'o',
    },
    prepareScript: {
      type: 'string',
      alias: 'p',
      default: undefined,
    },
  },
}
