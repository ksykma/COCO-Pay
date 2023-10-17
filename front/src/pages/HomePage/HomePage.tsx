import React, { useState, useRef, useEffect } from "react";
import { Background } from "@/components/atoms/Background/Background.styles";
import { Text } from "@/components/atoms/Text/Text.styles";
import { Image } from "@/components/atoms/Image/Image";
import { Line } from "@/components/atoms/Line/Line.style";
import search from "@/assets/images/icon-search-blue.png";
import refresh from "@/assets/images/icon-refresh-grey.png";
import { useGetMainCards } from "@/apis/Card/Queries/useGetMainCards";
import { useGetIsPurchased } from "@/apis/Purchase/Queries/useGetIsPurchased";

import {
  BlueContainerWrapper,
  BarcodeUnderWrapper,
  ScrollableContainer,
} from "@/pages/HomePage/HomePage.styles";

import { Checkbox1 } from "@/pages/Mypage/Mypage.styles";
import BodyAndHeading from "@/components/molecules/BodyAndHeading/BodyAndHeading";
import BlueContainer from "@/components/molecules/BlueContainer/BlueContainer";
import BarcodeContainer from "@/components/molecules/BarcodeContainer.tsx/BarcodeContainer";
import TimerComponent from "@/utils/Timer";
import FlexDiv from "@/components/atoms/FlexDiv/FlexDiv.styles";
import { useGetTotalAmountMonth } from "@/apis/Card/Queries/useGetCard";
import {
  HeaderContainer,
  BarcodeWhiteContainer,
  DiscountAndAmountContainer,
  CircleIconContainer,
} from "@/components/atoms/Container/Containers.styles";
import { MainCard } from "@/types/card";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { useRecoilState } from "recoil";
import { IsPurchasedAtom } from '../../states/OfflinePageAtoms';

const HomePage = () => {
  const MainCards = useGetMainCards();
  const IsPurchased = useGetIsPurchased()
  const [isPurchased, setIsPurchased] = useRecoilState(IsPurchasedAtom)
  const [barcodeValue, setBarcodeValue] = useState("491731284377");
  const [resetTimerFlag, setResetTimerFlag] = useState(false);
  // TODO: 3분 만료랑 새로고침, 큐알....
  const TotalAmountMonth = useGetTotalAmountMonth();
  const scrollableRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    // 스크롤 위치를 사용하여 현재 중앙에 있는 이미지를 판단
    const scrollPosition = scrollableRef.current?.scrollLeft || 0;
    const cardWidth = 240; // 카드의 폭을 정확한 값으로 설정해주세요.
    const centeredCardIndex = Math.round(scrollPosition / cardWidth);

    if (MainCards && MainCards[centeredCardIndex]) {
      setBarcodeValue(MainCards[centeredCardIndex].barcodeNum);
      setResetTimerFlag(!resetTimerFlag);
    }
  };

  const navigate = useNavigate();

  const navigatePage = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    if (isPurchased === "있음") {
      navigate('/pay/offline');
    }
  }, [isPurchased, navigate]);

  useEffect(() => {
    setIsPurchased(IsPurchased);
  }, [IsPurchased, setIsPurchased]);

  useEffect(() => {
    handleScroll();
  }, [MainCards]);

  return (
    <Background
      $colormode="gradient"
      style={{
        position: "fixed",
      }}
    >
      <BlueContainerWrapper>
        <BlueContainer />
      </BlueContainerWrapper>
      <HeaderContainer $left={true}>
        <Text size="subtitle2" fontWeight="bold" color="white" $margin="0 4px">
          현장 결제
        </Text>
        <BarcodeWhiteContainer>
          <DiscountAndAmountContainer $left={true}>
            <BodyAndHeading
              amountType="할인받은"
              amount={
                TotalAmountMonth ? TotalAmountMonth.totalDiscountByMonth : 0
              }
            />
            <Line $margin="18px 0" />
            <BodyAndHeading
              amountType="소비한"
              amount={TotalAmountMonth ? TotalAmountMonth.totalPayByMonth : 0}
            />
          </DiscountAndAmountContainer>
          <BarcodeContainer code={barcodeValue} />
          <BarcodeUnderWrapper>
            <FlexDiv>
              <TimerComponent resetTimer={resetTimerFlag} />
              <Image
                src={refresh}
                width={1}
                height={1}
                style={{ margin: "2px 0 0 8px" }}
              ></Image>
            </FlexDiv>
            <FlexDiv>
              <Text size="small1" color="grey2" style={{ marginRight: "10px" }}>
                QR
              </Text>
              <Checkbox1 type="checkbox" id="toggle" />
            </FlexDiv>
          </BarcodeUnderWrapper>
          <CircleIconContainer
          onClick={() => navigatePage(PATH.STATISTICS)}
          >
            <Image src={search} width={2.5} $margin="auto"></Image>
          </CircleIconContainer>
        </BarcodeWhiteContainer>
        <ScrollableContainer onScroll={handleScroll} ref={scrollableRef}>
          {MainCards &&
            MainCards.map((card: MainCard) => (
              <Image key={card.id} src={card.cardImage} width={15}></Image>
            ))}
        </ScrollableContainer>
      </HeaderContainer>
    </Background>
  );
};

export default HomePage;
