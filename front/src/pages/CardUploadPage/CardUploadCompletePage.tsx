import CardItem from "@/components/molecules/CardItem/CardItem";
import { Text } from "@/components/atoms/Text/Text.styles";
import { CardListContainer } from "@/components/atoms/Container/Container.styles";
import React from "react";
import { Background } from "@/components/atoms/Background/Background.styles";
import { Hr, Layout } from "@/pages/CardListPage/CardListPage.styles";
import Button from "@/components/atoms/Button/Button";
import iconPlusGrey from "@/assets/images/icon-plus-grey.png";
import { Image } from "@/components/atoms/Image/Image";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";

const CardListPage = () => {

  const navigate = useNavigate();

  const navigatePage = (path: string) => {
      navigate(path);
  };

  return (
    <Background
      style={{
        position:"fixed",
      }}
    >
      <CardListContainer>
        <Text
          size="body1"
          fontWeight="bold"
          color="black1"
          $margin="36px 36px 4px 36px"
        >
          불러온 카드 목록
        </Text>
        <Text
          size="small3"
          fontWeight="light"
          color="grey1"
          $margin="12px 36px 0 36px"
        >
          왼쪽으로 밀어 보유한 카드를 삭제할 수 있어요.
        </Text>
        <Text
          size="small3"
          fontWeight="light"
          color="grey1"
          $margin="0 36px 36px 36px"
        >
          오른쪽 아이콘을 눌러 카드 순서를 변경할 수 있어요.
        </Text>
        <Hr />
        <CardItem />
        <Layout>
          <Button
            option="dashed"
            size="medium"
            $borderRadius="16px"
            $fontSize="16px"
          >
            <Image src={iconPlusGrey} width={12} height={12} $unit="px"></Image>
            카드 등록
          </Button>
        </Layout>
        <Layout>
            <Button
                onClick={() => navigatePage(PATH.PRIORITY)}
                option="activated"
                $borderRadius="16px"
                $fontSize="16px"
            >
                확인
            </Button>
        </Layout>
      </CardListContainer>
    </Background>
  );
};

export default CardListPage;