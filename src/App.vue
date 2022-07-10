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
      （履歴:
      <select id="pc-history" v-model="state.id">
        <option value="0">-</option>
        <option
          v-for="h in state.history"
          :key="`history-${h.id}`"
          :value="h.id"
        >
          {{ `${h.name} (システム: ${h.system}, ID: ${h.id})` }}
        </option>
      </select>
      ）
    </div>
    <div id="utakaze-cc">
      <p>クリティカルコールを適用するダイスプールの範囲</p>
      <ul id="cc-settnigs-list">
        <li id="cc-range">
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
          〜
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
          のダイスプールではクリティカルコールを適用する
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
import { defineComponent, onMounted, reactive } from "vue";
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
  /** ローカルストレージの履歴 */
  history: HistoryElement[];
  id?: number;
  game?: string;
  charaName?: string;
}

/** ローカルストレージのキャラクター取得履歴 */
interface HistoryElement {
  /** PC 名 */
  name: string;
  /** TRPG のシステム名 */
  system: string;
  /** キャラクター保管庫のID */
  id: number;
}

export default defineComponent({
  name: "App",
  setup() {
    const state = reactive<State>({
      ccLowerLimit: 2,
      ccUpperLimit: 5,
      hasError: false,
      isUnsupportedSystem: false,
      history: [],
    });

    const _getHistory = (): HistoryElement[] => {
      const vbHistory: HistoryElement[] = JSON.parse(
        localStorage.getItem("vbHistory") || "[]"
      );
      return vbHistory;
    }

    const _saveValidSetting = (name: string, system: string, id: number) => {
      // ローカルストレージから履歴を取り出す
      const vbHistory = _getHistory();
      // すでに保存済みだったら何もしない
      for (const v of vbHistory) {
        if (v.id === id) {
          return;
        }
      }
      // 新規追加
      vbHistory.push({
        name: name,
        system: system,
        id: id,
      });
      // ローカルストレージを上書き
      localStorage.setItem("vbHistory", JSON.stringify(vbHistory));
    }

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

      if (state.id === 0 || state.id === undefined) {
        return;
      }

      jsonp(`https://charasheet.vampire-blood.net/${state.id}.js`)
        .then((json: UtakazeResponse) => {
          state.game = json.game;
          switch (json.game) {
            case "utakaze":
              _setUtakazeToClipboard(json);
              break;
            default:
              state.isUnsupportedSystem = true;
              return;
          }
          if (state.id === 0 || state.id === undefined) return;
          _saveValidSetting(json.pc_name, json.game, state.id);
        })
        .catch((err) => {
          console.log(err);
          state.hasError = true;
        });
    };

    onMounted(() => {
      state.history = _getHistory();
    });

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
