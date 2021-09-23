'use strict'

{
  //拡張機能インストール時、コンテキストメニューに当拡張機能の欄を追加
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'copy_mdurl',
      title: 'URLコピー(Markdown)',
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

    console.log(markdownText)
  })

  //-----以下関数エリア-----
  //選択した文字列を取得し出力する
  function getSelectedText(info) {
    const selectedText = info.selectionText || '' //画面上何も選択されていない場合selectionTextはundefinedになる
    return selectedText
  }

  //ページのURLを取得し出力する
  function getUrl(info) {
    return info.pageUrl
  }

  //タイトルとURLをマークダウン記法に変換して出力する
  function convertUrlToMarkdown({ title, url }) {
    const markdown = '[' + title + ']' + '(' + url + ')'
    return markdown
  }
}
