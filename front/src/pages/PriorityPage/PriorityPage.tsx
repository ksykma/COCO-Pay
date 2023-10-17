import { Background } from "@/components/atoms/Background/Background.styles";
import React, { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { Text } from "@/components/atoms/Text/Text.styles";
import { PriorityWrapper } from "./PriorityPage.styles";
import { WhiteRoundedBox } from "@/components/atoms/WhiteRoundedBox/WhiteRoundedBox.styles";
import imgPriorityPerformance from "@/assets/images/img-priority-performane.png";
import imgPrioritySale from "@/assets/images/img-priority-sale.png";
import { useAddPriority } from "@/apis/User/Mutations/useAddPriority";
import { useRecoilValue, useRecoilState } from "recoil";
import { priorityAtom, myPagePriorityAtom } from "@/states/UserInfoAtoms";

const PriorityPage = () => {
  const addUseAddPriority = useAddPriority();
  const [clikedBtn, setClickedBtn] = useRecoilState(myPagePriorityAtom);
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const Priority = useRecoilValue(priorityAtom)

  const navigate = useNavigate();

  const navigatePage = (path: string) => {
    navigate(path);
  };

  // 우선순위 선택

  // TODO: 핸들러랑 위에 우선순위 코드 같으면 합치기. 전달값 0,1 -> 수정하기
  // 핸들러
  const handleBoxClick = (boxType: string) => {
    setSelectedBox(boxType);
  };

  const handleSetPriority = () => {
    localStorage.setItem('priority', JSON.stringify(clikedBtn))
  }

  const prioritysave = () => {
    addUseAddPriority.mutate(clikedBtn);
    if (Priority === "upload") {
      navigatePage(PATH.MAIN);
    } else if (Priority === "mypage") {
      navigatePage(PATH.MYPAGE);
    }
  };
  return (
    <Background
      $colormode="gradient"
      style={{
        minHeight: "100vh",
        padding: "76px 36px",
      }}
    >
      <PriorityWrapper>
        <Text size="subtitle2" fontWeight="light" color="black1">
          카드 추천 시
        </Text>
        <Text
          size="subtitle2"
          fontWeight="bold"
          color="black1"
          $margin="0 0 0 5px"
        >
          우선 순위로
        </Text>
      </PriorityWrapper>
      <Text size="subtitle2" fontWeight="light" color="black1">
        무엇을 고려하여 추천해드릴까요?
      </Text>
      <WhiteRoundedBox
        height="220px"
        $margin="56px 0 0 0"
        $src={imgPrioritySale}
        $borderRadius="38px"
        $boxShadow="shadow1"
        onClick={() => {
          handleBoxClick("sale");
          setClickedBtn(1);
        }}
        $isGrayscale={selectedBox === "performance"}
      ></WhiteRoundedBox>
      <WhiteRoundedBox
        height="220px"
        $margin="24px 0 44px 0"
        $src={imgPriorityPerformance}
        $borderRadius="38px"
        $boxShadow="shadow1"
        onClick={() => {
          handleBoxClick("performance");
          setClickedBtn(0);
        }}
        $isGrayscale={selectedBox === "sale"} //performance를 누르면 sale 부분이 graybox로 바껴야 함.
      ></WhiteRoundedBox>
      <Button
        onClick={() => {prioritysave(); handleSetPriority();}}
        option="activated"
        size="medium"
      >
        확인
      </Button>
    </Background>
  );
};

export default PriorityPage;
