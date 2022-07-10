import { CcfoliaClipboardData } from "@/types/ccfolia";
import { UtakazeCharacter, UtakazeResponse } from "@/types/utakaze";

function createChatParret(chara: UtakazeCharacter): string {
  const chatParret = [":希望-1", ":希望-"];

  chara.friends.forEach((friend) => {
    if (friend.name) {
      chatParret.push(`:${friend.name}-1 【友情】`);
    }
  });

  chatParret.push(
    "=== 能力値判定",
    "{勇気}UK 【勇気】",
    "{知恵}UK 【知恵】",
    "{愛情}UK 【愛情】"
  );

  const needCriticalCall = (dicePool: number) => {
    // 上限・下限ともに指定がなければクリティカルコールは適用しない
    if (chara.ccLimit.lower === 0 && chara.ccLimit.upper === 0) {
      return false;
    }
    // 下限のみ未指定ならば、上限値以下のダイスプールで CC を適用
    if (chara.ccLimit.lower === 0) {
      return dicePool <= chara.ccLimit.upper;
    }
    // 上限のみ未指定ならば、下限値以上の大きいダイスプールで CC を適用
    if (chara.ccLimit.upper === 0) {
      return chara.ccLimit.lower <= dicePool;
    }
    // 下限値〜上限値を満たすダイスプールで CC を適用
    return chara.ccLimit.lower <= dicePool && dicePool <= chara.ccLimit.upper;
  };

  // 戦闘系の技能値に関するチャットパレット
  const battle = needCriticalCall(chara.params.battle)
    ? "({勇気}+{戦い})UK@{龍} 【CC:勇気+戦い】"
    : "({勇気}+{戦い})UK 【勇気+戦い】";
  const hunt = needCriticalCall(chara.params.hunt)
    ? "({知恵}+{狩り})UK@{龍} 【CC:知恵+狩り】"
    : "({知恵}+{狩り})UK 【知恵+狩り】";
  const sing = needCriticalCall(chara.params.sing)
    ? "({愛情}+{歌})UK@{龍} 【CC:愛情+歌】"
    : "({愛情}+{歌})UK 【愛情+歌】";
  chatParret.push(
    "=== 戦闘技能判定",
    `${battle}${chara.equip.melee}`, // 勇気+戦い <近接武器>
    `${hunt}${chara.equip.ranged}`, // 知恵+狩り <遠隔武器>
    `${sing}${chara.equip.instrument}` // 愛情+歌 <楽器>
  );

  // 探索系の技能値に関するチャットパレット
  const adventure = needCriticalCall(chara.params.adventure)
    ? "({勇気}+{冒険})UK@{龍} 【CC:勇気+冒険】"
    : "({勇気}+{冒険})UK 【勇気+冒険】";
  const ride = needCriticalCall(chara.params.ride)
    ? "({勇気}+{騎乗})UK@{龍} 【CC:勇気+騎乗】"
    : "({勇気}+{騎乗})UK 【勇気+騎乗】";
  const sense = needCriticalCall(chara.params.sense)
    ? "({知恵}+{感覚})UK@{龍} 【CC:知恵+感覚】"
    : "({知恵}+{感覚})UK 【知恵+感覚】";
  const knowledge = needCriticalCall(chara.params.knowledge)
    ? "({知恵}+{学問})UK@{龍} 【CC:知恵+学問】"
    : "({知恵}+{学問})UK 【知恵+学問】";
  const persuade = needCriticalCall(chara.params.persuade)
    ? "({愛情}+{説得})UK@{龍} 【CC:愛情+説得】"
    : "({愛情}+{説得})UK 【愛情+説得】";
  const heart = needCriticalCall(chara.params.heart)
    ? "({愛情}+{心話})UK@{龍} 【CC:愛情+心話】"
    : "({愛情}+{心話})UK 【愛情+心話】";
  chatParret.push(
    "=== 探索技能判定",
    adventure, // 勇気+冒険
    ride, // 勇気+騎乗
    sense, // 知恵+感覚
    knowledge, // 知恵+学問
    persuade, // 愛情+説得
    heart // 愛情+心話
  );

  return chatParret.join("\n");
}

