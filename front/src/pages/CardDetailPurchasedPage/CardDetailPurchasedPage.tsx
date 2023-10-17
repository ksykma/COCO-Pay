import { Background } from "@/components/atoms/Background/Background.styles";
import React, {useState, useEffect} from "react"
import { Text } from "@/components/atoms/Text/Text.styles"
import { Image } from "@/components/atoms/Image/Image"
import iconArrowLeftBlack from "@/assets/images/icon-arrow-left-black.png"
import { PurchasedWrapper, Hr } from "./CardDetailPurchasedPage.styles"
import { WhiteRoundedBox } from "@/components/atoms/WhiteRoundedBox/WhiteRoundedBox.styles"
import Calendar from "@/components/molecules/Calendar/Calendar"
import CardHistory from "@/components/molecules/CardHistory/CardHistory"
import PaymentList from "@/components/molecules/PaymentList/PaymentList"
import Modal from "@/components/atoms/Modal/Modal";
import { ModalBg } from "@/components/atoms/Modal/Modal.styles";
import Button from "@/components/atoms/Button/Button";
import { Wrapper } from "@/components/atoms/Wrapper/Wrapper.styles"
import theme from "@/styles/theme";
import { CardHistoryLists } from "@/types/card";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { usePostCardPurchased } from "@/apis/Card/Mutations/useAddCardList";
import { useRecoilValue, useRecoilState } from "recoil";
import { CardDetailIdAtom, CardDetailMonthAtom } from "@/states/CardDetailAtoms";

const CardDetailPurchasedPage = () => {
    const navigate = useNavigate();
    const [cardPurchasedData, setCardPurchasedData] = useState({
        amount: 0,
        discountAmount: 0,
        cardHistoryList: []
    });
    const CardPurchased = usePostCardPurchased()
    const [month, setMonth] = useRecoilState(CardDetailMonthAtom)
    const cardid = useRecoilValue(CardDetailIdAtom)
    const date = new Date();

    const handleMonthMinus = () => {
        setMonth((prev) => prev - 1);
    };

    const handleMonthPlus = () => {
        if (month < date.getMonth() + 1) {
          setMonth((prev) => prev + 1);
        }
      };    

    const handleMonthChange = (newmonth:number) => {
        setMonth(newmonth)
      }

    // 결제내역 가져오기
    useEffect(() => {
        const handleCardPurchased = () => {
        const payload = {
            cardId: cardid,
            month: month.toString()
        };
        CardPurchased.mutate(payload, {
            onSuccess: (data) => {
                setCardPurchasedData(data);
            },
            onError: (error) => {
                console.log('작성 실패', error);
            },
        });
        }
        handleCardPurchased()
    }, [setCardPurchasedData, setMonth, month]);

    return (
        <Background
        $colormode="gradient"
        style={{
            padding: "40px 24px"
        }}
        >
            <PurchasedWrapper>
                <Image
                onClick={() => navigate(-1)}
                src={iconArrowLeftBlack}
                height={24}
                width={24}
                $unit="px"
                >
                </Image>
                <Text
                size="body2"
                fontWeight="bold"
                color="black1"
                >
                    카드 결제내역 상세
                </Text>
            </PurchasedWrapper>
            <WhiteRoundedBox
            style={{minHeight:"660px"}}
            $padding="24px 36px"
            $borderRadius="20px"
            $boxShadow="shadow1"
            $margin="30px 0"
            >
            <Calendar month={month} minusmonth={handleMonthMinus} plusmonth={handleMonthPlus} changemonth={handleMonthChange}/>
            {cardPurchasedData && <CardHistory CardAmount={cardPurchasedData} />}
            <Text
            size="small3"
            fontWeight="light"
            color="grey1"
            $margin="0 0 8px 0"
            >
                최근 결제
            </Text>
            <Hr />
            {
                cardPurchasedData.cardHistoryList.length > 0 &&
                cardPurchasedData.cardHistoryList.map((item: CardHistoryLists, idx: number) => (
                <PaymentList key={idx} CardHistory={item} />
            ))}
            </WhiteRoundedBox>
        </Background>
    )
}

export default CardDetailPurchasedPage;
