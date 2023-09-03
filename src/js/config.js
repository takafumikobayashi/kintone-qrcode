jQuery.noConflict();

(function($, PLUGIN_ID) {
  'use strict';

  let $form = $('.js-submit-settings');
  let $cancelButton = $('.js-cancel-button');
  if (!($form.length > 0 && $cancelButton.length > 0)) {
    throw new Error('Required elements do not exist.');
  }

  let appId = kintone.app.getId();
  let config = kintone.plugin.app.getConfig(PLUGIN_ID);

  let $selectMenu = $('<select>').attr('id', 'field-selection').attr('name', 'fieldSelection');
  let $selectMenu_2 = $('<select>').attr('id', 'field-selection-2').attr('name', 'fieldSelection2');

  kintone.api('/k/v1/form', 'GET', {app: appId}, function(resp) {

    for (let key in resp.properties) {
        let field = resp.properties[key];

        //field-selectionへの格納
        if (field.type === 'SPACER') {
          let $option = $('<option>').val(field.elementId).text(field.elementId);
          if (field.elementId === config.qrcode) {
            $option.prop('selected', true);
          }
          $selectMenu.append($option);
        }

        //field-selection-2への格納
        if (field.type === 'SINGLE_LINE_TEXT') {
          let $option_2 = $('<option>').val(field.code).text(field.label);
          if (field.code === config.qrfield) {
            $option_2.prop('selected', true);
          }
          $selectMenu_2.append($option_2);
        }
    }
    
    // <select>メニューをconfig画面の適切な場所に追加
    $('.field-selection-area').append($selectMenu);
    $('.field-selection-area-2').append($selectMenu_2);

  }, function(error) {
      console.error('フォーム情報の取得に失敗しました。:', error);
  });

  $form.on('submit', function(e) {
    e.preventDefault();
    console.log('$selectMenu.val()=' + $selectMenu.val());
    console.log('$selectMenu_2.val()=' + $selectMenu_2.val());
    kintone.plugin.app.setConfig({qrcode: $selectMenu.val(), qrfield: $selectMenu_2.val()}, function() {
      alert('設定を正しく保存しました。「アプリの設定」に戻ってアプリを更新してください。');
      window.location.href = '../../flow?app=' + kintone.app.getId();
    });
  });
  $cancelButton.on('click', function() {
    window.location.href = '../../' + kintone.app.getId() + '/plugin/';
  });
})(jQuery, kintone.$PLUGIN_ID);
