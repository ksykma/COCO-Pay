import React from "react";
import { PerformanceWrapper, Level, BarWrapper } from "./Performance.styles";
import { Text } from "@/components/atoms/Text/Text.styles";
import { CardDetail, OfflinePay } from "@/types/card";

interface CardPerformanceProps {
  data: CardDetail | OfflinePay;
  dataType: "cardDetail" | "offlinePay";
}

const Performance = ({ data, dataType }: CardPerformanceProps) => {
  const cardData = data as CardDetail;
  const offlineData = data as OfflinePay;

  return (
    <PerformanceWrapper>
      {dataType === "cardDetail" && (
        <BarWrapper $position="relative">
          <Level
            $bgc="blue"
            width={`calc(28px + ${(225 * cardData.percent) / 100}px)`}
            height="28px"
            $position="absolute"
            $left="0"
            $zIndex="2"
          >
            <Text
              size="small2"
              fontWeight="bold"
              color="white"
              style={{ paddingLeft: "10px", lineHeight: "27px" }}
            >
              {cardData.level}
            </Text>
          </Level>
          <Level $bgc="grey2" width="28px" height="28px" $zIndex="3">
            <Text
              size="small2"
              fontWeight="bold"
              color="white"
              style={{ paddingLeft: "10px", lineHeight: "27px" }}
            >
              {cardData.nextLevel}
            </Text>
          </Level>
        </BarWrapper>
      )}
      {dataType === "offlinePay" && (
        <BarWrapper $position="relative">
          <Level
            $bgc="blue"
            width={`calc(28px + ${
              (175 * parseInt(offlineData.graphRate)) / 100
            }px)`}
            height="28px"
            $position="absolute"
            $left="0"
            $zIndex="2"
          >
            <Text
              size="small2"
              fontWeight="bold"
              color="white"
              style={{ paddingLeft: "10px", lineHeight: "27px" }}
            >
              {offlineData.nextPerLevel - 1}
            </Text>
          </Level>
          <Level $bgc="grey2" width="28px" height="28px" $zIndex="3">
            <Text
              size="small2"
              fontWeight="bold"
              color="white"
              style={{ paddingLeft: "10px", lineHeight: "27px" }}
            >
              {offlineData.nextPerLevel}
            </Text>
          </Level>
        </BarWrapper>
      )}
    </PerformanceWrapper>
  );
};

export default Performance;
