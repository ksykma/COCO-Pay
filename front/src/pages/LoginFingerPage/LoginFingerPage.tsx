import React, { useState } from "react";
import { Background } from "@/components/atoms/Background/Background.styles";
import { Container } from "@/components/atoms/Container/Container.styles";
import Back from "@/components/atoms/Back/Back";
import { Text } from "@/components/atoms/Text/Text.styles";
import { Image } from "@/components/atoms/Image/Image";
import fingerPrint from "@/assets/images/img-fingerprint-blue.png";
import Button from "@/components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { ModalBg } from "@/components/atoms/Modal/Modal.styles";

const LoginFingerPage = () => {
  const [isDimmed, setIsDimmed] = useState(false);

  // window.ReactNativeWebView.postMessage("triggerBiometric");
  const navigate = useNavigate();
  const navigatePage = (path: string) => {
    navigate(path);
  };
  //TODO: 지문 등록 버튼 눌렀을 때 App에서 지문인증 실행
  return (
    <>
      <Background $colormode="gradient">
        <Container $left={true} $paddingTop="36px">
          <Back>뒤로가기</Back>
          {/* 이 WhiteWrapper가 자주 쓰인다면 별도 옵션으로 둬도 되겠다 */}
          <Container
            $marginTop="36px"
            $paddingTop="63px"
            $backgroundColor="white"
            $borderRadius="38px"
            height="auto"
          >
            <Text size="subtitle1" fontWeight="bold">
              지문 인증
            </Text>
            <Text size="body1" fontWeight="medium">
              지문 인증을 완료해주세요
            </Text>
            <Image src={fingerPrint} width={9} $margin="30px 0 50px 0"></Image>
            <Button
              option="activated"
              onClick={() => {
                setIsDimmed(true);
                window.ReactNativeWebView.postMessage("triggerBiometric");
              }}
            >
              인증하기
            </Button>
            <Button
              $border="none"
              style={{ marginBottom: "20px" }}
              onClick={() => {
                navigatePage(PATH.LOGIN_PASSWORD);
              }}
            >
              건너뛰기
            </Button>
          </Container>
        </Container>
      </Background>
      {isDimmed && <ModalBg />}
    </>
  );
};

export default LoginFingerPage;
