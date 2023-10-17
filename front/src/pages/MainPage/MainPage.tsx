import { Background } from "@/components/atoms/Background/Background.styles";
import NavBar from "@/components/molecules/NavBar/NavBar";
import React, { Suspense, useEffect } from "react";
import { Container } from "@/components/atoms/Container/Container.styles";
import { Text } from "@/components/atoms/Text/Text.styles";
import { Outlet } from "react-router-dom";
import { Image } from "@/components/atoms/Image/Image";
import loding from "@/assets/images/loading_pengin.png";

const MainPage = () => {

  const LoadingImage = () => (
    <div>
      <img
        src="src/assets/images/loading_pengin.png" // 로딩 이미지 파일의 경로를 지정하세요
        alt="로딩 중 이미지"
        width={200} // 이미지의 너비 설정
        height={200} // 이미지의 높이 설정
      />
    </div>
  );

  return (
    <Suspense fallback={<Container $left={true} $paddingTop="63px" height="100vh" $padding="20px" style={{
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
</Container>}>
      <Background
        $colormode="gradient"
        style={{
          minHeight: "100vh",
          minWidth:"100vw"
        }}
      >
        <Outlet />
        <NavBar />
      </Background>
    </Suspense>
  );
};

export default MainPage;
