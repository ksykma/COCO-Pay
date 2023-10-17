import React from "react";
import {
  CategoryMenuBox,
  DropDownBoxWrap,
  DropDownContainer,
  ListItem,
} from "./Dropdown.styles";

const CategoryDropDown = () => {
  const [IsOpen, setIsOpen] = React.useState<boolean>(false);
  const onToggle = () => setIsOpen(!IsOpen);
  const onOptionClicked = (value: string, index: number) => () => {
    setIsOpen(false);
  };

  return (
    <>
      <CategoryMenuBox onClick={onToggle}>
        아직미완성🤮
        {/* <con width="10" height="17" /> */}
      </CategoryMenuBox>
      <DropDownBoxWrap>
        <DropDownContainer>
          {IsOpen && (
            <>
              <ListItem onClick={onOptionClicked("발라드", 1)}>발라드</ListItem>
              <ListItem onClick={onOptionClicked("알앤비", 2)}>알앤비</ListItem>
              <ListItem onClick={onOptionClicked("랩", 3)}>랩</ListItem>
              <ListItem onClick={onOptionClicked("락", 4)}>락</ListItem>
              <ListItem onClick={onOptionClicked("트로트", 5)}>트로트</ListItem>
              <ListItem onClick={onOptionClicked("인디", 6)}>인디</ListItem>
            </>
          )}
        </DropDownContainer>
      </DropDownBoxWrap>
    </>
  );
};

export default CategoryDropDown;
