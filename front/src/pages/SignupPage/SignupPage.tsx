import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddMessage } from "@/apis/User/Mutations/useAddMessage";
import { useAddMessageConfirm } from "@/apis/User/Mutations/useAddMessageConfirm";
import { useForm } from "react-hook-form";
import { PATH } from "@/constants/path";

import { Image } from "@/components/atoms/Image/Image";
import { Container } from "@/components/atoms/Container/Container.styles";
import { Text } from "@/components/atoms/Text/Text.styles";
import { Wrapper } from "@/components/atoms/Wrapper/Wrapper.styles";
import { ModalBg } from "@/components/atoms/Modal/Modal.styles";
import { ModalWrapper } from "./SignupPage.styles";
import Dots from "@/assets/images/img-dots-row-gray.png";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Dropdown from "@/components/atoms/Dropdown/Dropdown";
import Modal from "@/components/atoms/Modal/Modal";

import { useRecoilState } from "recoil";
import { userInfoState } from "@/states/UserInfoAtoms";

interface FormValue {
  name: string;
  identification_number: string;
  phone_number: string;
}

const SignupPage: React.FC = () => {
  // 상태관리
  const [btnMent, setBtnMent] = useState<string>("인증번호 받기");
  const [userTel, setUserTel] = useState<string>("");
  const [messageNum, setMessageNum] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // 훅, 뮤테이션훅
  const navigate = useNavigate();
  const addMessageMutation = useAddMessage();
  const addMessageConMutation = useAddMessageConfirm();
  const {
    register,
    formState: { errors },
  } = useForm<FormValue>({ mode: "onChange" });

  // 핸들러
  const sendMessage = () => {
    setBtnMent("인증번호 재전송");
    addMessageMutation.mutate(userTel);
  };

  const numberCheck = () => {
    const messageData = { tel: userTel, code: messageNum };
    addMessageConMutation.mutate(messageData);
  };

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if (addMessageConMutation.isError) toggleModal();
    if (addMessageConMutation.isSuccess) navigate(PATH.PASSWORD_SETTING);
  }, [addMessageConMutation.isError, addMessageConMutation.isSuccess]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setUserInfo((prev) => ({ ...prev, name: newName }));
  };

  const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTel = e.target.value.slice(0, 11).toString();

    setUserTel(newTel);
    setUserInfo((prev) => ({ ...prev, tel: newTel }));
  };

  const handleCompanyChange = (newCompany: string) => {
    setUserInfo((prev) => ({ ...prev, company: newCompany }));
  };

  const handleBirthChange = (newBirth: string) => {
    setUserInfo((prev) => ({ ...prev, birth: newBirth }));
  };

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <SignupLayout
      btnMent={btnMent}
      userTel={userTel}
      messageNum={messageNum}
      isModalOpen={isModalOpen}
      errors={errors}
      register={register}
      sendMessage={sendMessage}
      setUserTel={setUserTel}
      setMessageNum={setMessageNum}
      numberCheck={numberCheck}
      toggleModal={toggleModal}
      handleNameChange={handleNameChange}
      handleTelChange={handleTelChange}
      handleCompanyChange={handleCompanyChange}
      handleBirthChange={handleBirthChange}
    />
  );
};

interface SignupLayoutProps {
  btnMent: string;
  userTel: string;
  messageNum: string;
  isModalOpen: boolean;
  errors: any; // 예외적 any... errors 무슨 유형이 오는지 몰라서 이렇게 적어둡니다
  register: any;
  sendMessage: () => void;
  setUserTel: (tel: string) => void;
  setMessageNum: (num: string) => void;
  numberCheck: () => void;
  toggleModal: () => void;
  handleNameChange: any;
  handleTelChange: any;
  handleCompanyChange: any;
  handleBirthChange: any;
}

