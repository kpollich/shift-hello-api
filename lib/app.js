const bodyParser = require('body-parser')
const express = require('express')

const app = express()
app.use(bodyParser.json())

app.post('/sign-in', (request, response) => {
  const { name } = request.body

  if (!name) {
    return response
      .status(422)
      .json({ error: { code: 422, message: 'Error - missing name' } })
  }

  return response.sendStatus(200)
})

app.post('/sign-out', (request, response) => {
  const { name } = request.body

  if (!name) {
    return response
      .status(422)
      .json({ error: { code: 422, message: 'Error - missing name' } })
  }

  return response.sendStatus(200)
})

module.exports = app
