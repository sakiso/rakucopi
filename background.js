'use strict'

{
  //コンテキストメニューに当拡張機能の欄を追加
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'copy_mdurl',
      title: 'URLコピー(Markdown)',
      contexts: ['all'],
    })
  })

  chrome.contextMenus.onClicked.addListener((info) => {
    // コンテキストメニュークリック時に以下が実行される
    getSelectedText(info)
    getUrl(info)
    console.log('text:', getSelectedText(info), 'url:', getUrl(info))
  })

  //選択した文字列を取得し出力する
  function getSelectedText(info) {
    const selectedText = info.selectionText || '' //画面上何も選択されていない場合selectionTextはundefinedになる
    return selectedText
  }

  //ページのURLを取得し出力する
  function getUrl(info) {
    return info.pageUrl
  }

  //入力された文字列とURLをマークダウン記法に変換して出力する関数
}
