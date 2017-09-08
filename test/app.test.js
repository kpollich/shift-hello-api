const app = require('../lib/app')
const request = require('supertest')

describe('server', () => {
  test('responds with hello world', () => {
    return request(app)
      .get('/')
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toBe('Hello World!')
      })
  })
})
