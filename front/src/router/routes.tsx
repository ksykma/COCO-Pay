import React from "react";
import App from "@/App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PATH } from "@/constants/path";
import SignupPage from "@/pages/SignupPage/SignupPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import PasswordSettingPage from "@/pages/PasswordSettingPage/PasswordSettingPage";
import FingerSettingPage from "@/pages/FingerSettingPage/FingerSettingPage";

import CardUploadPage from "@/pages/CardUploadPage/CardUploadPage";
import PriorityPage from "@/pages/PriorityPage/PriorityPage";
import LoginFingerPage from "@/pages/LoginFingerPage/LoginFingerPage";
import LoginPasswordPage from "@/pages/LoginPasswordPage/LoginPasswordPage";
import HomePage from "@/pages/HomePage/HomePage";
// import PayOfflinePage from "@/pages/PayOfflinePage/PayOfflinePage";
import PayOffline from "@/pages/PayOfflinePage/PayOffline";
import CardListPage from "@/pages/CardListPage/CardListPage";
import ScanPage from "@/pages/ScanPage/ScanPage";
import ScanCardInfoPage from "@/pages/ScanCardInfoPage/ScanCardInfoPage";
import CardDetailPage from "@/pages/CardDetailPage/CardDetailPage";
import CardDetailPurchasedPage from "@/pages/CardDetailPurchasedPage/CardDetailPurchasedPage";
import StatisticsPage from "@/pages/StatisticsPage/StatisticsPage";
import MyPage from "@/pages/Mypage/MyPage";
import MypageWithdrawalPage from "@/pages/MyPageWithdrawalPage/MyPageWithdrawalPage";
import PayOnlinePage from "@/pages/PayOnlinePage/PayOnlinePage";
import PayOnlineCompletePage from "@/pages/PayOnlineCompletePage/PayOnlineCompletePage";
import MainPage from "@/pages/MainPage/MainPage";
import QrCameraPage from "@/pages/QrCameraPage/QrCameraPage";
// import PayOfflineCompletePage from "@/pages/PayOfflinePage/PayOfflineCompletePage";
import OnboardingPage from "@/pages/OnboardingPage/OnboardingPage";

// import OnboardingPage1 from "@/pages/OnboardingPage/OnboardingPage1";
// import OnboardingPage2 from "@/pages/OnboardingPage/OnboardingPage2";
// import OnboardingPage3 from "@/pages/OnboardingPage/OnboardingPage3";
// import OnboardingPage4 from "@/pages/OnboardingPage/OnboardingPage4";
// import OnboardingPage5 from "@/pages/OnboardingPage/OnboardingPage5";
import ShoppingPage from "@/pages/ShoppingPage/ShoppingPage";
import OnlineQrPage from "@/pages/OnlineQrPage/OnlineQrPage";
import ShoppingCompletePage from "@/pages/ShoppingCompletePage/ShoppingCompletePage";
import TestPage from "@/pages/TestPage/TestPage";

const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: PATH.SIGNUP,
    element: <SignupPage />,
  },
  {
    path: PATH.PASSWORD_SETTING,
    element: <PasswordSettingPage />,
  },
  {
    path: PATH.FIGNER_SETTING,
    element: <FingerSettingPage />,
  },
  {
    path: PATH.Onboarding,
    element: <OnboardingPage />,
  },
  {
    path: PATH.CARDUPLOAD,
    element: <CardUploadPage />,
  },
  {
    path: PATH.PRIORITY,
    element: <PriorityPage />,
  },
  {
    path: PATH.LOGIN_FINGER,
    element: <LoginFingerPage />,
  },
  {
    path: PATH.LOGIN_PASSWORD,
    element: <LoginPasswordPage />,
  },
  {
    path: PATH.MAIN,
    element: <MainPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: PATH.CARDLIST,
        element: <CardListPage />,
      },
      {
        path: PATH.QRCAMERA,
        element: <QrCameraPage />,
      },
      {
        path: PATH.SCAN_CARDINFO,
        element: <ScanCardInfoPage />,
      },
      {
        path: PATH.STATISTICS,
        element: <StatisticsPage />,
      },
      {
        path: PATH.CARD_DETAIL,
        element: <CardDetailPage />,
      },
      {
        path: PATH.CARD_DETAIL_PURCHASED,
        element: <CardDetailPurchasedPage />,
      },
      {
        path: PATH.MYPAGE,
        element: <MyPage />,
      },
    ],
  },
  // {
  //   path: PATH.HOME,
  //   element: <HomePage />,
  // },
  {
    //TODO: 둘이 한 페이지로 묶어서 3초뒤에 페이지만 넘어갈 수 있도록 만들기
    path: PATH.PAYOFFLINE,
    // element: <PayOfflinePage />,
    // element: <PayOfflineCompletePage />,
    element: <PayOffline />,
  },
  // {
  //   path: PATH.CARDLIST,
  //   element: <CardListPage />,
  // },
  {
    path: PATH.SCAN,
    element: <ScanPage />,
  },
  // {
  //   path: PATH.SCAN_CARDINFO,
  //   element: <ScanCardInfoPage />,
  // },
  // {
  //   path: PATH.CARD_DETAIL,
  //   element: <CardDetailPage />,
  // },
  // {
  //   path: PATH.CARD_DETAIL_PURCHASED,
  //   element: <CardDetailPurchasedPage />,
  // },
  // {
  //   path: PATH.STATISTICS,
  //   element: <StatisticsPage />,
  // },
  // {
  //   path: PATH.MYPAGE,
  //   element: <MyPage />,
  // },
  {
    path: PATH.MYPAGE_WITHDRAWAL,
    element: <MypageWithdrawalPage />,
  },
  {
    path: PATH.PAYONLINE,
    element: <PayOnlinePage />,
  },
  {
    path: PATH.PAYONLINECOMPLETE,
    element: <PayOnlineCompletePage />,
  },
  {
    path: PATH.SHOPPING,
    element: <ShoppingPage />,
  },
  {
    path: PATH.ONLINEQR,
    element: <OnlineQrPage />,
  },
  {
    path: PATH.SHOPPING_COMPLETE,
    element: <ShoppingCompletePage />,
  },
  {
    path: PATH.TEST,
    element: <TestPage />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
