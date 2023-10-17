import { atom } from "recoil";
import { UserInfo } from "@/types/user";

export const userInfoState = atom<UserInfo>({
  key: "userInfoState",
  default: {
    name: "",
    birth: "",
    company: "",
    tel: "",
    password: "",
    fcmToken: "",
  },
});


export const priorityAtom = atom({
  key: "priorityAtom",
  default: "priority"
})

const priorityLocalStorage = localStorage.getItem("priority");
export const myPagePriorityAtom = atom({
  key: "myPagePriorityAtom",
  default: priorityLocalStorage ? parseInt(priorityLocalStorage, 10) : 1
})