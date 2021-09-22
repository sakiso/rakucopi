'use strict';

{
  //コンテキストメニューに当拡張機能の欄を追加
  chrome.runtime.onInstalled.addListener(() => {
    //拡張機能のインストール・更新の際に呼ばれる。ブラウザを閉じても残る。
    const parent = chrome.contextMenus.create({
      id: 'copy_mdurl',
      title: 'URLコピー(Markdown)',
      contexts: ['all'],
    });
  });

  // コンテキストメニュークリック時に実行する処理
  chrome.contextMenus.onClicked.addListener((info) => {
    getText(info);
    getUrl();
  });

  function getText(info) {
    console.log('get text', info.selectionText);
  }

  function getUrl() {
    console.log('get url');
  }
}
