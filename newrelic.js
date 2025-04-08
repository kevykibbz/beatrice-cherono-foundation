'use strict'

exports.config = {
  app_name: ['beatrice-cherono-foundation-ngo'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY ,
  distributed_tracing: {
    enabled: true
  },
  logging: {
    level: 'info',
    filepath: 'stdout'
  },
  allow_all_headers: true,
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*'
    ]
  }
}