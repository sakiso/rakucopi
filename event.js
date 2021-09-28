//拡張機能インストール時、コンテキストメニューに当拡張機能の欄を追加
//TODO_ページTitleを取得する欄と機能も追加する
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'copy_mdurl',
    title: 'MdCopy!(URL,Text)',
    contexts: ['all'],
  })
  chrome.contextMenus.create({
    id: 'copy_mdquote',
    title: 'MdCopy!(Quote)',
    contexts: ['selection'],
  })
})

// コンテキストメニュークリック時に以下が実行される
chrome.contextMenus.onClicked.addListener(async (info) => {
  switch (info.menuItemId) {
    case 'copy_mdurl':
      const selectedText = getSelectedText(info)
      const pageUrl = getUrl(info)
      const markdownText = convertUrlToMarkdown({
        title: selectedText,
        url: pageUrl,
      })
      writeTextToClipboard(markdownText)
      break

    case 'copy_mdquote':
      console.log('md quote')
      //TODO_message passing
      const selectedTextIncludeNewlineCode =
        await getSelectedTextIncludeNewlineCode()
      //FIXME_同期処理にならない！！！
      console.log('copy', selectedTextIncludeNewlineCode)
      //TODO_callbackで改行含む文字列を取得して
      //行頭(1文字目と各改行コードの直後)に”>”を追加する
      writeTextToClipboard(selectedTextIncludeNewlineCode)
      break
  }
})

//-----以下関数エリア-----
//選択した文字列を取得し出力する
function getSelectedText(info) {
  return info.selectionText || '' //画面上何も選択されていない場合selectionTextはundefinedになる
}

//ページのURLを取得し出力する
function getUrl(info) {
  return info.pageUrl
}

//タイトルとURLをマークダウン記法に変換して出力する
function convertUrlToMarkdown({ title = '', url = '' }) {
  return '[' + title + ']' + '(' + url + ')'
}

//与えられた文字列をクリップボードに書き込む
function writeTextToClipboard(text) {
  // 対象のタブのidを取得しcontent script側でクリップボードに書き込みさせる
  // navigator.clipboardは、Background側で使えないバグがあるため
  // TODO_ActiveTab権限を無効にしても動いたので各引数が必要か、もう一度ちゃんと考える必要あり
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const message = { type: 'write to clipboard', content: text }
    chrome.tabs.sendMessage(tabs[0].id, message)
  })
}

//改行を含む選択文字列を取得する
async function getSelectedTextIncludeNewlineCode() {
  // 対象のタブのidを取得しcontent script側で改行を含む選択文字列を取得する
  // selectionTextは、改行を空白に変換するため使えない
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const message = {
      type: 'get selected text include newline-code',
    }
    const ret = await chrome.tabs.sendMessage(
      tabs[0].id,
      message,
      async (response) => {
        const selectedText = await response
        console.log('res', selectedText)
        const wk = selectedText
        console.log('wk', wk)
        return true
      }
    )
    console.log('ret', ret)
    return true
  })
  return 'true2'
}
