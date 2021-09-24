chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'write to clipboard':
      console.log('write clip')
      navigator.clipboard
        .writeText(message.content)
        .then()
        .catch((err) => {
          console.log(err)
        })
      break
    case 'get selected text include newline-code':
      console.log('content_quote')
      return Promise.resolve({ response: 'quote success!' })
      break
  }
})
