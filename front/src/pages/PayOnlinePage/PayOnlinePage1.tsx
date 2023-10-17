import { Background } from "@/components/atoms/Background/Background.styles";
import React, { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { PayOnlineWrapper, DisplayWrapper } from "./PayOnlinePage1.styles"
import { WhiteRoundedBox } from "@/components/atoms/WhiteRoundedBox/WhiteRoundedBox.styles"
import { Text } from "@/components/atoms/Text/Text.styles"
import { usePostPayOnline } from "@/apis/Card/Mutations/useAddCardList";
import { useRecoilState, useRecoilValue } from "recoil";
import { PayOnlineCardList, OnlinePayDataAtom } from "@/states/OnlineQrPageAtoms";

type PayOnlinePageProps = {
  onNextPage: () => void;
};

function PayOnlinePage1(props: PayOnlinePageProps) {
  const { onNextPage } = props;
  const [payOnlineCards, setPayOnlineCards] = useRecoilState(PayOnlineCardList)
  const PayOnline = usePostPayOnline()
  const OnlineShopping = useRecoilValue(OnlinePayDataAtom)

// 결제내역 가져오기
const handlePayOnline = () => {
  const Pay = {
      "category":"온라인쇼핑",
      "storeName":"삼성온라인스토어",
      "orderPrice":428000
    }
    PayOnline.mutate(Pay, {
      onSuccess: (data) => {
        setPayOnlineCards(data.data);
        onNextPage()
      }
  });
}

  return (
    <Background
      $colormode="gradient"
      style={{
        minHeight: "100vh",
        position: 'relative'
      }}
    >
      <PayOnlineWrapper
      height="420px"
      $borderRadius="0 0 54px 54px"
      >
      </PayOnlineWrapper>
      <PayOnlineWrapper
        $padding="44px 24px 0 24px"
        $bgc="none"
        $margin="-284px 0 0 0"
        style={{
          position: 'relative',
          zIndex: 1
        }}
      >
        <WhiteRoundedBox
          height="424px"
          $borderRadius="38px"
          $padding="140px 36px 0 36px"
          style={{
            textAlign:"center"
          }}
        >
          <Text
          size="body1"
          fontWeight="bold"
          color="black1"
          >
            COCO페이로 결제하려면
          </Text>
          <DisplayWrapper>
          <Text
          size="body1"
          fontWeight="bold"
          color="blue"
          >
            결제하기
          </Text>
          <Text
          size="body1"
          fontWeight="bold"
          color="black1"
          >
            를 눌러주세요.
          </Text>
          </DisplayWrapper>
          <Button
            option="activated"
            size="medium"
            onClick={handlePayOnline}>
            결제하기
          </Button>
        </WhiteRoundedBox>
      </PayOnlineWrapper>
    </Background>
  );
}
export default PayOnlinePage1;
