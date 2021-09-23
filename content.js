chrome.runtime.onMessage.addListener((message, sender) => {
  navigator.clipboard
    .writeText(message.content)
    .then()
    .catch((err) => {
      console.log(err)
    })
})
