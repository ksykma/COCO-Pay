import React, { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import { Wrapper } from "@/components/atoms/Wrapper/Wrapper.styles";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { Container } from "@/components/atoms/Container/Container.styles";
import { Text } from "@/components/atoms/Text/Text.styles";
import { Image } from "@/components/atoms/Image/Image";
import CardImg from "@/assets/images/icon-cardinfo.png";
import { Background } from "@/components/atoms/Background/Background.styles";
import { usePostCard } from "@/apis/Card/Mutations/useAddCardList";
import { CardInfo } from "@/types/card";


//TODO: 백그라운드 흰색으로 바꾸기
interface FormValue {
  cardNumber: string;
  expirationPeriod: string;
  CVC: string;
  cardPassword: string;
}

  const ScanCardInfoPage = () => {
    const navigate = useNavigate();

    const navigatePage = (path: string) => {
    navigate(path);
    };

    const PostCard = usePostCard()
    const [maskedCardNumber, setMaskedCardNumber] = useState<string>("");
    const [cardNumber, setCardNumber] = useState<string>("");
    const [CVC, setCVC] = useState<string>(""); // CVC
    const [validDate, setValidDate] = useState<string>(""); // validDate
    const [cardPassword, setCardPassword] = useState<string>(""); // 카드 비밀번호

    const handleCardNumberChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      let newCardNumber = event.target.value.replace(/\D/g, ""); // 숫자만 남기고 나머지 제거
      newCardNumber = newCardNumber.slice(0, 16); // 16자리까지만 유효하도록 자름

      const formatCardNumber = (num: string) => {
        // 4자리마다 "-" 를 넣어서 반환
        return num.replace(/(\d{4})/g, '$1-').replace(/-$/, '');
      };

      // 가운데 8자리 마스킹
      const maskedPortion = newCardNumber.slice(4, 12).replace(/\d/g, "*");
      const formattedCardNumber = `${newCardNumber.slice(
        0,
        4
      )}-${maskedPortion}-${newCardNumber.slice(12)}`;

      setCardNumber(formatCardNumber(newCardNumber));
      setMaskedCardNumber(formattedCardNumber);
    };

    const handleCVC = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCVC(event.target.value);
    };

    const handleValidDate = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValidDate(event.target.value);
    };

    const handleCardPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCardPassword(event.target.value);
    };

    console.log(cardNumber, CVC, validDate, cardPassword, maskedCardNumber)
    const handleSubmit = () => {
      // 유효성 검사
      if (cardNumber.length !== 19) {
        console.error('카드 번호는 19자리여야 합니다.');
        return;
      }
    
      // 유효성 검사 후 카드 정보를 서버에 보냅니다.
      PostCard.mutate({
        serialNumber: cardNumber,
        cvc: CVC,
        validDate: validDate,
        password: cardPassword
      });
    
      // 다음 페이지로 이동합니다.
      navigatePage(PATH.CARD_DETAIL);
    };

  return (
    <Background>
      <Container $border={true} $paddingTop="70px">
        <Container $padding="none">
          <Text size="subtitle1">카드 정보</Text>
          <Container $padding="none" $left={true}>
            <Wrapper $flexDirection="row" $justifyContent="start">
              <Image src={CardImg} width={13} $unit="%"></Image>
              <Text $margin="10px" size="body2">
                카드 정보를 입력 해 주세요.
              </Text>
            </Wrapper>

            <br />
            {/* TODO: 카드번호 사이에 '-' 넣기, 중간 글씨 '*'로 표시*/}
            <Text size="small1">카드번호</Text>
            <Input value={cardNumber} onChange={handleCardNumberChange}></Input>
            <Wrapper $justifyContent="space-between" $flexDirection="row">
              <Wrapper $alignItems="left">
                <Text size="small1">유효 기간</Text>
                {/* TODO: placeholder안에 글씨 작게하기 */}
                {/* TODO: 숫자 2개 입력 후 자동으로 / 나오게 하기 */}
                <Input value={validDate} onChange={handleValidDate} placeholder="MM / YY"></Input>
              </Wrapper>
              <Wrapper $alignItems="left">
                <Text size="small1">CVC</Text>
                <Input value={CVC} onChange={handleCVC} placeholder="카드 뒷면 3자리"></Input>
              </Wrapper>
            </Wrapper>
            {/* TODO: 비밀번호 type 패스워드로 해서 **로 보이게 설정 */}
            <Text size="small1">카드 비밀번호</Text>
            <Input value={cardPassword} onChange={handleCardPassword} placeholder="비밀번호 앞 2자리 숫자"></Input>

            <br />
            <Button
              onClick={handleSubmit}
              $borderRadius="10px"
              option="activated"
              size="medium"
            >
              {/*TODO:카드등록 버튼 end로 바꾸기 */}
              카드 등록
            </Button>
          </Container>
        </Container>
      </Container>
    </Background>
  );
};

export default ScanCardInfoPage;
