import React from "react";
import {
  StatisticsBarWrapper,
  BarRateWrapper,
  BarRate,
} from "../StatisticsBar/StatisticsBar.styles";
import {
  CATEGORY_COLORS,
  CategoryData,
  PurchasedCategoryData,
} from "@/types/category";

interface StatisticsContentsProps {
  contents: CategoryData[] | PurchasedCategoryData[];
}

const StatisticsBar = ({ contents }: StatisticsContentsProps) => {
  const tempAmounts = contents;
  return (
    <>
      <StatisticsBarWrapper>
        <BarRateWrapper>
          {tempAmounts.map((category, index: number) => {
            if ("discountPercent" in category) {
              // category는 CategoryData 타입
              return (
                <BarRate
                  key={index}
                  style={{
                    flexGrow: parseFloat(category.discountPercent.toString()),
                    backgroundColor: CATEGORY_COLORS[category.category],
                  }}
                ></BarRate>
              );
            } else {
              // category는 PurchasedCategoryData 타입
              return (
                <BarRate
                  key={index}
                  style={{
                    flexGrow: parseFloat(category.pricePercent.toString()),
                    backgroundColor: CATEGORY_COLORS[category.category],
                  }}
                ></BarRate>
              );
            }
          })}
        </BarRateWrapper>
      </StatisticsBarWrapper>
    </>
  );
};

export default StatisticsBar;
