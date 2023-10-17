import React from "react";
import { CategoryData, PurchasedCategoryData } from "@/types/category";
import { Image } from "@/components/atoms/Image/Image";
import { Text } from "@/components/atoms/Text/Text.styles";

import convenientIcon from "@/assets/images/icon-circle-convenient.png";
import movieIcon from "@/assets/images/icon-circle-movie.png";
import cultureIcon from "@/assets/images/icon-circle-culture.png";
import deilveryIcon from "@/assets/images/icon-circle-delivery.png";
import cafeIcon from "@/assets/images/icon-circle-cafe.png";
import martIcon from "@/assets/images/icon-circle-mart.png";
import flightIcon from "@/assets/images/icon-circle-flight.png";
import foodIcon from "@/assets/images/icon-circle-food.png";
import oilIcon from "@/assets/images/icon-circle-oil.png";
import onlineShoppingIcon from "@/assets/images/icon-circle-onlineShopping.png";
import transportIcon from "@/assets/images/icon-circle-transport.png";
import etcIcon from "@/assets/images/icon-circle-etc.png";
import { Wrapper } from "@/components/atoms/Wrapper/Wrapper.styles";
import FlexDiv from "@/components/atoms/FlexDiv/FlexDiv.styles";
import numberToAmount from "@/utils/NumToAmount";

const categoryIcons = {
  편의점: convenientIcon,
  영화: movieIcon,
  문화: cultureIcon,
  배달: deilveryIcon,
  카페: cafeIcon,
  대형쇼핑몰: martIcon,
  항공: flightIcon,
  음식점: foodIcon,
  주유: oilIcon,
  온라인쇼핑: onlineShoppingIcon,
  대중교통: transportIcon,
  기타: etcIcon,
};

interface StatisticsContentsProps {
  contents: CategoryData[] | PurchasedCategoryData[];
}

const StatisticsContents = ({ contents }: StatisticsContentsProps) => {
  const Amounts = contents;
  return (
    <Wrapper $alignItems="start" style={{ marginBottom: "100px" }}>
      {Amounts.map((category, index: number) => {
        const discountAmount =
          "discountAmount" in category
            ? category.discountAmount
            : category.price;

        const discountPercent =
          "discountPercent" in category
            ? category.discountPercent
            : category.pricePercent;

        const categoryName = "category" in category;

        return (
          <React.Fragment key={index}>
            <FlexDiv
              style={{
                margin: "10px 10px",
                alignItems: "center",
                justifyContent: "space-between",
                width: "94%",
              }}
            >
              <FlexDiv
                style={{
                  alignItems: "center",
                }}
              >
                <Image src={categoryIcons[category.category]} width={3.1} />
                <Text size="body2" fontWeight="bold" $marginLeft="17px">
                  {category.category}
                </Text>
                <Text size="body2" $marginLeft="10px" color="grey2">
                  {discountPercent}%
                </Text>
              </FlexDiv>
              <Text size="body2" $marginLeft="10px">
                {numberToAmount(discountAmount)}원
              </Text>
            </FlexDiv>
          </React.Fragment>
        );
      })}
    </Wrapper>
  );
};

export default StatisticsContents;
