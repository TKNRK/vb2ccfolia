<template>
  <div id="chara-converter">
    <h1>キャラクター保管所 -> ccfolia のコマ</h1>
    <div id="description">
      <p>
        キャラクター保管所 (https://charasheet.vampire-blood.net/) のキャラシを
        ccfolia のコマに変換します。
      </p>
      <ol>
        <li>キャラシのデータID（URLの数字）を以下フォームに入力してください</li>
        <li>正常に取得できれば、クリップボードにキャラ情報がコピーされます</li>
        <li>ccfolia の部屋に入ってペーストすれば駒が出来上がります</li>
      </ol>
    </div>
    <div id="input">
      <input v-model="state.id" placeholder="edit me" />
      <button @click="onButtonClicked">クリップボードにコピー</button>
    </div>
    <div id="utakaze-cc">
      <p>クリティカルコールを適用するダイスプールの範囲</p>
      <ul id="cc-settnigs-list">
        <li id="cc-lower-item">
          <select id="cc-lower-limit" v-model="state.ccLowerLimit">
            <option value="0">-</option>
            <option
              v-for="lowerLimit in 11"
              :key="`ccll-${lowerLimit}`"
              :value="lowerLimit + 1"
            >
              {{ lowerLimit + 1 }}
            </option>
          </select>
          以上でクリティカルコールを適用する
        </li>
        <li id="cc-upper-item">
          <select id="cc-upper-limit" v-model="state.ccUpperLimit">
            <option value="0">-</option>
            <option
              v-for="upperLimit in 11"
              :key="`ccul-${upperLimit}`"
              :value="upperLimit + 1"
            >
              {{ upperLimit + 1 }}
            </option>
          </select>
          以下でクリティカルコールを適用する
        </li>
      </ul>
    </div>
    <div id="result">
      <div v-if="state.hasError">
        <p>
          データが取得できませんでした。データIDをもう一度ご確認の上、入力してください。<br />
          キャラシの URL が https://charasheet.vampire-blood.net/100 だったら
          100 を入力してください。 <br />
          また、パスワードが設定されている場合はデータが取得できません。
        </p>
      </div>
      <div v-if="state.isUnsupportedSystem">
        <p>システム: {{ state.game }} は本アプリではサポートされていません</p>
      </div>
      <div v-if="state.charaName">
        <p>以下の内容についてデータをクリップボードにコピーしました</p>
        <ul>
          <li>システム: {{ state.game }}</li>
          <li>PC名: {{ state.charaName }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
// import { getUtakazeChara } from "@/modules/utakaze";
import { jsonp } from "vue-jsonp";
import { UtakazeResponse } from "@/types/utakaze";
import { convUtakaze, utakaze2Ccfolia } from "@/modules/utakaze";

interface State {
  /** クリティカルコールのダイスプール下限値 */
  ccLowerLimit: number;
  /** クリティカルコールのダイスプール上限値 */
  ccUpperLimit: number;
  hasError: boolean;
  isUnsupportedSystem: boolean;
  id?: number;
  game?: string;
  charaName?: string;
}

export default defineComponent({
  name: "App",
  setup() {
    const state = reactive<State>({
      ccLowerLimit: 2,
      ccUpperLimit: 5,
      hasError: false,
      isUnsupportedSystem: false,
    });

    const _copyToClipboard = (piece: string) => {
      var listerner = (e: ClipboardEvent) => {
        e.clipboardData?.setData("text/plain", piece);
        e.preventDefault();
        document.removeEventListener("copy", listerner);
      };
      document.addEventListener("copy", listerner);
      document.execCommand("copy");
    };

    const _setUtakazeToClipboard = (res: UtakazeResponse) => {
      const convData = convUtakaze(res);
      state.charaName = convData.name;
      convData.ccLimit = {
        lower: state.ccLowerLimit,
        upper: state.ccUpperLimit,
      };
      const piece = utakaze2Ccfolia(convData);
      _copyToClipboard(JSON.stringify(piece));
    };

    const onButtonClicked = async () => {
      state.charaName = state.game = undefined;
      state.hasError = state.isUnsupportedSystem = false;

      jsonp(`https://charasheet.vampire-blood.net/${state.id ?? 0}.js`)
        .then((json: UtakazeResponse) => {
          state.game = json.game;
          switch (json.game) {
            case "utakaze":
              _setUtakazeToClipboard(json);
              break;
            default:
              state.isUnsupportedSystem = true;
          }
        })
        .catch((err) => {
          console.log(err);
          state.hasError = true;
        });
    };

    return {
      state,
      onButtonClicked,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
