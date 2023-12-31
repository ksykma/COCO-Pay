import React, { startTransition } from "react";
import Button from "@/components/atoms/Button/Button";
import { Background } from "@/components/atoms/Background/Background.styles";
import { LoadingWrapper } from "./CardUploadLoadingPage.styles";
import { Text } from "@/components/atoms/Text/Text.styles";
import { Image } from "@/components/atoms/Image/Image";
import imgCardUpload from "@/assets/images/img-cardline.png";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import styled, { keyframes } from "styled-components";
import cards from "@/assets/images/img-cardline.png";
import { useRecoilState } from "recoil";

const moveRight = keyframes`
  to {
    transform: translateX(calc(50% + 100px));
  }
`;

const AnimatedImage = styled(Image)`
  left: 50%;
  transform: translateX(10%);
  animation: ${moveRight} 15s forwards;
  margin: 52px 0;
  height: 84px;
`;

type CardUploadPageProps = {
  onNextPage: () => void;
};

const CardUploadLoadingPage = (props: CardUploadPageProps) => {
  const { onNextPage } = props;
  const navigate = useNavigate();

  const navigatePage = (path: string) => {
    navigate(path);
  };

  const handleNextPage = async () => {
    await startTransition(() => {
      onNextPage();
    });
  };


  return (
    <Background
      $colormode="gradient"
      style={{
        padding: "96px 28px 0 28px",
      }}
    >
      <LoadingWrapper>
        <Text size="subtitle1" fontWeight="bold" $margin="0 0 16px 0">
          카드 정보 불러오기
        </Text>
        <Text size="body1" fontWeight="regular">
          보유 중인 카드 정보를
        </Text>
        <Text size="body1" fontWeight="regular">
          한 번에 등록하세요
        </Text>
        <AnimatedImage src={imgCardUpload} $unit="px" />
        {/* <Image
                src={imgCardUpload}
                height={84}
                $unit="px"
                $margin="52px 0"
                >
                </Image> */}
        <Button
          onClick={handleNextPage}
          option="activated"
          style={{
            fontSize: "18px",
            marginBottom: "16px",
          }}
        >
          내 카드 조회하기
        </Button>
        <Button
          onClick={() => navigatePage(PATH.PRIORITY)}
          style={{
            fontSize: "18px",
            border: "none",
          }}
        >
          건너뛰기
        </Button>
      </LoadingWrapper>
    </Background>
  );
};

export default CardUploadLoadingPage;
