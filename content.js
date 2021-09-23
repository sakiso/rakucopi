console.log('contentjs start')
chrome.runtime.onMessage.addListener((message, sender) => {
  console.log('content:', tabId, message)
  navigator.clipboard
    .writeText(message.content)
    .then()
    .catch((err) => {
      console.log(err)
    })
})
