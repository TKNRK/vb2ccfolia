(function(e){function t(t){for(var n,i,l=t[0],u=t[1],o=t[2],p=0,d=[];p<l.length;p++)i=l[p],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&d.push(r[i][0]),r[i]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);s&&s(t);while(d.length)d.shift()();return c.push.apply(c,o||[]),a()}function a(){for(var e,t=0;t<c.length;t++){for(var a=c[t],n=!0,l=1;l<a.length;l++){var u=a[l];0!==r[u]&&(n=!1)}n&&(c.splice(t--,1),e=i(i.s=a[0]))}return e}var n={},r={app:0},c=[];function i(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=n,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(a,n,function(t){return e[t]}.bind(null,n));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/vb2ccfolia/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var o=0;o<l.length;o++)t(l[o]);var s=u;c.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("cd49")},"2c25":function(e,t,a){"use strict";a("743b")},"743b":function(e,t,a){},cd49:function(e,t,a){"use strict";a.r(t);var n=a("7a23");const r={id:"chara-converter"},c=Object(n["f"])("h1",null,"キャラクター保管所 -> ccfolia のコマ",-1),i=Object(n["f"])("div",{id:"description"},[Object(n["f"])("p",null," キャラクター保管所 (https://charasheet.vampire-blood.net/) のキャラシを ccfolia のコマに変換します。 "),Object(n["f"])("ol",null,[Object(n["f"])("li",null,"キャラシのデータID（URLの数字）を以下フォームに入力してください"),Object(n["f"])("li",null,"正常に取得できれば、クリップボードにキャラ情報がコピーされます"),Object(n["f"])("li",null,"ccfolia の部屋に入ってペーストすれば駒が出来上がります")])],-1),l={id:"input"},u={id:"utakaze-cc"},o=Object(n["f"])("p",null,"クリティカルコールを適用するダイスプールの範囲",-1),s={id:"cc-settnigs-list"},p={id:"cc-lower-item"},d=Object(n["f"])("option",{value:"0"},"-",-1),m=Object(n["e"])(" 以上でクリティカルコールを適用する "),b={id:"cc-upper-item"},v=Object(n["f"])("option",{value:"0"},"-",-1),f=Object(n["e"])(" 以下でクリティカルコールを適用する "),j={id:"result"},O={key:0},h=Object(n["f"])("p",null,[Object(n["e"])(" データが取得できませんでした。データIDをもう一度ご確認の上、入力してください。"),Object(n["f"])("br"),Object(n["e"])(" キャラシの URL が https://charasheet.vampire-blood.net/100 だったら 100 を入力してください。 "),Object(n["f"])("br"),Object(n["e"])(" また、パスワードが設定されている場合はデータが取得できません。 ")],-1),g={key:1},U={key:2},k=Object(n["f"])("p",null,"以下の内容についてデータをクリップボードにコピーしました",-1);function w(e,t,a,w,y,L){return Object(n["h"])(),Object(n["c"])("div",r,[c,i,Object(n["f"])("div",l,[Object(n["n"])(Object(n["f"])("input",{"onUpdate:modelValue":t[1]||(t[1]=t=>e.state.id=t),placeholder:"edit me"},null,512),[[n["m"],e.state.id]]),Object(n["f"])("button",{onClick:t[2]||(t[2]=(...t)=>e.onButtonClicked&&e.onButtonClicked(...t))},"クリップボードにコピー")]),Object(n["f"])("div",u,[o,Object(n["f"])("ul",s,[Object(n["f"])("li",p,[Object(n["n"])(Object(n["f"])("select",{id:"cc-lower-limit","onUpdate:modelValue":t[3]||(t[3]=t=>e.state.ccLowerLimit=t)},[d,(Object(n["h"])(),Object(n["c"])(n["a"],null,Object(n["j"])(11,e=>Object(n["f"])("option",{key:"ccll-"+e,value:e+1},Object(n["k"])(e+1),9,["value"])),64))],512),[[n["l"],e.state.ccLowerLimit]]),m]),Object(n["f"])("li",b,[Object(n["n"])(Object(n["f"])("select",{id:"cc-upper-limit","onUpdate:modelValue":t[4]||(t[4]=t=>e.state.ccUpperLimit=t)},[v,(Object(n["h"])(),Object(n["c"])(n["a"],null,Object(n["j"])(11,e=>Object(n["f"])("option",{key:"ccul-"+e,value:e+1},Object(n["k"])(e+1),9,["value"])),64))],512),[[n["l"],e.state.ccUpperLimit]]),f])])]),Object(n["f"])("div",j,[e.state.hasError?(Object(n["h"])(),Object(n["c"])("div",O,[h])):Object(n["d"])("",!0),e.state.isUnsupportedSystem?(Object(n["h"])(),Object(n["c"])("div",g,[Object(n["f"])("p",null,"システム: "+Object(n["k"])(e.state.game)+" は本アプリではサポートされていません",1)])):Object(n["d"])("",!0),e.state.charaName?(Object(n["h"])(),Object(n["c"])("div",U,[k,Object(n["f"])("ul",null,[Object(n["f"])("li",null,"システム: "+Object(n["k"])(e.state.game),1),Object(n["f"])("li",null,"PC名: "+Object(n["k"])(e.state.charaName),1)])])):Object(n["d"])("",!0)])])}var y=a("9ab4"),L=a("dc02");function C(e){var t=[":希望-1",":希望-"];e.friends.forEach((function(e){e.name&&t.push(":"+e.name+"-1 【友情】")})),t.push("=== 能力値判定","{勇気}UK 【勇気】","{知恵}UK 【知恵】","{愛情}UK 【愛情】");var a=function(t){return(0!==e.ccLimit.lower||0!==e.ccLimit.upper)&&(0===e.ccLimit.lower?t<=e.ccLimit.upper:0===e.ccLimit.upper?e.ccLimit.lower<=t:e.ccLimit.lower<=t&&t<=e.ccLimit.upper)},n=a(e.params.battle)?"({勇気}+{戦い})UK@{龍} 【CC:勇気+戦い】":"({勇気}+{戦い}) 【勇気+戦い】",r=a(e.params.hunt)?"({知恵}+{狩り})UK@{龍} 【CC:知恵+狩り】":"({知恵}+{狩り})UK 【知恵+狩り】",c=a(e.params.sing)?"({愛情}+{歌})UK@{龍} 【CC:愛情+歌】":"({愛情}+{歌})UK 【愛情+歌】";t.push("=== 戦闘技能判定",""+n+e.equip.melee,""+r+e.equip.ranged,""+c+e.equip.instrument);var i=a(e.params.adventure)?"({勇気}+{冒険})UK@{龍} 【CC:勇気+冒険】":"({勇気}+{冒険})UK 【勇気+冒険】",l=a(e.params.ride)?"({勇気}+{騎乗})UK@{龍} 【CC:勇気+騎乗】":"({勇気}+{騎乗})UK 【勇気+騎乗】",u=a(e.params.sense)?"({知恵}+{感覚})UK@{龍} 【CC:知恵+感覚】":"({知恵}+{感覚})UK 【知恵+感覚】",o=a(e.params.knowledge)?"({知恵}+{学問})UK@{龍} 【CC:知恵+学問】":"({知恵}+{学問})UK 【知恵+学問】",s=a(e.params.persuade)?"({愛情}+{説得})UK@{龍} 【CC:愛情+説得】":"({愛情}+{説得})UK 【愛情+説得】",p=a(e.params.heart)?"({愛情}+{心話})UK@{龍} 【CC:愛情+心話】":"({愛情}+{心話})UK 【愛情+心話】";return t.push("=== 探索技能判定",i,l,u,o,s,p),t.join("\n")}function _(e){var t="「所持アイテム」\n"+e.items.map((function(e){return e.name+": "+e.desc})).join("\n"),a=[{label:"希望",value:e.status.hope,max:e.status.hope}];e.friends.forEach((function(e){var t,n;e.name&&a.push({label:e.name,value:null!==(t=parseInt(e.friendship))&&void 0!==t?t:0,max:null!==(n=parseInt(e.friendship))&&void 0!==n?n:0})}));var n=e.params.battle-e.params.courage,r=e.params.adventure-e.params.courage,c=e.params.ride-e.params.courage,i=e.params.hunt-e.params.wisdom,l=e.params.sense-e.params.wisdom,u=e.params.knowledge-e.params.wisdom,o=e.params.sing-e.params.love,s=e.params.persuade-e.params.love,p=e.params.heart-e.params.love,d=[{label:"龍",value:""+e.status.dragon},{label:"勇気",value:""+e.params.courage},{label:"戦い",value:""+n},{label:"冒険",value:""+r},{label:"騎乗",value:""+c},{label:"知恵",value:""+e.params.wisdom},{label:"狩り",value:""+i},{label:"感覚",value:""+l},{label:"学問",value:""+u},{label:"愛情",value:""+e.params.love},{label:"歌",value:""+o},{label:"説得",value:""+s},{label:"心話",value:""+p}];return{kind:"character",data:{name:e.name,memo:t,externalUrl:"https://charasheet.vampire-blood.net/"+e.id,status:a,params:d,commands:C(e)}}}function K(e){for(var t,a,n,r,c,i,l,u,o,s,p,d,m,b,v,f=[],j=0;j<e.friend_name.length;j++){var O=e.friend_name[j],h=e.friend_lv[j];O&&f.push({name:O,friendship:h})}var g=[];for(j=0;j<e.item_name.length;j++){var U=e.item_name[j],k=e.item_memo[j];U&&g.push({name:U,desc:k})}return{id:null!==(t=parseInt(e.data_id))&&void 0!==t?t:0,name:e.pc_name,friends:f,status:{hope:null!==(a=parseInt(e.NP10))&&void 0!==a?a:6,dragon:null!==(n=parseInt(e.dragon_id))&&void 0!==n?n:0},params:{courage:null!==(r=parseInt(e.N_Yuuki))&&void 0!==r?r:2,battle:null!==(c=parseInt(e.NP1))&&void 0!==c?c:0,adventure:null!==(i=parseInt(e.NP2))&&void 0!==i?i:0,ride:null!==(l=parseInt(e.NP3))&&void 0!==l?l:0,wisdom:null!==(u=parseInt(e.N_Chie))&&void 0!==u?u:2,hunt:null!==(o=parseInt(e.NP4))&&void 0!==o?o:0,sense:null!==(s=parseInt(e.NP5))&&void 0!==s?s:0,knowledge:null!==(p=parseInt(e.NP6))&&void 0!==p?p:0,love:null!==(d=parseInt(e.N_Aijou))&&void 0!==d?d:2,sing:null!==(m=parseInt(e.NP7))&&void 0!==m?m:0,persuade:null!==(b=parseInt(e.NP8))&&void 0!==b?b:0,heart:null!==(v=parseInt(e.NP9))&&void 0!==v?v:0},equip:{melee:e.kinsetu_buki,ranged:e.enkaku_buki,instrument:e.tokushu_buki},items:g,ccLimit:{lower:2,upper:5}}}var I=Object(n["g"])({name:"App",setup:function(){var e=this,t=Object(n["i"])({ccLowerLimit:2,ccUpperLimit:5,hasError:!1,isUnsupportedSystem:!1}),a=function(e){var t=function(a){var n;null===(n=a.clipboardData)||void 0===n||n.setData("text/plain",e),a.preventDefault(),document.removeEventListener("copy",t)};document.addEventListener("copy",t),document.execCommand("copy")},r=function(e){var n=K(e);t.charaName=n.name,n.ccLimit={lower:t.ccLowerLimit,upper:t.ccUpperLimit};var r=_(n);a(JSON.stringify(r))},c=function(){return Object(y["a"])(e,void 0,void 0,(function(){var e;return Object(y["b"])(this,(function(a){return t.charaName=t.game=void 0,t.hasError=t.isUnsupportedSystem=!1,Object(L["a"])("https://charasheet.vampire-blood.net/"+(null!==(e=t.id)&&void 0!==e?e:0)+".js").then((function(e){switch(t.game=e.game,e.game){case"utakaze":r(e);break;default:t.isUnsupportedSystem=!0}})).catch((function(e){console.log(e),t.hasError=!0})),[2]}))}))};return{state:t,onButtonClicked:c}}});a("2c25");I.render=w;var N=I;Object(n["b"])(N).mount("#app")}});
//# sourceMappingURL=app.1d29a2bf.js.map