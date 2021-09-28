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
      const selectedText = window.getSelection().toString()
      const quotedText = '>' + selectedText.replace(/\n/g, '\n>') //先頭と改行ごとに”>”付与

      sendResponse({ body: quotedText })
  }
})
