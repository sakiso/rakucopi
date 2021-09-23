//拡張機能インストール時、コンテキストメニューに当拡張機能の欄を追加
//TODO_ページTitleを取得する欄と機能も追加する
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'copy_mdurl',
    title: 'MdCopy!(URL&Text)',
    contexts: ['all'],
  })
})

// コンテキストメニュークリック時に以下が実行される
chrome.contextMenus.onClicked.addListener((info) => {
  const selectedText = getSelectedText(info)
  const pageUrl = getUrl(info)
  const markdownText = convertUrlToMarkdown({
    title: selectedText,
    url: pageUrl,
  })

  writeTextToClipboard(markdownText)
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
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const message = { type: 'write to clipboard', content: text }
    chrome.tabs.sendMessage(tabs[0].id, message)
  })
}
