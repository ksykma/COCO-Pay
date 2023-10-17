import { Background } from "@/components/atoms/Background/Background.styles";
import React, { useState } from "react";
import { WhiteRoundedBox } from "@/components/atoms/WhiteRoundedBox/WhiteRoundedBox.styles";
import { Text } from "@/components/atoms/Text/Text.styles";
import { Image } from "@/components/atoms/Image/Image";
import iconToggle from "@/assets/images/icon-toggle.png";
import iconChevronRightGrey from "@/assets/images/icon-chevron-right-grey.png";
import { MypageWrapper, Checkbox1, Checkbox2, Hr } from "./Mypage.styles";
import imgMypagePenguin from "@/assets/images/img-mypage-penguin.png";
import Button from "@/components/atoms/Button/Button";
import { Wrapper } from "@/components/atoms/Wrapper/Wrapper.styles";
import Modal from "@/components/atoms/Modal/Modal";
import { ModalBg } from "@/components/atoms/Modal/Modal.styles";
import { useGetMyPage } from "@/apis/User/Queries/useGetMyPage";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { useRecoilState, useRecoilValue } from "recoil";
import { priorityAtom, myPagePriorityAtom } from "@/states/UserInfoAtoms";
import { useDeleteUser } from "@/apis/User/Mutations/useDeleteUser";

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const navigatePage = (path: string) => {
    navigate(path);
  };
  const DeleteUser = useDeleteUser();
  const handleDeleteUser = () => {
    DeleteUser.mutate(undefined, {
      onSuccess: () => {
        navigatePage("/");
        // 원하는 추가 동작을 여기에 작성하세요.
      },
      onError: () => {
        console.log("handleDeleteUser에서의 추가 동작: 회원 탈퇴 실패!");
        // 실패했을 때 원하는 추가 동작을 여기에 작성하세요.
      },
    });
  };

  //모달 오픈 함수
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const withdrawal = () => {
    toggleModal();
  };
  const UserMyPage = useGetMyPage();
  const [priority, setPriority] = useRecoilState(priorityAtom);
  const Priority = useRecoilValue(myPagePriorityAtom);

  const handleSetPriority = () => {
    setPriority("mypage");
  };

  return (
    <Background
      $colormode="gradient"
      style={{
        padding: "36px 28px",
      }}
    >
      <Image
        src={imgMypagePenguin}
        width={100}
        $unit="%"
        style={{
          position: "relative",
        }}
      ></Image>
      <WhiteRoundedBox
        height="432px"
        $borderRadius="38px"
        $padding="36px 24px"
        style={{
          marginTop: "-35px",
        }}
      >
        <MypageWrapper
          style={{
            marginTop: "25px",
          }}
        >
          <Text size="subtitle2" fontWeight="bold" color="black1">
            {UserMyPage.name}
          </Text>
          <Text size="subtitle2" fontWeight="light" color="black1">
            님의 마이페이지
          </Text>
        </MypageWrapper>
        <Hr />
        <MypageWrapper // 마이페이지 리스트 감싸고 있음
          $justifyContent="space-between"
          style={{
            flexDirection: "column",
            height: "60%",
          }}
        >
          <MypageWrapper $justifyContent="space-between">
            <Text size="body2" fontWeight="bold" color="black1">
              바코드 잠금 여부
            </Text>
            <Checkbox1 type="checkbox" id="toggle" />
          </MypageWrapper>
          <MypageWrapper $justifyContent="space-between">
            <Text size="body2" fontWeight="bold" color="black1">
              지문 인식
            </Text>
            <Checkbox2 type="checkbox" id="toggle" />
          </MypageWrapper>
          <MypageWrapper
            onClick={() => navigatePage(PATH.PASSWORD_SETTING)} //TODO: 비밀번호 재설정 후 -> 다시 마이페이지로 돌아오게
            $justifyContent="space-between"
          >
            <Text size="body2" fontWeight="bold" color="black1">
              비밀번호 설정(재설정)
            </Text>
            <Image src={iconChevronRightGrey} height={24} $unit="px"></Image>
          </MypageWrapper>
          <MypageWrapper
            onClick={() => {
              navigatePage(PATH.PRIORITY);
              handleSetPriority();
            }}
            $justifyContent="space-between"
          >
            <Text size="body2" fontWeight="bold" color="black1">
              카드 추천
            </Text>
            <MypageWrapper
              // 할인율과 ChevronRight 감싸고 있음
              $justifyContent="space-between"
            >
              <Text
                size="small1"
                fontWeight="light"
                color="blue"
                style={{ lineHeight: "24px" }}
              >
                {Priority === 1 ? "할인율" : "실적"}
              </Text>
              <Image src={iconChevronRightGrey} height={24} $unit="px"></Image>
            </MypageWrapper>
          </MypageWrapper>
          <MypageWrapper onClick={toggleModal} $justifyContent="space-between">
            <Text size="body2" fontWeight="bold" color="black1">
              회원 탈퇴
            </Text>
            <Image src={iconChevronRightGrey} height={24} $unit="px"></Image>
          </MypageWrapper>
        </MypageWrapper>
      </WhiteRoundedBox>
      {/* 모달 부분 */}
      {isModalOpen && (
        <ModalBg onClick={toggleModal}>
          <Modal toggleModal={toggleModal}>
            <Wrapper $padding="10px">
              <Wrapper>
                <Text
                  size="body1"
                  fontWeight="bold"
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  회원 탈퇴
                </Text>

                <Text size="body2" fontWeight="regular">
                  회원 탈퇴시, 모든 정보가 삭제됩니다.
                </Text>
                <Text size="body2" fontWeight="regular">
                  그래도 탈퇴하시겠습니까?
                </Text>
                {/* <Text size="body2" fontWeight="regular">
                  계속 진행할까요?
                </Text> */}
              </Wrapper>
              <br />
              {/* <Wrapper $flexDirection="coloum" $justifyContent="space-evenly"> */}
              <Button
                color="gray2"
                $width="12rem"
                option="activated"
                style={{ margin: 10 }}
                onClick={toggleModal}
              >
                다시 생각해볼게요
              </Button>
              <Button
                $width="12rem"
                option="danger"
                style={{ margin: 10 }}
                onClick={() => {
                  withdrawal();
                  handleDeleteUser();
                }}
              >
                네, 삭제하겠습니다
              </Button>
            </Wrapper>
          </Modal>
        </ModalBg>
      )}
    </Background>
  );
};

export default MyPage;