const SignupLayout = ({
  btnMent,
  userTel,
  messageNum,
  isModalOpen,
  errors,
  register,
  sendMessage,
  setUserTel,
  setMessageNum,
  numberCheck,
  toggleModal,
  handleNameChange,
  handleTelChange,
  handleCompanyChange,
  handleBirthChange,
}: SignupLayoutProps) => {
  return (
    <Container $paddingTop="70px" $border={false}>
      <Container
        $padding="none"
        $border={false}
        $left={true}
        $overflow="scroll"
      >
        <Text size="subtitle1" style={{ marginBottom: "6px" }}>
          코코페이 이용을 위해
        </Text>
        <Text size="subtitle1" style={{ marginBottom: "26px" }}>
          <b>본인확인</b>을 진행해주세요
        </Text>
        {/* name input */}
        <Wrapper>
        <Input
          height={65}
          name="name"
          placeholder="이름을 작성해주세요"
          onChange={(e) => {
            handleNameChange(e);
          }}

          // dear. 혜현 : 이 부분을 지워야 userInfo에 값이 들어가서 일단 주석처리
          // {...register("name", {
          //   required: true, // 필수 입력
          //   minçLength: {
          //     value: 2,
          //     message: "최소 2글자 이상 입력하세요",
          //   },
          //   maxLength: {
          //     value: 8,
          //     message: "최대 8글자까지 입력 가능합니다",
          //   },
          //   pattern: {
          //     value: /^[a-zA-Z가-힣\s]*$/, // 문자 또는 공백만 허용
          //     message: "올바른 이름 형식이 아닙니다",
          //   },
          // })} //TODO: 에러메세지 text스타일컴포넌트로 커스텀하기
        ></Input>
        </Wrapper>
        {errors.name && (
          <small style={{ color: "red", fontSize: "14px" }}>
            {errors.name.message}
          </small>
        )}
        <br />
        {/* birth input */}
        <Wrapper $flexDirection="row" $justifyContent="space-between">
          <Input
            height={65}
            width={122}
            name="birth"
            maxLength={6}
            onChange={(e) => {
              handleBirthChange(e.target.value);
            }}
          ></Input>
          <Text size="subtitle1" color="grey3">
            -
          </Text>
          <Input maxLength={1} height={65} width={35} $textAlign="center" $paddingLeft={0}></Input>
          <Image src={Dots} width={40} $unit="%"></Image>
        </Wrapper>
        <br />
        {/* company dropdown */}
        <Wrapper>
        <Dropdown
          options={["SKT", "KT", "LG"]}
          defaultValue="통신사를 선택해주세요"
          onChange={handleCompanyChange}
        />
        </Wrapper>
        {/* tel input */}
        <Wrapper>
        <Input
          height={65}
          name="tel"
          placeholder="핸드폰 번호를 입력해주세요"
          {...register("phone_number", {
            required: true,
            pattern: {
              value: /^[0-9]{11}$/,
              message: " '-'없이 11자리 번호만 입력해주세요!'",
            },
          })}
          value={userTel}
          // 여긴 됨
          onChange={(e) => {
            setUserTel(e.target.value.toString());
            handleTelChange(e);
          }}
        ></Input>
        </Wrapper>
        {errors.phone_number && (
          <small style={{ color: "red", fontSize: "14px" }}>
            {errors.phone_number.message}
          </small>
        )}
        <br />

        {/* 인증번호 input */}
        <Wrapper $flexDirection="row" $justifyContent="space-between">
          <Input
            height={65}
            width={150}
            value={messageNum}
            onChange={(e) => {
              setMessageNum(e.target.value);
            }}
          ></Input>

          <Button
            onClick={sendMessage}
            $fontSize="18px"
            option="activated"
            $width="50%"
            size="large"
            $borderRadius="13px"
          >
            {btnMent}
          </Button>
        </Wrapper>

        {/* <TimerComponent
          timerColor="danger"
          initialSeconds={initialSeconds}
        ></TimerComponent> */}

        <br />
        <Wrapper>
        <Button option={messageNum.length >= 6 ? "activated" : "deActivated"} onClick={numberCheck} size="large">
          확인
        </Button>
        </Wrapper>
        {isModalOpen && (
          <ModalBg onClick={toggleModal}>
            <Modal toggleModal={toggleModal}>
              <ModalWrapper style={{ width: "100%" }}>
                <Text
                  size="body1"
                  fontWeight="bold"
                  style={{
                    marginBottom: "12px",
                  }}
                >
                  인증번호 오류
                </Text>
                <Text size="body2" fontWeight="regular">
                  번호가 맞지 않습니다.
                </Text>
                <Text
                  size="body2"
                  fontWeight="regular"
                  style={{
                    marginBottom: "36px",
                  }}
                >
                  정보 확인 후 재시도해주세요.
                </Text>
                <Button 
                  option="deActivated"
                  onClick={numberCheck} 
                  size="large">
                  확인
                </Button>
              </ModalWrapper>
            </Modal>
          </ModalBg>
        )}
      </Container>
    </Container>
  );
};
export default SignupPage;
