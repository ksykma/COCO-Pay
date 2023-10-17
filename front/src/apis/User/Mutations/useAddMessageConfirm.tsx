import { useMutation } from "@tanstack/react-query"; // 1. 리액트쿼리 기본 제공값 -> .mutate로 입력한 값 담는 곳 (?)
import { addMessageConfirm } from "../userAPI";

export interface AddMessageConfirmParams {
  tel: string;
  code: string;
}

const useAddMessageConfirm = () => {

  
  return useMutation(
    (data: AddMessageConfirmParams) => addMessageConfirm(data), // 매개변수를 객체 형태로 전달

    {
      // 인증번호가 맞으면(response : OK) 1.Navigate로 화면이동 2. 회원정보 리코일에 저장
      onSuccess: () => {
        console.log("인증번호 맞니?");
      },
      onError: () => {
        console.log("인증번호 틀림");
      },
    }
  );
};

export { useAddMessageConfirm };
