import React from "react";
import { Image } from "@/components/atoms/Image/Image";
import { Text } from "@/components/atoms/Text/Text.styles";
import cardImg1 from "@/assets/images/img-card1.png";
import korImg from "@/assets/images/img-kor.png";
import iconHamburgerGrey from "@/assets/images/icon-hamburger-grey.png";
import { CardItemWrapper, Hr, CardListBar } from "./CardItem.styles";
import { Wrapper } from "@/components/atoms/Wrapper/Wrapper.styles";

const CardItem = () => {
  return (
    <div>
      <CardItemWrapper $margin="12px 24px">
        <Image src={cardImg1} width={90} height={56} $unit="px"></Image>
        <Image
          src={korImg}
          width={24}
          height={16}
          $unit="px"
          $margin="0 8px 0 0"
          style={{ margin: "4px 0 8px 12px" }}
        ></Image>
        <Wrapper $padding="0 0 0 8px" $alignItems="start" $justifyContent="space-around">
          <CardItemWrapper>
            <Text size="small2" fontWeight="regular" color="black1">
              위버스 신한카드 체크(BTS)
            </Text>
          </CardItemWrapper>
          <CardItemWrapper>
            <Text
              size="small3"
              fontWeight="light"
              color="grey1"
              $margin="0 4px 0 0"
            >
              체크
            </Text>
            <Text size="small3" fontWeight="light" color="grey1">
              3571-89**-****-4485
            </Text>
          </CardItemWrapper>
          <div style={{position: 'relative', width: '90%'}}>
            <CardListBar
            width="90%"
            $bgc="grey4"
            >
            </CardListBar>
            <CardListBar
            width="30%"
            $bgc="blue"
            $isAbsolute={true}
            >
            </CardListBar>
          </div>
        </Wrapper>
        <CardItemWrapper $alignItems="center">
          <Image
            src={iconHamburgerGrey}
            width={16}
            height={12}
            $unit="px"
          ></Image>
        </CardItemWrapper>
      </CardItemWrapper>
      <Hr />
    </div>
  );
};

export default CardItem;
