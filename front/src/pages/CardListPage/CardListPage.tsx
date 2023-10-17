import React, { useEffect, useState } from "react";
import CardItem from "@/components/molecules/CardItem/CardItem";
import { Text } from "@/components/atoms/Text/Text.styles";
import {
  CardListContainer,
  Container,
} from "@/components/atoms/Container/Container.styles";
import { ModalBg } from "@/components/atoms/Modal/Modal.styles";
import { Background } from "@/components/atoms/Background/Background.styles";
import { Hr, Layout } from "@/pages/CardListPage/CardListPage.styles";
import Button from "@/components/atoms/Button/Button";
import iconPlusGrey from "@/assets/images/icon-plus-grey.png";
import { Image } from "@/components/atoms/Image/Image";
import Modal from "@/components/atoms/Modal/Modal";
import { Wrapper } from "@/components/atoms/Wrapper/Wrapper.styles";
import { useGetCardList } from "@/apis/Card/Queries/useGetCard";
import { useDeleteCard } from "@/apis/Card/Mutations/useDeleteCard";
import { Card } from "@/types/card";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { useRecoilState } from "recoil";

const CardListPage = () => {
  const navigate = useNavigate();

  const navigatePage = (path: string) => {
    navigate(path);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const CardList = useGetCardList();
  const [deleteCardId, setDeleteCardId] = useState(0);
  const queryClient = useQueryClient();
  const useDeleteCardMutation = useDeleteCard();

  const deleteCard = (deleteCardId: number) => {
    useDeleteCardMutation.mutate(deleteCardId, {
      onSuccess: () => {
        queryClient.invalidateQueries(["CardList"]);
        setIsModalOpen(false); // 모달 닫기
        setSwipedIndex(null); // 현재 스와이프 된 카드 초기화
      },
      onError: () => {
        console.log("삭제 실패");
      },
    });
  };

  //모달 오픈 함수
  const toggleModal = (cardId: number) => {
    setDeleteCardId(cardId);
    setIsModalOpen((prev) => !prev);
  };

  // 현재 스와이핑되고 있는 CardItem의 인덱스를 저장
  const [swipedIndex, setSwipedIndex] = useState<number | null>(null);

  const handleSwipeStart = (index: number) => {
    if (swipedIndex !== null && swipedIndex !== index) {
      // 다른 CardItem을 스와이핑할 때 기존의 스와이핑된 CardItem 초기화
      setSwipedIndex(null);
    } else {
      setSwipedIndex(index);
    }
  };


  return (
    <Background>
      <CardListContainer $padding="36px 0 0 0">
        <Text
          size="body1"
          fontWeight="bold"
          color="black1"
          $margin="0 36px 4px 36px"
        >
          보유 카드 목록
        </Text>
        <Text
          size="small3"
          fontWeight="light"
          color="grey1"
          $margin="12px 36px 0 36px"
        >
          왼쪽으로 밀어 보유한 카드를 삭제할 수 있어요.
        </Text>
        <Text
          size="small3"
          fontWeight="light"
          color="grey1"
          $margin="0 36px 36px 36px"
        >
          오른쪽 아이콘을 눌러 카드 순서를 변경할 수 있어요.
        </Text>
        <Hr />
        {CardList.length > 0 &&
          CardList.map((card: Card, idx: number) => (
            <CardItem
              key={idx}
              card={card}
              cardType="cardlist"
              onSwipeStart={() => handleSwipeStart(idx)}
              resetSwipe={swipedIndex !== null && swipedIndex !== idx}
              swipedIndex={swipedIndex} // 추가
              index={idx} // 추가
              opendeletemodal={() => toggleModal(card.id)}
              onClick={() =>
                navigatePage(
                  `${PATH.CARD_DETAIL.replace(":cardId", card.id.toString())}`
                )
              }
            />
          ))}
        <Layout>
          <Button
            onClick={() => navigatePage(PATH.SCAN_CARDINFO)}
            option="dashed"
            size="medium"
            $borderRadius="16px"
            $fontSize="16px"
            style={{ marginBottom: "90px" }}
          >
            <Image src={iconPlusGrey} width={12} height={12} $unit="px"></Image>
            카드 등록
          </Button>
        </Layout>
      </CardListContainer>

      {/* 모달 부분 */}
      {isModalOpen && (
        <ModalBg onClick={() => toggleModal(deleteCardId)}>
          <Modal toggleModal={() => toggleModal(deleteCardId)}>
            <Wrapper style={{ paddingTop: "20px" }}>
              <Wrapper>
                <Text
                  size="body1"
                  fontWeight="bold"
                  style={{
                    marginBottom: "12px",
                  }}
                >
                  카드삭제
                </Text>
                <Text size="body1" fontWeight="regular">
                  카드 정보를 삭제하면
                </Text>
                <Text size="body1" fontWeight="regular">
                  추후 재등록이 필요합니다.
                </Text>
                <Text size="body1" fontWeight="regular">
                  계속 진행할까요?
                </Text>
              </Wrapper>
              <br />
              <Wrapper $flexDirection="coloum" $justifyContent="space-evenly">
                <Button
                  $width="10rem"
                  option="deActivated"
                  style={{ margin: "10px", padding: "10px"}}
                  onClick={() => toggleModal(deleteCardId)}
                >
                  취소
                </Button>
                <Button
                  $width="10rem"
                  option="danger"
                  style={{ margin: "10px", padding: "10px" }}
                  onClick={() => deleteCard(deleteCardId)}
                >
                  삭제
                </Button>
              </Wrapper>
            </Wrapper>
          </Modal>
        </ModalBg>
      )}
    </Background>
  );
};

export default CardListPage;
