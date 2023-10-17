import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Background } from "@/components/atoms/Background/Background.styles";
import { Container } from "@/components/atoms/Container/Container.styles";
import { PATH } from "@/constants/path";
import { Text } from "@/components/atoms/Text/Text.styles";
import Back from "@/components/atoms/Back/Back";
import KeypadButtons from "@/components/molecules/KeypadButtons/KeypadButtons";
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

const LoginPasswordPage = () => {
  const navigate = useNavigate();
  const navigatePage = (path: string) => {
    navigate(path);
  };
  const [step, setStep] = useState(3);
  const handlePasswordMatch = () => {
    navigatePage(PATH.MAIN);
  };

  return (
    <Background $colormode="gradient">
      <Container $left={true} $paddingTop="36px">
        <Back>뒤로가기</Back>
        <Container
          $marginTop="36px"
          $paddingTop="63px"
          $backgroundColor="white"
          $borderRadius="38px"
          height="auto"
          $padding="36px"
        >
          <Text size="subtitle1" fontWeight="bold">
            간편 비밀번호 입력
          </Text>
          <Text size="body1" fontWeight="medium">
            비밀번호 6자리를 입력해주세요
          </Text>
          <KeypadButtons
            step={step}
            setStep={setStep}
            onPasswordMatch={handlePasswordMatch}
          ></KeypadButtons>
        </Container>
      </Container>
    </Background>
  );
};

export default LoginPasswordPage;
