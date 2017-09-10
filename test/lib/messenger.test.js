require('dotenv').config()

const axios = require('axios')
const Messenger = require('../../lib/messenger')
const sinon = require('sinon')

let getRandomMessage
let post

describe('Messenger', () => {
  describe('#sendMessage', () => {
    beforeEach(() => {
      getRandomMessage = sinon
        .stub(Messenger, '_getRandomMessage')
        .returns('test')
      post = sinon.stub(axios, 'post')
    })

    afterEach(() => {
      getRandomMessage.restore()
      post.restore()
    })

    describe('sign on', () => {
      test('successful request', () => {
        post.resolves('Success')
        return Messenger.sendMessage({
          isSignOn: true,
          channel: 'test',
          name: 'Kyle'
        }).then(response => {
          expect(response).toBe('Success')
          expect(getRandomMessage.callCount).toBe(1)
          expect(getRandomMessage.firstCall.args).toEqual([
            { isSignOn: true, name: 'Kyle' }
          ])
        })
      })

      test('error in response', () => {
        post.returns(Promise.reject('Error'))
        return Messenger.sendMessage({
          isSignOn: true,
          channel: 'test',
          name: 'Kyle'
        }).catch(error => {
          expect(error).toBe('Error')
          expect(getRandomMessage.callCount).toBe(1)
          expect(getRandomMessage.firstCall.args).toEqual([
            { isSignOn: true, name: 'Kyle' }
          ])
        })
      })
    })

    describe('sign off', () => {
      test('successful request', () => {
        post.resolves('Success')
        return Messenger.sendMessage({
          isSignOn: false,
          channel: 'test',
          name: 'Kyle'
        }).then(response => {
          expect(response).toBe('Success')
          expect(getRandomMessage.callCount).toBe(1)
          expect(getRandomMessage.firstCall.args).toEqual([
            { isSignOn: false, name: 'Kyle' }
          ])
        })
      })

      test('error in response', () => {
        post.returns(Promise.reject('Error'))
        return Messenger.sendMessage({
          isSignOn: false,
          channel: 'test',
          name: 'Kyle'
        }).catch(error => {
          expect(error).toBe('Error')
          expect(getRandomMessage.callCount).toBe(1)
          expect(getRandomMessage.firstCall.args).toEqual([
            { isSignOn: false, name: 'Kyle' }
          ])
        })
      })
    })
  })
})
