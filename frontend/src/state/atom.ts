import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const chatMessageListState = atom({
  key: "chatMessageList",
  default: [{ type: "question", status: 0, replyMessageList: [""] }],
  effects_UNSTABLE: [persistAtom],
});
