import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const chatMessageListState = atom({
  key: "chatMessageList",
  default: [
    {
      text: "遺伝子組み換え食品とはどのようなものか知っていますか？",
      type: "chatBot",
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

export const currentStatusState = atom({
  key: "currentStatus",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
