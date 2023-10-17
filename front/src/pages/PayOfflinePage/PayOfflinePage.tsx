import { Background } from "@/components/atoms/Background/Background.styles";
import React, { useEffect } from "react";
import Button from "@/components/atoms/Button/Button";
import { Image } from "@/components/atoms/Image/Image";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { Container } from "@/components/atoms/Container/Container.styles";
import { Text } from "@/components/atoms/Text/Text.styles";
import { Wrapper } from "@/components/atoms/Wrapper/Wrapper.styles";
import Penguin from "@/assets/images/img-penguin-thinking.png";
import Dot from "@/assets/images/icon-dot-gray.png";
import { useGetCardList } from "@/apis/Card/Queries/useGetCard";
import styled, { keyframes } from "styled-components";
function PayOfflinePage() {
  const CardList = useGetCardList();

  const rotateLeft = keyframes`
    0% {
    opacity: 1;
    transform-origin: 50% 0;
    transform: perspective(800px) rotateY(0deg) translateZ(0px);
  }

  50% {
    opacity: 0;
    transform-origin: 50% 0;
    transform: perspective(800px) rotateY(-180deg) translateZ(220px);
  }

  50.1% {
    opacity: 0;
    transform-origin: 50% 0;
    transform: perspective(800px) rotateY(180deg) translateZ(220px);
  }

  100% {
    opacity: 1;
    transform-origin: 50% 0;
    transform: perspective(800px) rotateY(0deg) translateZ(0px);
  }`;

  const LeftRotate = styled(Image)`
    position: absolute;
    top: 28%;
    /* bottom: 60%; */
    /* left: 40%; */
    /* transform: translateY(80%); */
    animation: ${rotateLeft} 3s linear infinite;
    transform-origin: center;
  `;

  const firstThreeCards = CardList.slice(0, 3);
  return (
    <Background
      $colormode="gradient"
      style={{
        minHeight: "100vh",
      }}
    >
      <Container $left={true} $paddingTop="36px" height="auto">
      
        <Container
          $paddingTop="63px"
          $backgroundColor="white"
          $borderRadius="38px"
          height="auto"
          $padding="36px"
          // $border={true}
        >
          <Text size="subtitle2" fontWeight="bold" $margin="10% 0 250px 0">
            최적의 결제 카드 파악 중...
          </Text> 
          
          {/* <Text size="body1" fontWeight="bold">
            최적의 결제 카드 파악 중...
          </Text> */}
          <br />

          <Wrapper $flexDirection="row">
            {firstThreeCards.map((card: any, idx: number) => {
              const animationDelay = `${idx * 0.8}s`;
              const zIndex = firstThreeCards.length - idx;
              const cardStyle = {
                animationDelay,
                zIndex,
                // transform: "rotate(90deg)", // Rotate the card 90 degrees
              };
              //TODO:이미지 90도 회전시키기
              return (
                <LeftRotate
                  src={card.cardImage}
                  key={idx}
                  width={8}
                  style={cardStyle}
                />
              );
            })}
          </Wrapper>
          <br />
          <Container style={{ justifyContent: "flex-end" }} height="auto">
            <Wrapper
              $flexDirection="row"
              // width="20%"
              // $justifyContent="space-between"
              style={{ gap: "10px", paddingBottom:"30px" }}
            >
              <Image src={Dot} width={20} $unit="px"></Image>
              <Image src={Dot} width={20} $unit="px"></Image>
              <Image src={Dot} width={20} $unit="px"></Image>
            </Wrapper>
            {/* TODO: 이미지 하단 고정하기 */}
            <Image
              src={Penguin}
              width={80}
              $unit="%"
              style={{ marginRight: "2.2rem" }}
            ></Image>
          </Container>
          {/* <Button onClick={() => navigatePage(PATH.MAIN)} option="activated">
            홈으로
          </Button> */}
        </Container>
      </Container>
    </Background>
  );
}

export default PayOfflinePage;
