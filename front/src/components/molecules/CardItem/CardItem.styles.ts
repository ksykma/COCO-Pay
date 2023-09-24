import styled from "styled-components";
import HomePage from '../../../pages/HomePage/HomePage';

export const Hr = styled.hr`
  margin: 0 24px;
  border: none; // 기본 border를 제거합니다.
  border-top: 2px solid ${(props) => props.theme.color.grey4}; // 두께와 색상을 설정합니다.
`;

type CardItemWrapperProps = {
  $padding?: string;
  $margin?: string;
  $alignItems?: string;
};

export const CardItemWrapper = styled.div<CardItemWrapperProps>`
  display: flex;
  padding: ${(props) => props.$padding};
  margin: ${(props) => props.$margin};
  align-items: ${(props) => props.$alignItems};
`;

type CardListBarProps = {
  width?: string;
  $bgc?: string;
  $isAbsolute?: boolean;
};

export const CardListBar = styled.div<CardListBarProps>`
  height: 5px;
  width: ${(props) => props.width};
  background-color: ${(props) => (props.$bgc ? props.theme.color[props.$bgc] : 'none')};
  border-radius: 5px;
  position: ${(props) => (props.$isAbsolute ? 'absolute' : 'relative')};
  top: 0;
  left: 0;
`
