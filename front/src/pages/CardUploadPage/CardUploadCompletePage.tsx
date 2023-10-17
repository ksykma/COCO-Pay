import CardItem from "@/components/molecules/CardItem/CardItem";
import { Text } from "@/components/atoms/Text/Text.styles";
import { CardListContainer } from "@/components/atoms/Container/Container.styles";
import React, {useState } from "react";
import { Background } from "@/components/atoms/Background/Background.styles";
import { Hr, Layout } from "@/pages/CardListPage/CardListPage.styles";
import Button from "@/components/atoms/Button/Button";
import iconPlusGrey from "@/assets/images/icon-plus-grey.png";
import { Image } from "@/components/atoms/Image/Image";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { Wrapper } from "@/components/atoms/Wrapper/Wrapper.styles";
import { ModalBg } from "@/components/atoms/Modal/Modal.styles";
import Modal from "@/components/atoms/Modal/Modal";
import { useGetUserCard } from "@/apis/Card/Queries/useGetCard";
import { useDeleteCard } from "@/apis/Card/Mutations/useDeleteCard";
import { Card, CardUpload } from "@/types/card";
import { useQueryClient } from '@tanstack/react-query';
import { useRecoilState } from "recoil";
import { priorityAtom } from "@/states/UserInfoAtoms";

const CardUploadCompletePage = () => {

  const navigate = useNavigate();

  const navigatePage = (path: string) => {
    navigate(path);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const CardUploadList = useGetUserCard();
  const [deleteCardId, setDeleteCardId] = useState(0);
  const queryClient = useQueryClient();
  const useDeleteCardMutation = useDeleteCard();
  const [priority, setPriority] = useRecoilState(priorityAtom)

  const handleSetPriority = () => {
    setPriority("upload")
  }

  const deleteCard = (deleteCardId: number) => {
    useDeleteCardMutation.mutate(deleteCardId, {
      onSuccess: () => {
        queryClient.invalidateQueries(["CardUploadList"]);
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
      <CardListContainer
        $padding="36px 0 0 0"
      >
        <Text
          size="body1"
          fontWeight="bold"
          color="black1"
          $margin="0 36px 4px 36px"
        >
          불러온 카드 목록
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
        {
          CardUploadList.length > 0 &&
          CardUploadList.map((card: CardUpload, idx: number) => (
            <CardItem
              key={idx}
              card={card}
              cardType="cardupload"
              onSwipeStart={() => handleSwipeStart(idx)}
              resetSwipe={swipedIndex !== null && swipedIndex !== idx}
              swipedIndex={swipedIndex} // 추가
              index={idx} // 추가
              opendeletemodal={() => toggleModal(card.userCardId)}
              onClick={() => navigatePage(`${PATH.CARD_DETAIL.replace(":cardId", card.userCardId.toString())}`)}
            />
          ))}
        <Layout>
            <Button
                onClick={() => {navigatePage(PATH.PRIORITY); handleSetPriority()}}
                option="activated"
                $borderRadius="16px"
                $fontSize="16px"
            >
                확인
            </Button>
        </Layout>
        {isModalOpen && (
        <ModalBg onClick={() =>toggleModal(deleteCardId)}>
          <Modal toggleModal={() =>toggleModal(deleteCardId)}>
            <Wrapper $padding="10px" style={{ paddingTop: "30px" }}>
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
                <Text size="body2" fontWeight="regular">
                  카드 정보를 삭제하면
                </Text>
                <Text size="body2" fontWeight="regular">
                  추후 다시 등록하셔야 합니다.
                </Text>
                <Text size="body2" fontWeight="regular">
                  계속 진행할까요?
                </Text>
              </Wrapper>
              <br />
              <Wrapper $flexDirection="coloum" $justifyContent="space-evenly">
                <Button
                  color="gray2"
                  $width="9rem"
                  option="deActivated"
                  style={{ margin: 10 }}
                  onClick={() =>toggleModal(deleteCardId)}
                >
                  취소
                </Button>
                <Button
                  $width="9rem"
                  option="danger"
                  style={{ margin: 10 }}
                  onClick={() => deleteCard(deleteCardId)}
                >
                  삭제
                </Button>
              </Wrapper>
            </Wrapper>
          </Modal>
        </ModalBg>
      )}
      </CardListContainer>
    </Background>
  );
};

export default CardUploadCompletePage;
