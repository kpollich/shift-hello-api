const axios = require('axios')

class Messenger {
  static sendMessage({ isSignOn, name, channel }) {
    const text = this._getRandomMessage({ isSignOn, name })

    return axios.post(process.env.SLACK_ENDPOINT, { text, channel })
  }

  static _getRandomMessage({ isSignOn, name }) {
    const signOnMessages = [
      `${name} is in the house!`,
      `Here's ${name}!`,
      `Peek-a-boo! It's ${name}.`,
      `‘Ello gov'nor! It's ${name}.`,
      `${name} has signed on - hello everyone!`,
      `Have no fear, ${name} is here!`
    ]

    const signOffMessages = [
      `${name} says: Hasta la vista...baby :gun: :sunglasses:`,
      `${name} is peacing out :v:`,
      `It's time for ${name} to go night night :wave:`
    ]

    const messages = isSignOn ? signOnMessages : signOffMessages

    return messages[Math.floor(Math.random() * messages.length)]
  }
}

module.exports = Messenger
