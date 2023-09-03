jQuery.noConflict();

(function($, PLUGIN_ID) {
  'use strict';

  kintone.events.on('app.record.detail.show', function() {
    let config = kintone.plugin.app.getConfig(PLUGIN_ID);
    let qrfield = events.record[config.qrfield].value;

    // スペース要素の取得（PCとモバイルで要素取得のメソッドが違います）
    const space = kintone.mobile.app.record.getSpaceElement(config.qrcode);
    // QRコード用のimg要素を作ります
    const img = document.createElement('img');
    // GETクエリにQRコード化したい文字列を含めて画像のソースとして使うことができます。
    // サイズを 150 x 150 に指定しています。
    img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + qrfield;

    // スペース要素に追加して表示完了
    space.appendChild(img);

  });
})(jQuery, kintone.$PLUGIN_ID);
