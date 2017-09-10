const app = require('../../lib/app')
const Messenger = require('../../lib/messenger')
const request = require('supertest')
const sinon = require('sinon')

let sendMessage

describe('server', () => {
  beforeEach(() => {
    sendMessage = sinon.stub(Messenger, 'sendMessage').resolves()
  })

  afterEach(() => {
    sendMessage.restore()
  })

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
          expect(sendMessage.callCount).toBe(1)
        })
    })

    test('missing name', () => {
      return request(app)
        .post('/sign-in')
        .then(response => {
          expect(response.body).toEqual({
            error: { code: 422, message: 'Missing name' }
          })
          expect(response.statusCode).toBe(422)
        })
    })

    test('error in sendMessage', () => {
      sendMessage.rejects()

      return request(app)
        .post('/sign-in')
        .send({ name: 'Kyle' })
        .then(response => {
          expect(response.body).toEqual({
            error: { code: 400, message: 'Error sending Slack message' }
          })
          expect(response.statusCode).toBe(400)
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
          expect(sendMessage.callCount).toBe(1)
        })
    })

    test('missing name', () => {
      return request(app)
        .post('/sign-out')
        .then(response => {
          expect(response.body).toEqual({
            error: { code: 422, message: 'Missing name' }
          })
          expect(response.statusCode).toBe(422)
        })
    })

    test('error in sendMessage', () => {
      sendMessage.rejects()

      return request(app)
        .post('/sign-out')
        .send({ name: 'Kyle' })
        .then(response => {
          expect(response.body).toEqual({
            error: { code: 400, message: 'Error sending Slack message' }
          })
          expect(response.statusCode).toBe(400)
        })
    })
  })
})
