'use strict'
chrome.runtime.onMessage.addListener(function (message) {
  if (message.type === 'write to clipboard') {
    navigator.clipboard
      .writeText(message.content)
      .then()
      .catch((err) => {
        console.log(err)
      })
  }
})
