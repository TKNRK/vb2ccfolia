/** ウタカゼキャラのデータモデル */
export interface UtakazeCharacter {
  /** キャラクター保管所のキャラシID */
  id: number;
  /** キャラクター名 */
  name: string;
  /** 備考 */
  memo?: string;
  /** 友情 */
  friends: { name: string; friendship: string }[];
  /** ステータス */
  status: {
    /** 希望 */
    hope: number;
    /** 龍のダイス */
    dragon: number;
  };
  /** パラメータ */
  params: {
    /** 勇気のダイスプール */
    courage: number;
    /** 勇気+戦いのダイスプール */
    battle: number;
    /** 勇気+冒険のダイスプール */
    adventure: number;
    /** 勇気+騎乗のダイスプール */
    ride: number;
    /** 知恵のダイスプール */
    wisdom: number;
    /** 知恵+狩りのダイスプール */
    hunt: number;
    /** 知恵+感覚のダイスプール */
    sense: number;
    /** 知恵+学問のダイスプール */
    knowledge: number;
    /** 愛情のダイスプール */
    love: number;
    /** 愛情+歌のダイスプール */
    sing: number;
    /** 愛情+説得のダイスプール */
    persuade: number;
    /** 愛情+心話のダイスプール */
    heart: number;
  };
  /** 装備品 */
  equip: {
    /** 近接武器 */
    melee: string;
    /** 遠隔武器 */
    ranged: string;
    /** 楽器 */
    instrument: string;
  };
  /** リュックサックの中身 */
  items: { name: string; desc: string }[];
}

/** キャラクター保管所から取得するデータ */
export interface UtakazeResponse {
  /** ゲーム（"utakaze" でなければエラーとする） */
  game: string;

  /** 能力と技能を表示するフラグ ("1": 表示, "0": 非表示) */
  is_disp_status: string;
  /** 種族 */
  race_id: string;
  V_race_id: string;
  /** 種族名（コビットなど） */
  race: string;
  /** 龍のダイス */
  dragon_id: string;
  V_dragon_id: string;
  /** 能力値: 勇気 */
  N_Yuuki: string;
  /** 能力値: 勇気 */
  NC1: string;
  /** 能力値: 知恵 */
  N_Chie: string;
  /** 能力値: 知恵 */
  NC2: string;
  /** 能力値: 愛情 */
  N_Aijou: string;
  /** 能力値: 愛情 */
  NC3: string;
  /** 初期技能値: 戦い */
  MC1: string;
  /** 初期技能値: 冒険 */
  MC2: string;
  /** 初期技能値: 騎乗 */
  MC3: string;
  /** 初期技能値: 狩り */
  MC4: string;
  /** 初期技能値: 感覚 */
  MC5: string;
  /** 初期技能値: 学問 */
  MC6: string;
  /** 初期技能値: 歌 */
  MC7: string;
  /** 初期技能値: 説得 */
  MC8: string;
  /** 初期技能値: 心話 */
  MC9: string;
  /** 初期希望値 */
  N_Kibou: string;
  /** 初期希望値 */
  NC4: string;
  /** 技能成長値: 戦い */
  SC1: string;
  /** 技能成長値: 冒険 */
  SC2: string;
  /** 技能成長値: 騎乗 */
  SC3: string;
  /** 技能成長値: 狩り */
  SC4: string;
  /** 技能成長値: 感覚 */
  SC5: string;
  /** 技能成長値: 学問 */
  SC6: string;
  /** 技能成長値: 歌 */
  SC7: string;
  /** 技能成長値: 説得 */
  SC8: string;
  /** 技能成長値: 心話 */
  SC9: string;
  /** 希望の成長値 */
  SC10: string;
  /** 他修正: 戦い */
  NM1: string;
  /** 他修正: 冒険 */
  NM2: string;
  /** 他修正: 騎乗 */
  NM3: string;
  /** 他修正: 狩り */
  NM4: string;
  /** 他修正: 感覚 */
  NM5: string;
  /** 他修正: 学問 */
  NM6: string;
  /** 他修正: 歌 */
  NM7: string;
  /** 他修正: 説得 */
  NM8: string;
  /** 他修正: 心話 */
  NM9: string;
  /** 他修正: 希望 */
  NM10: string;
  /** ダイスプール: 勇気+戦い */
  NP1: string;
  /** ダイスプール: 勇気+冒険 */
  NP2: string;
  /** ダイスプール: 勇気+騎乗 */
  NP3: string;
  /** ダイスプール: 知恵+狩り */
  NP4: string;
  /** ダイスプール: 知恵+感覚 */
  NP5: string;
  /** ダイスプール: 知恵+学問 */
  NP6: string;
  /** ダイスプール: 愛情+歌 */
  NP7: string;
  /** ダイスプール: 愛情+説得 */
  NP8: string;
  /** ダイスプール: 愛情+心話 */
  NP9: string;
  /** 希望 */
  NP10: string;
  /** 特技表示のフラグ */
  is_disp_skill: string;
  sl_skill: string;
  /** 習得した特技名の一覧 */
  skill_name: string[];
  /** 特技IDの一覧 */
  skill_id: string[];
  /** 特技レベルの一覧 */
  skill_sl: string[];
  /** 特技レベルの上限値一覧 */
  skill_max_sl: string[];
  /** 特技の使用タイミング一覧 */
  skill_timing: string[];
  /** 特技のコスト一覧 */
  skill_cost: string[];
  /** 特技の技能一覧 */
  skill_power: string[];
  /** 特技の効果一覧 */
  skill_memo: string[];
  /** リュックサック表示のフラグ */
  is_disp_item: string;
  /** アイテム名の一覧 */
  item_name: string[];
  /** アイテムの解説一覧 */
  item_memo: string[];
  /** 友情の表示フラグ */
  is_disp_mind: string;
  /** 友情の対象名一覧 */
  friend_name: string[];
  s_friend_lv: string;
  /** 対象との友情値一覧 */
  friend_lv: string[];
  /** 友情を結んだ相手の詳細一覧 */
  friend_memo: string[];
  /** パーソナルデータの表示フラグ */
  is_disp_personal: string;
  /** キャラクター名 */
  pc_name: string;
  /** キャラクターのタグ */
  pc_tags: string;
  /** 年齢 */
  age: string;
  /** 性別 */
  sex: string;
  /** 身長 */
  pc_height: string;
  /** 体重 */
  pc_weight: string;
  /** 髪の色 */
  color_hair: string;
  /** 瞳の色 */
  color_eye: string;
  /** 肌の色 */
  color_skin: string;
  /** 頭装飾品 */
  e_head: string;
  /** 近接武器 */
  kinsetu_buki: string;
  /** 飛び道具 */
  enkaku_buki: string;
  /** 楽器 */
  tokushu_buki: string;
  /** 体装飾品 */
  e_body: string;
  /** その他メモ */
  pc_making_memo: string;
  /** その他メモの表示行数 */
  pc_making_memo_rows: string;
  /** キャラシのエラーメッセージ */
  message: string;
  /** データID */
  data_id: string;

  // 未調査レスポンス
  phrase: string;
  data_title: string;
  dodontof_send_to: string;
  dodontof_url: string;
  dodontof_room: string;
  koma_name: string;
  dodontof_image: string;
  dodontof_sc_colors: string;
  elysion: string;
  nechro: string;
  select2: string;
}