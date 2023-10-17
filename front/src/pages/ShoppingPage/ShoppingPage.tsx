import React, { useState, useEffect } from "react";
import { Image } from "@/components/atoms/Image/Image";
import imgSamsung1 from "@/assets/images/img-samsung1.png";
import imgSamsung2 from "@/assets/images/img-samsung2.png";
import imgSamsung3 from "@/assets/images/img-samsung3.png"
import imgSamsung4 from "@/assets/images/img-samsung4.png"
import imgSamsung5 from "@/assets/images/img-samsung5.png"
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IsOnlinePurchasedAtom } from "@/states/OnlineQrPageAtoms";
import { useGetIsOnlinePurchased } from "@/apis/Purchase/Queries/useGetIsPurchased";

const ShoppingPage = () => {
  const [currentImage, setCurrentImage] = useState<string>(imgSamsung1);
  const [gotoComplete, setGotoComplete] = useState<boolean>(false);
  const navigate = useNavigate();
  const IsOnlinePurchased = useGetIsOnlinePurchased();
  const [isOnlinePurchased, setIsOnlinePurchased] = useRecoilState(IsOnlinePurchasedAtom)

  useEffect(() => {
    if (isOnlinePurchased === "있음") {
      navigate("/shopping/complete");
    }
  }, [isOnlinePurchased, navigate]);

  useEffect(() => {
    setIsOnlinePurchased(IsOnlinePurchased);
  }, [IsOnlinePurchased, setIsOnlinePurchased]);

  useEffect(() => {
    // 로컬 스토리지의 변경을 감지하는 함수
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "goToComplete") {
        setGotoComplete(JSON.parse(e.newValue || "false"));
      }
    };

    // 이벤트 리스너 추가
    window.addEventListener("storage", handleStorageChange);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    console.log("goToComplete value: ", gotoComplete);
    if (gotoComplete) {
      navigate("/shopping/complete"); // ShoppingComplete 경로로 이동
    }
  }, [gotoComplete, navigate]); // gotoComplete나 navigate가 변경될 때마다 실행

  const handleImageClick = () => {
    if (currentImage === imgSamsung1) {
      setCurrentImage(imgSamsung2);
    } else if (currentImage === imgSamsung2) {
      setCurrentImage(imgSamsung3);
    } else if (currentImage === imgSamsung3) {
      setCurrentImage(imgSamsung4);
    } else if (currentImage === imgSamsung4) {
      setCurrentImage(imgSamsung5);
    } else if (currentImage === imgSamsung5) {
      window.open(
        "/pay/online/qrcode",
        "PopupName",
        "width=450,height=600,left=100,top=100"
      );
    }
  };

  return (
    <div>
      <Image
        src={currentImage}
        width={100}
        $unit="%"
        onClick={handleImageClick}
      />
    </div>
  );
};

export default ShoppingPage;
