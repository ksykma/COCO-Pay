import React, {useEffect} from "react";
import { Image } from "@/components/atoms/Image/Image";
import imgSamsungComplete from "@/assets/images/img-samsung-complete.png";


const ShoppingCompletePage = () => {

  useEffect(() => {
    // 페이지에 접근했을 때 로컬 스토리지 값을 변경
    localStorage.setItem('isPurchased', 'false');
    localStorage.setItem('goToComplete', 'false');
}, []);  // 빈 dependency 배열을 사용하여 컴포넌트가 마운트될 때만 실행

    return (
        <div>
          <Image src={imgSamsungComplete} width={100} $unit="%" />
        </div>
    );
}

export default ShoppingCompletePage;
