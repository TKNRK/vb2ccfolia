/** ココフォリアでクリップボードからペーストするデータ */
export type CcfoliaClipboardData = {
  kind: "character";
  data: CcfoliaPiece;
};

/** ココフォリアの駒 */
export type CcfoliaPiece = {
  /** キャラクター名 */
  name: string;
  /** メモ */
  memo?: string;
  /** 外部URL */
  externalUrl?: string;
  /** ステータス */
  status: { label: string; value: number; max: number }[];
  /** パラメータ */
  params: { label: string; value: string }[];
  /** チャットパレット */
  commands?: string;
};
