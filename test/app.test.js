const app = require('../lib/app')
const request = require('supertest')

describe('server', () => {
  describe('/', () => {
    test('no route', () => {
      return request(app)
        .get('/')
        .then(response => {
          expect(response.statusCode).toBe(404)
        })
    })
  })

  describe('/sign-in', () => {
    test('valid request', () => {
      return request(app)
        .post('/sign-in')
        .send({ name: 'Kyle' })
        .then(response => {
          expect(response.statusCode).toBe(200)
        })
    })

    test('invalid request - missing name', () => {
      return request(app)
        .post('/sign-in')
        .then(response => {
          expect(response.body).toEqual({
            error: { code: 422, message: 'Error - missing name' }
          })
          expect(response.statusCode).toBe(422)
        })
    })
  })

  describe('/sign-out', () => {
    test('valid request', () => {
      return request(app)
        .post('/sign-out')
        .send({ name: 'Kyle' })
        .then(response => {
          expect(response.statusCode).toBe(200)
        })
    })

    test('invalid request - missing name', () => {
      return request(app)
        .post('/sign-out')
        .then(response => {
          expect(response.body).toEqual({
            error: { code: 422, message: 'Error - missing name' }
          })
          expect(response.statusCode).toBe(422)
        })
    })
  })
})
