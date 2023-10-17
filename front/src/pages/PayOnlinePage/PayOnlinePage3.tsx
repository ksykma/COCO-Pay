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
import imgOnlinePenguin from "@/assets/images/img-online-penguin.png"
import imgOnlinePenguinArm from "@/assets/images/img-online-penguin-arm.png"
import ModalCardItem from "@/components/molecules/ModalCardItem/ModalCardItem"
import { useRecoilState, useRecoilValue } from 'recoil';
import { PayOnlineCardList, ChangeCardAtom } from '@/states/OnlineQrPageAtoms';
import numberToAmount from "@/utils/NumToAmount";
import { usePostPayOnlineComplete } from "@/apis/Card/Mutations/useAddCardList";


type PayOnlinePageProps = {
  onNextPage: () => void;
};

type Selected = {
  cardId: number;
  cardImage: string;
  cardName: string;
  cardOrder: number;
  cardType: string;
  curPerLevel: number;
  discountRate: number;
  discountType: string;
  discounted: number;
  finalPrice: number;
  graphRate: number;
  master: boolean;
  pastPerfornamce: boolean;
  remainingAmt: number;
  serialNumber: string;
  visa: boolean;
}

function PayOnlinePage3(props: PayOnlinePageProps) {
  const { onNextPage } = props;
  const navigate = useNavigate();

  const navigatePage = (path: string) => {
    localStorage.setItem('isPurchased', 'true');
  
    setTimeout(() => { // 딜레이 후 페이지 이동
      navigate(path);
    }, 500); // 500ms 딜레이
  };

  const [IsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedModalCardIndex, setSelectedModalCardIndex] = useState<number>(100);
  const PayOnlineCardLists = useRecoilValue(PayOnlineCardList)
  // const SelectedCard : Selected = useRecoilValue(ChangeCardAtom)
  const PayOnlineComplete = usePostPayOnlineComplete()
  const [changeCard, setChangeCard] = useRecoilState(ChangeCardAtom)

  const handlePayOnlineComplete = () => {
    const PayData = {
        "cardId": changeCard.cardId,
        "orderPrice":428000,
        "transactionType":"일시불"
      }
      PayOnlineComplete.mutate(PayData, {
        onSuccess: () => {
          navigatePage(PATH.PAYONLINECOMPLETE)
        }
    });
  }

  const handleModalCardClick = (index: number) => {
    setSelectedModalCardIndex(index);
  };

  const handleChangeCard = (index : number) => {
    setChangeCard(PayOnlineCardLists[index])
  }

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
          height="480px"
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
          src={changeCard && changeCard.cardImage}
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
          {changeCard && changeCard.cardName}
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
          {changeCard && changeCard.discountRate}% {changeCard && changeCard.discountType}
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
            onClick={() => handlePayOnlineComplete()}
            option="activated"
            size="medium"
            style={{
              borderRadius: "21px",
              marginTop: "8px"
            }}
          >
            {changeCard && numberToAmount(changeCard.finalPrice)}원 결제하기
          </Button>
          <Button
          $border="none"
          >
            할부선택
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
          {
          PayOnlineCardLists.length > 0 &&
          PayOnlineCardLists.slice(0, 3).map((card: Selected, idx: number) => (
            <ModalCardItem
              key={idx}
              card={card}
              onClick={() => handleModalCardClick(idx)}
              style={selectedModalCardIndex !== 100 && selectedModalCardIndex !== idx ? { filter: 'grayscale(1) opacity(0.5)' } : {}}
            />
          ))}
          <Button 
            onClick={() => {
              onNextPage();
              handleChangeCard(selectedModalCardIndex);
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
