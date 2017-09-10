const bodyParser = require('body-parser')
const express = require('express')
const Messenger = require('./messenger')

const app = express()
app.use(bodyParser.json())

app.post('/sign-in', (request, response) => {
  return handleResponse({ isSignOn: true, request, response })
})

app.post('/sign-out', (request, response) => {
  return handleResponse({ isSignOn: false, request, response })
})

function handleResponse({ request, response, isSignOn }) {
  const { name } = request.body
  const channel = process.env.SLACK_CHANNEL

  if (!name) {
    return response
      .status(422)
      .json({ error: { code: 422, message: 'Missing name' } })
  }

  Messenger.sendMessage({ isSignOn, name, channel })
    .then(() => response.sendStatus(200))
    .catch(error => {
      response
        .status(400)
        .send({ error: { code: 400, message: 'Error sending Slack message' } })
    })
}

module.exports = app
