jQuery.noConflict(),function(e,t){"use strict";let n=e(".js-submit-settings"),o=e(".js-cancel-button");if(!(n.length>0&&o.length>0))throw new Error("Required elements do not exist.");let l=kintone.app.getId(),i=kintone.plugin.app.getConfig(t);console.log("qrcode ="+i.qrcode),console.log("qrqrfield ="+i.qrfield);let p=e("<select>").attr("id","field-selection").attr("name","fieldSelection"),r=e("<select>").attr("id","field-selection-2").attr("name","fieldSelection2");kintone.api("/k/v1/form","GET",{app:l},(function(t){for(let n in t.properties){let o=t.properties[n];if("SPACER"===o.type){let t=e("<option>").val(o.elementId).text(o.elementId);o.elementId===i.qrcode&&t.prop("selected",!0),p.append(t)}if("SINGLE_LINE_TEXT"===o.type){let t=e("<option>").val(o.code).text(o.label);o.code===i.qrfield&&t.prop("selected",!0),r.append(t)}}e(".field-selection-area").append(p),e(".field-selection-area-2").append(r)}),(function(e){console.error("フォーム情報の取得に失敗しました。:",e)})),n.on("submit",(function(e){e.preventDefault(),console.log("$selectMenu.val()="+p.val()),console.log("$selectMenu_2.val()="+r.val()),kintone.plugin.app.setConfig({qrcode:p.val(),qrfield:r.val()},(function(){alert("設定を正しく保存しました。「アプリの設定」に戻ってアプリを更新してください。"),window.location.href="../../flow?app="+kintone.app.getId()}))})),o.on("click",(function(){window.location.href="../../"+kintone.app.getId()+"/plugin/"}))}(jQuery,kintone.$PLUGIN_ID);