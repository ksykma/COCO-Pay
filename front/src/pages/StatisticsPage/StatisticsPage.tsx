import React, { useState, useEffect } from "react";
import { Background } from "@/components/atoms/Background/Background.styles";
import { Image } from "@/components/atoms/Image/Image";
import { Text } from "@/components/atoms/Text/Text.styles";
import BlueStatisticsContainer from "@/components/molecules/BlueStatisticsContainer.tsx/BlueStatisticsContainer";
import pigImg from "@/assets/images/img-pig.png";
import { Container } from "@/components/atoms/Container/Container.styles";
import Calendar from "@/components/molecules/Calendar/Calendar";
import { Line } from "@/components/atoms/Line/Line.style";
import { ModalBg } from "@/components/atoms/Modal/Modal.styles";
import Modal from "@/components/atoms/Modal/Modal";
import { BlueContainerWrapper } from "@/pages/HomePage/HomePage.styles";
import {
  HeaderContainer,
  WhiteContainer,
  StatisticsContainer,
  TabWrapper,
  TotalAmountWrapper,
} from "./StatisticsPage.styles";
import { FourCategory } from "@/components/organisms/FourCategory/FourCategory";
import { Wrapper } from "@/components/atoms/Wrapper/Wrapper.styles";
import theme from "@/styles/theme";
import FlexDiv from "@/components/atoms/FlexDiv/FlexDiv.styles";
import numberToAmount from "@/utils/NumToAmount";
import StatisticsBar from "@/components/organisms/StatisticsBar/StatisticsBar";
import StatisticsContents from "@/components/organisms/StatisticsContents/StatisticsContents";
import { CategoryData, PurchasedCategoryData } from "../../types/category";
import useThisMonth from "@/states/thisMonthAtoms";
import { useGetStatisticDiscount } from "@/apis/Statistics/Queries/useGetStatisticDiscount";
import { useGetStatisticConsume } from "@/apis/Statistics/Queries/useGetStatisticConsume";

