chrome.runtime.onMessage.addListener((tabId, message) => {
  if (message.type === 'write to clipboard') {
    console.log('content:', tabId, message)
    navigator.clipboard
      .writeText(message.content)
      .then()
      .catch((err) => {
        console.log(err)
      })
  }
})
