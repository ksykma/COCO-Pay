import React, { useState } from "react";
import { Wrapper } from "@/components/atoms/Wrapper/Wrapper.styles";
import Button from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text.styles";
import backArrow from "@/assets/images/icon-arrow-left-grey.png";
import { Image } from "@/components/atoms/Image/Image";
//TODO: 욕심파트 : 새로고침 버튼 누르면 배열 바뀌게

const BUTTON_STYLES = {
  width: "80px",
  height: "48px",
};

const PwCheckButtons = () => {
  const [pressedCount, setPressedCount] = useState(0);
//   const [isPressed, setIsPressed] = useState(Array(keypad.length).fill(false));


  const keypad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "back"];

  const handleNumberPress = () => {
    if (pressedCount < 6) {
      setPressedCount((prevCount) => prevCount + 1);
    }
    //TODO: 만약 pressedCount가 6이면 비밀번호 맞나 검증
  };

  const handleDeletePress = () => {
    if (pressedCount > 0) {
      setPressedCount((prevCount) => prevCount - 1);
    }
  };

  const renderStarButton = (_: unknown, index: number) => (
    <Button
      key={index}
      size="small"
      option={index < pressedCount ? "activated" : "deActivated"}
      $width="37px"
      $border="none"
    >
      <Text
        size="subtitle1"
        fontWeight="bold"
        color="white"
        style={{ paddingTop: "8px", opacity: index < pressedCount ? 1 : 0 }}
      >
        *
      </Text>
    </Button>
  );

  const renderNumberButton = (number: number) => (
    <Button
    //   onMouseDown={() => setIsPressed(true)}
    //   onMouseUp={() => setIsPressed(false)}
    //   onMouseLeave={() => setIsPressed(false)}
    //   onClick={handleNumberPress}
    //   //   $backgroundColor="grey4"
    //   option={isPressed ? "activated" : "deActivated"}
      size="small"
      $border="none"
      style={BUTTON_STYLES}
    >
      <Text size="subtitle2" color="grey1" fontWeight="bold">
        {number}
      </Text>
    </Button>
  );

  const renderEmptyButton = () => (
    <Button
      option="deActivated"
      size="small"
      $backgroundColor="white"
      $border="none"
      style={BUTTON_STYLES}
    />
  );

  const renderBackButton = () => (
    <Button
      onClick={handleDeletePress}
      option="deActivated"
      $backgroundColor="grey4"
      size="small"
      $border="none"
      style={BUTTON_STYLES}
    >
      <Image src={backArrow} width={1.4} style={{ paddingTop: "4px" }} />
    </Button>
  );

  return (
    <>
      <Wrapper
        flexDirection="row"
        justifyContent="space-between"
        style={{ margin: "36px 0 28px 0" }}
      >
        {Array.from({ length: 6 }).map(renderStarButton)}
      </Wrapper>
      <Wrapper
        flexDirection="row"
        justifyContent="space-between"
        style={{ marginBottom: "28px", gap: "10px", flexWrap: "wrap" }}
      >
        {keypad.map((btn: number | string) => {
          if (btn === "") return renderEmptyButton();
          if (btn === "back") return renderBackButton();
          return renderNumberButton(btn as number);
        })}
      </Wrapper>
    </>
  );
};

export default PwCheckButtons;