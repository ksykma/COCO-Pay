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
import { useRecoilState } from "recoil";
import Back from "@/components/atoms/Back/Back";
import { CardNumberAtom, CvcAtom, ValidDateAtom, CardPasswordAtom, CardIdAtom } from "@/states/CardInfoAtoms";
import theme from "@/styles/theme";

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
    const [maskedCardNumber, setMaskedCardNumber] = useRecoilState<string>(CardNumberAtom);
    const [cardNumber, setCardNumber] = useState<string>("");
    const [CVC, setCVC] = useRecoilState<string>(CvcAtom); // CVC
    const [validDate, setValidDate] = useRecoilState<string>(ValidDateAtom); // validDate
    const [cardPassword, setCardPassword] = useRecoilState<string>(CardPasswordAtom); // 카드 비밀번호

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
      const newCVCNumber = event.target.value.slice(0, 3); // 3자리까지만 유효하도록 자름
      setCVC(newCVCNumber);
    };

    const handleValidDate = (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValidDateNumber = event.target.value.replace(/\D/g, ""); // 숫자만 남기고 나머지 제거
      newValidDateNumber = newValidDateNumber.slice(0, 4); // 4자리까지만 유효하도록 자름

      const formatValidDate = (num: string) => {
        if (num.length <= 2) return num; // 2자리 이하면 그냥 반환
        return num.slice(0, 2) + '/' + num.slice(2);
      };
      
      setValidDate(formatValidDate(newValidDateNumber).slice(0, 5));
    };

    const handleCardPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = event.target.value.slice(0, 2);
      setCardPassword(newPassword);
    };

    const handleSubmit = () => {
      // 유효성 검사
      if (cardNumber.length !== 19) {
        console.error('카드 번호는 19자리여야 합니다.');
        return;
      }
      const CardData = {
        serialNumber: cardNumber,
        cvc: CVC,
        validDate: validDate,
        password: cardPassword
      }
    
      // 유효성 검사 후 카드 정보를 서버에 보냅니다.
      PostCard.mutate(CardData,{
        onSuccess: (data) => {
          navigatePage(`${PATH.CARD_DETAIL.replace(":cardId", data.userCardId.toString())}`)
        },
        onError: (error) => {
          console.error("등록 실패", error)
        }
    });
    
      // 다음 페이지로 이동합니다.
      // navigatePage(`${PATH.CARD_DETAIL.replace(":cardId", data.userCardId.toString())}`)
    };

  return (
    <Background>
      <Container $left={true} $padding="36px 26px 0 26px">
        <Back>뒤로가기</Back>
        <Container $border={false} $paddingTop="50px" $padding="none">
        <Container $padding="none">
          <Text size="body1" fontWeight="bold" style={{marginBottom: "20px"}}>카드 정보</Text>
          <Container $padding="none" $left={true}>
            <Wrapper $flexDirection="row" $justifyContent="start">
              <Image src={CardImg} width={13} $unit="%"></Image>
              <Text $margin="10px" size="body2">
                카드 정보를 입력 해주세요.
              </Text>
            </Wrapper>

            <br />
            <Text size="body2" style={{margin:"0 0 10px 5px"}}>카드번호</Text>
            <Input value={cardNumber} onChange={handleCardNumberChange}></Input>
            <Wrapper $justifyContent="space-between" $alignItems="none" $flexDirection="none">
              <Wrapper $alignItems="left" style={{width:"47%"}}>
                <Text size="body2" style={{margin:"10px 0 10px 5px"}}>유효 기간</Text>
                <Input fontSize={theme.fontSize.body2} value={validDate} onChange={handleValidDate} placeholder="MM / YY"></Input>
              </Wrapper>
              <Wrapper $alignItems="left" style={{width:"47%"}}>
                <Text size="body2" style={{margin:"10px 0 10px 5px"}}>CVC</Text>
                <Input fontSize={theme.fontSize.body2} value={CVC} onChange={handleCVC} placeholder="카드 뒷면 3자리"></Input>
              </Wrapper>
            </Wrapper>
            <Text size="body2" style={{margin:"10px 0 10px 5px"}}>카드 비밀번호</Text>
            <Input fontSize={theme.fontSize.body2} value={cardPassword} onChange={handleCardPassword} placeholder="비밀번호 앞 2자리 숫자"></Input>

            <br />
            <Button
              onClick={handleSubmit}
              $borderRadius="5px"
              option="activated"
              size="large"
            >
              {/*TODO:카드등록 버튼 end로 바꾸기 */}
              카드 등록
            </Button>
          </Container>
          </Container>
        </Container>
      </Container>
    </Background>
  );
};

export default ScanCardInfoPage;