export function utakaze2Ccfolia(chara: UtakazeCharacter): CcfoliaClipboardData {
  // メモ欄（所持アイテム）
  const memo =
    "「所持アイテム」\n" +
    chara.items.map((item) => `${item.name}: ${item.desc}`).join("\n");

  // ステータス（シナリオ中に増減する値）
  const status = [
    {
      label: "希望",
      value: chara.status.hope,
      max: chara.status.hope,
    },
  ];
  chara.friends.forEach((friend) => {
    if (friend.name) {
      status.push({
        label: friend.name,
        value: parseInt(friend.friendship) ?? 0,
        max: parseInt(friend.friendship) ?? 0,
      });
    }
  });

  // パラメータ（シナリオ中に変動しない値）
  // モデルに格納されている値は「能力値+技能値」のダイスプールのため、純粋な技能値に直す
  const battle = chara.params.battle - chara.params.courage;
  const adventure = chara.params.adventure - chara.params.courage;
  const ride = chara.params.ride - chara.params.courage;
  const hunt = chara.params.hunt - chara.params.wisdom;
  const sense = chara.params.sense - chara.params.wisdom;
  const knowledge = chara.params.knowledge - chara.params.wisdom;
  const sing = chara.params.sing - chara.params.love;
  const persuade = chara.params.persuade - chara.params.love;
  const heart = chara.params.heart - chara.params.love;
  const params = [
    { label: "龍", value: `${chara.status.dragon}` },
    { label: "勇気", value: `${chara.params.courage}` },
    { label: "戦い", value: `${battle}` },
    { label: "冒険", value: `${adventure}` },
    { label: "騎乗", value: `${ride}` },
    { label: "知恵", value: `${chara.params.wisdom}` },
    { label: "狩り", value: `${hunt}` },
    { label: "感覚", value: `${sense}` },
    { label: "学問", value: `${knowledge}` },
    { label: "愛情", value: `${chara.params.love}` },
    { label: "歌", value: `${sing}` },
    { label: "説得", value: `${persuade}` },
    { label: "心話", value: `${heart}` },
  ];

  return {
    kind: "character",
    data: {
      name: chara.name,
      memo: memo,
      externalUrl: `https://charasheet.vampire-blood.net/${chara.id}`,
      status: status,
      params: params,
      commands: createChatParret(chara),
    },
  };
}

/** キャラクター保管所から取得したデータをモデルに変換する */
export function convUtakaze(data: UtakazeResponse): UtakazeCharacter {
  // 友情
  const friends: { name: string; friendship: string }[] = [];
  for (let idx = 0; idx < data.friend_name.length; idx++) {
    const fName = data.friend_name[idx];
    const fValue = data.friend_lv[idx];
    if (fName) {
      friends.push({ name: fName, friendship: fValue });
    }
  }

  // リュックサック
  const items: { name: string; desc: string }[] = [];
  for (let idx = 0; idx < data.item_name.length; idx++) {
    const iName = data.item_name[idx];
    const iDesc = data.item_memo[idx];
    if (iName) {
      items.push({ name: iName, desc: iDesc });
    }
  }

  return {
    id: parseInt(data.data_id) ?? 0,
    name: data.pc_name,
    friends: friends,
    status: {
      hope: parseInt(data.NP10) ?? 6,
      dragon: parseInt(data.dragon_id) ?? 0,
    },
    params: {
      courage: parseInt(data.N_Yuuki) ?? 2,
      battle: parseInt(data.NP1) ?? 0,
      adventure: parseInt(data.NP2) ?? 0,
      ride: parseInt(data.NP3) ?? 0,
      wisdom: parseInt(data.N_Chie) ?? 2,
      hunt: parseInt(data.NP4) ?? 0,
      sense: parseInt(data.NP5) ?? 0,
      knowledge: parseInt(data.NP6) ?? 0,
      love: parseInt(data.N_Aijou) ?? 2,
      sing: parseInt(data.NP7) ?? 0,
      persuade: parseInt(data.NP8) ?? 0,
      heart: parseInt(data.NP9) ?? 0,
    },
    equip: {
      melee: data.kinsetu_buki,
      ranged: data.enkaku_buki,
      instrument: data.tokushu_buki,
    },
    items: items,
    ccLimit: {
      lower: 2,
      upper: 5,
    },
  };
}