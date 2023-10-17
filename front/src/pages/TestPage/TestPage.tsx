import React from "react";
import ParticleMove from "../PayOnlineCompletePage/ParticleMove";
import { Container } from "@/components/atoms/Container/Container.styles";
import { Text } from "@/components/atoms/Text/Text.styles";
import { Image } from "@/components/atoms/Image/Image";
// import { Wrapper } from "@/components/atoms/Wrapper/Wrapper.styles";
import loding from "@/assets/images/loading_pengin.png";
// import { Color } from "p5";
const TestPage = () => {

  return (
    <>
      <ParticleMove></ParticleMove>
      <Container $left={true} $paddingTop="63px" height="100vh" $padding="20px" style={{
      backgroundColor: "#A6DDFB", // 하늘색 배경색 설정
      // 다른 스타일 속성 추가 가능
    }}>
      <Text fontWeight="bold" style={{ color: "#fcf006" ,textShadow: "1px 1px 2px #000", fontSize:"60px"}} $marginLeft="10%" $marginTop="40%">
      ~~로딩중~~
    </Text>
    <Text fontWeight="bold" style={{ color: "#06A1FC" ,textShadow: "1px 1px 2px #000", fontSize:"35px"}} $marginLeft="13%" $marginTop="5%">
      조금만 기다려주세여!
    </Text>
    <br />
  <Image
    src={loding}
    width={15}
    style={{ marginLeft: "15%", marginTop: "20%" }}
  ></Image>
</Container>
    </>
  );
};

export default TestPage;
