import { Background } from "@/components/atoms/Background/Background.styles";
import React, { useState, useEffect } from "react";
import Button from "@/components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { CardListContainer } from "@/components/atoms/Container/Container.styles";
import { Text } from "@/components/atoms/Text/Text.styles";
import { Image } from "@/components/atoms/Image/Image";
import iconArrowLeftBlack from "@/assets/images/icon-arrow-left-black.png";
import iconDotsVerticalBlack from "@/assets/images/icon-dots-vertical-black.png";
import imgCard1 from "@/assets/images/img-card1.png";
import { WhiteRoundedBox } from "@/components/atoms/WhiteRoundedBox/WhiteRoundedBox.styles";
import { Wrapper, CardWrapper, Hr } from "./CardDetailPage.styles";
import Performance from "@/components/molecules/Performance/Performance";
import Calendar from "@/components/molecules/Calendar/Calendar";
import CardHistory from "@/components/molecules/CardHistory/CardHistory";
import PaymentList from "@/components/molecules/PaymentList/PaymentList";
import styled from "styled-components";
import { useGetCardDetail } from "@/apis/Card/Queries/useGetCardDetails";
import { usePostCardPurchased } from "@/apis/Card/Mutations/useAddCardList";
import { useParams } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { CardDetailAtom, CardDetailIdAtom, CardDetailMonthAtom } from "@/states/CardDetailAtoms";
import { CardAmount, CardHistoryLists, CardDetail } from '@/types/card';
import numberToAmount from "@/utils/NumToAmount";


export const TextCenterWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const CardDetailPage = () => {
  const navigate = useNavigate();

  const navigatePage = (path: string) => {
    navigate(path);
  };
  

  const { cardId: cardIdStr } = useParams();
  const [cardPurchasedData, setCardPurchasedData] = useState({
      amount: 0,
      discountAmount: 0,
      cardHistoryList: []
  });
  const cardid = Number(cardIdStr); // cardId를 문자열에서 숫자로 변환
  const CardDetail = useGetCardDetail(cardid);
  const CardPurchased = usePostCardPurchased()
  const [month, setMonth] = useRecoilState(CardDetailMonthAtom)
  const [cardDetailId, setCardDetailId] = useRecoilState(CardDetailIdAtom)
  const date = new Date();

  const handleMonthMinus = () => {
    setMonth((prev) => prev - 1);
  };

  const handleMonthPlus = () => {
    if (month < date.getMonth() + 1) {
      setMonth((prev) => prev + 1);
    }
  };

  const handleMonthChange = (newmonth:number) => {
    setMonth(newmonth)
  }

  const handleMonthReset = () => {
    setMonth(date.getMonth() + 1)
  }

  // 결제내역 가져오기
  useEffect(() => {
    const handleCardPurchased = () => {
      setCardDetailId(cardid)
      const payload = {
          cardId: cardid,
          month: month.toString()
      };
      CardPurchased.mutate(payload, {
          onSuccess: (data) => {
              setCardPurchasedData(data);
          },
          onError: (error) => {
            console.log('작성 실패', error);
         },
      });
    }
    handleCardPurchased()
  }, [setCardPurchasedData, setMonth, month]);

  return (
    <Background
      $colormode="gradient"
      style={{
        height: "auto",
        paddingBottom: "70px"
      }}
    >
      <CardListContainer $padding="36px 24px">
        <Wrapper>
          <Image
            src={iconArrowLeftBlack}
            width={24}
            height={24}
            $unit="px"
            onClick={() => {navigate(-1); handleMonthReset()}}
          ></Image>
          <TextCenterWrapper>
            <Text
              $marginLeft="auto"
              size="body2"
              style={{ position: "absolute" }}
              fontWeight="bold"
              color="black1"
            >
              카드 결제내역
            </Text>
          </TextCenterWrapper>
        </Wrapper>
        <CardWrapper>
          <Image
            src={CardDetail && CardDetail.cardImage}
            height={180}
            $unit="px"
            $margin="46px 0 12px 0"
            style={{ width: "100%" }}
          ></Image>
        </CardWrapper>
        <Text
          size="body2"
          fontWeight="bold"
          color="black1"
          style={{ 
            textAlign: "center", 
            marginBottom: "44px"
          }}
        >
          {CardDetail && CardDetail.cardName}
        </Text>
        {
          (CardDetail && CardDetail.level !== 0 || CardDetail && CardDetail.nextLevel !== 0) && (
            <WhiteRoundedBox
              height="144px"
              $margin="0 0 16px 0"
              $padding="20px 28px"
              $borderRadius="20px"
              $boxShadow="shadow1"
            >
              <Text size="body2" fontWeight="regular" color="black1">
                다음 실적까지 남은 금액
              </Text>
              <Text
                size="subtitle1"
                fontWeight="bold"
                color="black1"
                $margin="4px 0 16px 0"
              >
                {numberToAmount(CardDetail && CardDetail.price)}원
              </Text>
              {CardDetail && <Performance data={CardDetail} dataType="cardDetail" />}
            </WhiteRoundedBox>
          )
        }
        <WhiteRoundedBox
          height="auto"
          $padding="28px"
          $borderRadius="20px"
          $boxShadow="shadow1"
        >
          <Calendar month={month} minusmonth={handleMonthMinus} plusmonth={handleMonthPlus} changemonth={handleMonthChange} />
          {cardPurchasedData && <CardHistory CardAmount={cardPurchasedData} />}
          <Text
            size="small3"
            fontWeight="light"
            color="grey1"
            $margin="0 0 8px 0"
          >
            최근 결제
          </Text>
          <Hr />
          {cardPurchasedData.cardHistoryList && cardPurchasedData.cardHistoryList.slice(0, 3).map((item:CardHistoryLists, index:number) => (
              <PaymentList key={index} CardHistory={item} />
          ))}
          <Button
            onClick={() => navigatePage(`${PATH.CARD_DETAIL_PURCHASED.replace(":cardId", cardid.toString())}`)}
            option="activated"
            size="medium"
            style={{
              marginTop:"30px"
            }}
          >
            전체내역보기
          </Button>
        </WhiteRoundedBox>
      </CardListContainer>
    </Background>
  );
};

export default CardDetailPage;
