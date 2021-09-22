'use strict';

{
  //   chrome.runtime.onInstalled.addListener(() => {
  //     //拡張機能のインストール・VerUPの際に呼ばれる。ブラウザを閉じても残る。
  const parent = chrome.contextMenus.create({
    id: 'copy_mdurl',
    title: 'URLコピー(Markdown)',
    contexts: ['page', 'selection'],
  });
  //   });

  // メニューをクリック時に実行
  chrome.contextMenus.onClicked.addListener((item) => {
    const wk = info.selectionText;
    console.log(wk);
  });
}
