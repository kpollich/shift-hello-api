require('dotenv').config()

const app = require('./lib/app')

const listener = app.listen(process.env.PORT || 3000 , () => {
  console.log('App listening on port', listener.address().port)
})
