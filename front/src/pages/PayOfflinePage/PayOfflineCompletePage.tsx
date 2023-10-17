import { Background } from "@/components/atoms/Background/Background.styles";
import React from "react";
import Button from "@/components/atoms/Button/Button";
import { Image } from "@/components/atoms/Image/Image";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { Text } from "@/components/atoms/Text/Text.styles";
import { Wrapper } from "@/components/atoms/Wrapper/Wrapper.styles";
import { Container } from "@/components/atoms/Container/Container.styles";
import numberToAmount from "@/utils/NumToAmount";
import { useGetOfflinePay } from "@/apis/User/Queries/useGetOfflinePay";
import ParticleMove from "../PayOnlineCompletePage/ParticleMove";
import Performance from "@/components/molecules/Performance/Performance";

const PayOfflinePage = () => {
  const navigate = useNavigate();

  const navigatePage = (path: string) => {
    navigate(path);
  };
  const OfflinePayCard = useGetOfflinePay();

  // OfflinePayCard.remainingAmt를 numberToAmount 함수를 사용하여 변환합니다.
  const formattedRemainingAmt = numberToAmount(OfflinePayCard && OfflinePayCard.remainingAmt);

  // OfflinePayCard.discounted를 numberToAmount 함수를 사용하여 변환합니다.
  const formattedDiscounted = numberToAmount(OfflinePayCard && OfflinePayCard.discounted);

  return (
    <Background
      $colormode="gradient"
      style={{
        minHeight: "100vh",
      }}
    >
      <ParticleMove />
      <Container $left={true} $paddingTop="36px" height="auto">
        <Container
          $padding="10px"
          $paddingTop="42px"
          $backgroundColor="white"
          $borderRadius="38px"
          height="auto"
          // $padding="36px"
          // $border={true}
        >
          <Text style={{ marginBottom: "70px" }} size="body1" fontWeight="bold">
            결제 완료!
          </Text>

          <Image
            style={{ transform: "rotate(90deg)" }}
            src={OfflinePayCard && OfflinePayCard.cardImage}
            width={73}
            $unit="%"
          ></Image>
          <br />
          <Container $padding="40px" $marginTop="50px" $left={true}>
            <Text size="subtitle2" fontWeight="light">
              코코가 추천해 준
            </Text>
            {/* TODO: 글씨 크기 커졌을 때 어떻게 할지 의논 후 수정 */}
            <Wrapper $flexDirection="row" $justifyContent="start">
              <Text size="subtitle2" fontWeight="bold" color="blue">
                {OfflinePayCard && OfflinePayCard.cardName}
              </Text>
              <Text size="body1" fontWeight="light">
                카드로
              </Text>
            </Wrapper>
            <Wrapper $flexDirection="row" $justifyContent="start">
              <Text size="subtitle2" fontWeight="bold" color="blue">
                {/* {OfflinePayCard.discounted} */}
                {formattedDiscounted}
              </Text>
              <Text size="subtitle2" fontWeight="light">
                원 할인 받았어요!
              </Text>
            </Wrapper>
            <br />
            <Text size="subtitle2" fontWeight="light">
              다음 실적까지
            </Text>
            <Wrapper $flexDirection="row" $justifyContent="start">
              <Text size="subtitle2" fontWeight="bold" color="blue">
                {/* {OfflinePayCard.remainingAmt} */}
                {formattedRemainingAmt}
              </Text>
              <Text size="subtitle2" fontWeight="light">
                원 남았어요
              </Text>
            </Wrapper>
            <br />
            {
              OfflinePayCard && OfflinePayCard.nextPerLevel !== 0 && (
              <Performance data={OfflinePayCard} dataType="offlinePay" />
            )}
            <br />
            <Button onClick={() => navigatePage(PATH.MAIN)} option="activated">
              홈으로
            </Button>
          </Container>
        </Container>
      </Container>
    </Background>
  );
};

export default PayOfflinePage;
