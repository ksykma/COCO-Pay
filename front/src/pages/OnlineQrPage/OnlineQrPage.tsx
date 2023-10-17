import React, {useState, useEffect} from 'react';
import { QrContainer, QrWrapper } from "./OnlineQrPage.styles"
import { WhiteRoundedBox } from "@/components/atoms/WhiteRoundedBox/WhiteRoundedBox.styles"
import { Text } from '@/components/atoms/Text/Text.styles';
import { Image } from '@/components/atoms/Image/Image';
import iconQrcode from "@/assets/images/icon-qrcode.png"
import Button from '@/components/atoms/Button/Button';


const OnlineQrPage = () => {
    const [isPurchased, setIsPurchased] = useState<boolean>(false);

    useEffect(() => {
        // 로컬 스토리지의 변경을 감지하는 함수
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'isPurchased') {
                setIsPurchased(e.newValue === 'true');
            }
        };

        // 이벤트 리스너 추가
        window.addEventListener('storage', handleStorageChange);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleClosePage = () => {
        localStorage.setItem('goToComplete', 'true');
        window.close();
    }

    return (
        <QrContainer>
            <WhiteRoundedBox
                height='525px'
                $borderRadius='38px 38px 0 0'
                $padding='38px 75px 0 75px'
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Text
                    size='heading1'
                    fontWeight='bold'
                    $margin='0 0 33px 0'
                    style={{ textAlign: 'center' }}
                >
                    {isPurchased ? '결제완료' : 'QR결제'}
                </Text>

                <Text
                    size='body1'
                    fontWeight='bold'
                    style={{ textAlign: 'center' }}
                >
                    {isPurchased ? '결제완료를 누르시면' : '휴대폰으로 스캔하면'}
                </Text>

                <Text
                    size='body1'
                    fontWeight='bold'
                    $margin='0 0 24px 0'
                    style={{ textAlign: 'center' }}
                >
                    {isPurchased ? '주문 완료창으로 이동합니다.' : '결제 화면으로 이동합니다.'}
                </Text>

                <Text
                    size='small3'
                    fontWeight='regular'
                    color='grey2'
                    $margin='0 0 36px 0'
                    style={{ textAlign: 'center' }}
                >
                    {isPurchased ? '' : '스마트폰 카메라 및 모든 QR스캐너로 결제 가능'}
                </Text>
                {isPurchased ?
                    <Button
                    option='activated'
                    style={{ marginTop:"50px"}}
                    onClick={handleClosePage}
                    >
                        결제완료
                    </Button>
                    :
                    <QrWrapper>
                        <Image
                        src={iconQrcode}
                        width={210}
                        height={210}
                        $unit='px'
                        style={{ borderRadius: '20px' }}
                        />
                    </QrWrapper>
                }
            </WhiteRoundedBox>
        </QrContainer>
    );
}

export default OnlineQrPage;
