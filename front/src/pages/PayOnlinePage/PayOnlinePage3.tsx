import { Background } from "@/components/atoms/Background/Background.styles";
import React, {useState} from "react";
import Button from "@/components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { PayOnlineWrapper, DisplayWrapper, CardListBar, StyledModal, Overlay, Hr } from "./PayOnlinePage3.styles"
import { WhiteRoundedBox } from "@/components/atoms/WhiteRoundedBox/WhiteRoundedBox.styles"
import { Text } from "@/components/atoms/Text/Text.styles"
import { Image } from "@/components/atoms/Image/Image"
import ImgCard1 from "@/assets/images/img-card1.png"
import imgAnotherCard from "@/assets/images/img-another-card.png"
import imgOnlinePenguin from "@/assets/images/img-online-penguin.png"
import imgOnlinePenguinArm from "@/assets/images/img-online-penguin-arm.png"
import ModalCardItem from "@/components/molecules/ModalCardItem/ModalCardItem"

type PayOnlinePageProps = {
  onNextPage: () => void;
};

function PayOnlinePage3(props: PayOnlinePageProps) {
  const { onNextPage } = props;
  const navigate = useNavigate();

  const navigatePage = (path: string) => {
    navigate(path);
  };

  const [IsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedModalCardIndex, setSelectedModalCardIndex] = useState<number | null>(null);

  const handleModalCardClick = (index: number) => {
    setSelectedModalCardIndex(index);
  };

  return (
    <Background
    $colormode="gradient"
    style={{
      position: 'relative',
      height: '100vh'
    }}
  >
    <PayOnlineWrapper
    height="180px"
    $borderRadius="0 0 54px 54px"
    >
    </PayOnlineWrapper>
    <Image
        src={imgOnlinePenguin}
        height={240}
        width={180}
        $unit="px"
        style={{
            position: 'absolute',
            right: 0,
            top: '60px',
            zIndex: 2
        }}
    >
    </Image>
    <Image
      src={imgOnlinePenguinArm}
      height={24}
      width={44}
      $unit="px"
      style={{
        position: 'absolute',
        right: '130px',
        top: '165px',
      }}
    >
    </Image>
    <PayOnlineWrapper
      $padding="0 24px"
      $bgc="none"
      $margin="-92px 0 0 0"
    >
      <WhiteRoundedBox
          height="592px"
          $boxShadow="shadow1"
          $borderRadius="38px"
          $padding="52px 48px"
          style={{
              zIndex: 3
          }}
      >
        <Text
        size="body2"
        fontWeight="bold"
        color="black1"
        $margin="0 0 16px 0"
        >
          YOUR PICK!
        </Text>
        <Image
          src={ImgCard1}
          height={152}
          $margin="0 0 20px 0"
          $unit="px"
          style={{
            width:"100%",
          }}
        >
        </Image>
        <DisplayWrapper
        style={{
          margin:"0 0 4px 0"
        }}
        >
        <Text
        size="body2"
        fontWeight="bold"
        color="black1"
        >
          B.Big(삑)카드
        </Text>
        <Text
        size="body2"
        fontWeight="regular"
        color="black1"
        >
          로 결제하면
        </Text>
        </DisplayWrapper>
        <DisplayWrapper
        style={{
          lineHeight:"28px",
          margin:"0 0 24px 0"
        }}
        >
        <Text
        size="subtitle2"
        fontWeight="bold"
        color="blue"
        >
          10% 페이백
        </Text>
        <Text
        size="body2"
        fontWeight="regular"
        color="black1"
        >
          이 가능해요
        </Text>
        </DisplayWrapper>
          <Button
          option="deActivated"
          size="medium"
          style={{
            margin:"0 0 8px 0",
            borderRadius: "21px",
          }}
          >
            할부선택
          </Button>
          <Button
            onClick={() => navigatePage(PATH.PAYONLINECOMPLETE)}
            option="activated"
            size="medium"
          >
            50,000원 결제하기
          </Button>
        </WhiteRoundedBox>
        <Button
        onClick={() => setIsOpen(!IsOpen)}
        $backgroundColor="transparent"
        $border="none"
        color="grey2"
        style={{
          margin: "40px 0 0 0",
          textDecoration: "underline"
        }}
        >
          다른 카드로 결제하기
        </Button>
        <StyledModal $IsOpen={IsOpen}>
          <Hr></Hr>
          <ModalCardItem
            onClick={() => handleModalCardClick(0)}
            style={selectedModalCardIndex !== null && selectedModalCardIndex !== 0 ? { filter: 'grayscale(1) opacity(0.5)' } : {}}
          ></ModalCardItem>
          <ModalCardItem
            onClick={() => handleModalCardClick(1)}
            style={selectedModalCardIndex !== null && selectedModalCardIndex !== 1 ? { filter: 'grayscale(1) opacity(0.5)' } : {}}
          ></ModalCardItem>
          <ModalCardItem
            onClick={() => handleModalCardClick(2)}
            style={selectedModalCardIndex !== null && selectedModalCardIndex !== 2 ? { filter: 'grayscale(1) opacity(0.5)' } : {}}
          ></ModalCardItem>
          <Button 
            onClick={() => {
              onNextPage();
              setIsOpen(false);
            }}
            option={selectedModalCardIndex !== null ? "activated" : "deActivated"}
          >
            선택한 카드로 결제하기
          </Button>
        </StyledModal>
        <Overlay 
          $IsOpen={IsOpen} 
          onClick={() => setIsOpen(false)} 
        />
      </PayOnlineWrapper>
    </Background>
  );
}

export default PayOnlinePage3;