const StatisticsPage = () => {
  // Tab 선택 여부
  const [selectedTab, setSelectedTab] = useState("내 소비");
  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
  };

  const date = new Date();
  const [month, setMonth] = useState(date.getMonth() + 1);
  const StatisticDiscount = useGetStatisticDiscount(month);
  const StatisticConsume = useGetStatisticConsume(month);

  // 버튼 클릭에 따른 달 변경
  const handleMonthMinus = () => {
    setMonth((prev) => prev - 1);
  };
  const handleMonthPlus = () => {
    if (month < date.getMonth() + 1) {
      setMonth((prev) => prev + 1);
    }
  };

  // 조회하고싶은 달 change
  const handleMonthChange = (newmonth: number) => {
    setMonth(newmonth);
  };

  // 할인금액 numberToAmount로 변경해서 받기
  const DiscountAmount = numberToAmount(StatisticDiscount && StatisticDiscount.allDiscountAmount);
  const ConsumeAmount = numberToAmount(StatisticConsume && StatisticConsume.allPriceAmount);
  const TABS = [
    { name: "내 소비", key: "내 소비" },
    { name: "혜택", key: "혜택" },
  ];

  const [isModalOpen, setModalOpen] = useState(false);

  // TODO: API로 get
  const priceAmounts: PurchasedCategoryData[] = [
    { category: "편의점", price: 94970, pricePercent: 44.7 },
    { category: "카페", price: 9490, pricePercent: 24.7 },
  ];

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <Background
      $colormode="gradient"
      style={{
        overflowY: "scroll",
        overflowX: "hidden",
        position: "fixed",
        height: "auto",
        border: "true",
      }}
    >
      <BlueContainerWrapper>
        <BlueStatisticsContainer />
      </BlueContainerWrapper>
      <HeaderContainer>
        <Image src={pigImg} width={5} $margin="0 0 14px 0" />
        <Text size="heading1" fontWeight="bold" color="white">
          {DiscountAmount}원
        </Text>
        <Text size="body2" color="white" style={{ marginTop: "4px" }}>
          이번 달에 받은 할인 혜택이에요!
        </Text>
      </HeaderContainer>
      <Container style={{ position: "relative", top: "-14px" }}>
        <WhiteContainer $left={true}>
          <Calendar
            month={month}
            minusmonth={handleMonthMinus}
            plusmonth={handleMonthPlus}
            changemonth={handleMonthChange}
          />
          <Line $margin=" 0 0 20px 0" />
          {StatisticDiscount.categoryList.length > 0 ? <Text size="body2" $marginLeft="8px">
            <b>{month}월</b>엔{" "}
            <b>{StatisticDiscount && StatisticDiscount.categoryList && StatisticDiscount.categoryList.length > 0 ? StatisticDiscount.categoryList[0].category : 'Default Value'}</b> 카테고리에서
            {/* <b>{StatisticDiscount && StatisticDiscount.categoryList && StatisticDiscount.categoryList[0].category}</b> 카테고리에서 */}
          </Text>
          : <></> }
          {StatisticDiscount.categoryList.length > 0 ? <Text size="body2" $marginLeft="8px" $marginTop="4px">
            <b>제일 많은 혜택</b>을 받았어요 !
          </Text>
          : <></> }
          {StatisticDiscount.categoryList.length > 0 ? <FourCategory StatisticDiscount={StatisticDiscount}></FourCategory> : <Text size="body1" color="grey1" style={{textAlign:"center", width:"100%", margin:"20px 0"}}>결제 내역이 없어요.. </Text>}
        </WhiteContainer>
        <StatisticsContainer
          $borderRadius="38px"
          $backgroundColor="white"
          width="100vw"
          height="auto"
        >
          <Wrapper $flexDirection="row">
            {TABS.map((tab) => (
              <React.Fragment key={tab.key}>
                <TabWrapper
                  onClick={() => handleTabClick(tab.key)}
                  style={{
                    borderColor:
                      selectedTab === tab.key ? theme.color.blue : "white",
                  }}
                >
                  <Text
                    size="body2"
                    fontWeight="bold"
                    color={selectedTab === tab.key ? "black1" : "grey2"}
                  >
                    {tab.name}
                  </Text>
                </TabWrapper>
              </React.Fragment>
            ))}
          </Wrapper>
          <TotalAmountWrapper>
            <Text size="subtitle2" fontWeight="bold">
              이번 달에는
            </Text>
            <FlexDiv>
              <Text
                size="subtitle1"
                fontWeight="bold"
                color="blue"
                $marginTop="3px"
              >
                {selectedTab === "내 소비" ? ConsumeAmount : DiscountAmount}원
              </Text>
              <Text
                size="subtitle2"
                fontWeight="light"
                $marginLeft="6px"
                $marginTop="6px"
              >
                {selectedTab === "내 소비" ? "썼어요" : "할인 받았어요"}
              </Text>
            </FlexDiv>
          </TotalAmountWrapper>
          {/* bar */}
          <StatisticsBar
            contents={
              // StatisticDiscount.categoryList
              selectedTab === "내 소비"
                ? StatisticConsume.categoryList
                : StatisticDiscount.categoryList
            }
          />
          {/* 카테고리별 소비/혜택순 콘텐츠 */}
          <StatisticsContents
            contents={
              // StatisticDiscount.categoryList
              selectedTab === "내 소비"
                ? StatisticConsume.categoryList
                : StatisticDiscount.categoryList
            }
          />
        </StatisticsContainer>
      </Container>

      {isModalOpen && (
        <ModalBg onClick={toggleModal}>
          <Modal toggleModal={toggleModal} />
        </ModalBg>
      )}
      {/* <BlueStatisticsContainer /> */}
    </Background>
  );
};

export default StatisticsPage;
