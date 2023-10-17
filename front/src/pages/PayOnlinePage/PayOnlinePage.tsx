import React, { useState } from "react";
import PayOnlinePage1 from "./PayOnlinePage1"
import PayOnlinePage2 from "./PayOnlinePage2"
import PayOnlinePage3 from "./PayOnlinePage3"

function PayOnlinePage() {
  
  const [activatedNum, setActivatedNum] = useState<keyof typeof PayOnlinePages>(1);


  const handleNextPage = () => {
    if (activatedNum < 3) {
      setActivatedNum((prevNum) => prevNum + 1 as keyof typeof PayOnlinePages);
    } else if (activatedNum === 3) {
      setActivatedNum(3 as keyof typeof PayOnlinePages);
    }
  };
  


  const PayOnlinePages = {
    1: <PayOnlinePage1 onNextPage={handleNextPage} />,
    2: <PayOnlinePage2 onNextPage={handleNextPage} />,
    3: <PayOnlinePage3 onNextPage={handleNextPage} />,
  };
  return (
    <div>
      {PayOnlinePages[activatedNum]}
    </div>
  );
}

export default PayOnlinePage;
