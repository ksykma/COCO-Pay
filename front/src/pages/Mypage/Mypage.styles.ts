import styled from "styled-components";

type MypageWrapperProps = {
  $justifyContent?: string;
};

export const MypageWrapper = styled.div<MypageWrapperProps>`
    display: flex;
    justify-content: ${(props) => props.$justifyContent};
`

export const Checkbox1 = styled.input`
  width: 30px;
  height: 12px;
  background: ${(props) => props.theme.color.blue};
  border-radius: 12px;
  margin-right: 12px;
  &::before { // false 회색 바탕화면
    content: "";
    text-align: center;
    line-height: 18.75px;
    width: 37.5px;
    height: 18.75px;
    display: block;
    position: absolute;
    border-radius: 11.25px;
    background-color: ${(props) => props.theme.color.grey2};
    box-shadow: 0 0 6px 1.125px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease-in;
    cursor: pointer;
  }
  &::after { // false 흰색 동그라미
    content: "";
    display: block;
    position: relative;
    width: 15px;
    height: 15px;
    top: 1.875px;
    left: 1.875px;
    border-radius: 50%;
    background: ${(props) => props.theme.color.white};
    transition: all 0.2s ease-in;
  }
  &:checked {
    &::before {
      background-color: ${(props) => props.theme.color.blue};
    }
    &::after {
      background-color: ${(props) => props.theme.color.white};
      left: calc(100% - 9.375px);
    }
  }
`

export const Checkbox2 = styled.input`
  width: 30px;
  height: 12px;
  background: ${(props) => props.theme.color.blue};
  border-radius: 12px;
  margin-right: 12px;
  &::before { // false 회색 바탕화면
    content: "";
    text-align: center;
    line-height: 18.75px;
    width: 37.5px;
    height: 18.75px;
    display: block;
    position: absolute;
    border-radius: 11.25px;
    background-color: ${(props) => props.theme.color.blue};
    box-shadow: 0 0 6px 1.125px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease-in;
    cursor: pointer;
  }
  &::after { // false 흰색 동그라미
    content: "";
    display: block;
    position: relative;
    width: 15px;
    height: 15px;
    top: 1.875px;
    left: 1.875px;
    border-radius: 50%;
    background: ${(props) => props.theme.color.white};
    transition: all 0.2s ease-in;
    left: calc(100% - 9.375px);
  }
  &:checked {
    &::before {
      background-color: ${(props) => props.theme.color.grey2};
    }
    &::after {
      background-color: ${(props) => props.theme.color.white};
      left: 0;
    }
  }
`

export const Hr = styled.hr`
  border: none;
  border-top: 1px solid ${(props) => props.theme.color.grey4};
  margin: 20px 0 44px 0;
`;