/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useRef, useState, useEffect} from 'react';
import WebView from 'react-native-webview';
import messaging from '@react-native-firebase/messaging'; // 리액트 메시징
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {View, BackHandler} from 'react-native';
import {Text} from 'react-native';
import TouchID from 'react-native-touch-id';

import {
  WebViewErrorEvent,
  WebViewNavigationEvent,
  WebViewMessageEvent,
} from 'react-native-webview/lib/WebViewTypes';

const App = () => {
  //웹뷰와 RN과의 소통은 아래의 ref 값을 이용하여 이루어진다
  let webviewRef = useRef<any>();
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [remoteMessage, setRemoteMessage] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  // 이거 없애보기
  const optionalConfigObject = {
    title: '지문 확인', // Android
    imageColor: '#5F7DFF', // Android
    imageErrorColor: '#FA6B3C', // Android
    sensorDescription: '인증을 진행해주세요.', // Android
    sensorErrorDescription: '인증을 재시도해주세요.', // Android
    cancelText: '취소', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

  // isSupported 안에 optionalConfigObject 없애보기
  const handleBiometric = () => {
    TouchID.isSupported()
      .then(biometryType => {
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else {
          console.log('TouchID is supported.');
          if (isAuth) {
            return null;
          }
          TouchID.authenticate('', optionalConfigObject)
            .then((success: any) => {
              console.log('Success', success);
              setIsAuth(success);
              navigateToURL('https://j9b208.p.ssafy.io/onboarding'); // 원하는 URL로 변경하세요.
            })
            .catch((error: any) => {
              console.log('Error', error);
              // BackHandler.exitApp();
            });
        }
      })
      .catch(error => {
        console.log('TouchID is not supported:', error);
      });
  };

  function navigateToURL(url: any) {
    if (webviewRef.current) {
      const jsCode = `window.location.href = "${url}";`;
      webviewRef.current.injectJavaScript(jsCode);
    }
  }

  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(link => {
      console.log(link.url);
      // WebView의 URL을 동적 링크의 URL로 설정하여 웹뷰 페이지로 이동합니다.
      navigateToURL(link.url);
      console.log('hi');

      dynamicLinks()
        .getInitialLink()
        .then(link => {
          console.log('hi------------');
          if (link && webviewRef.current) {
            webviewRef.current.loadUrl(link.url);
          }
        });

      return () => unsubscribe();
    });
  }, []);

  //WebView 로딩 완료시
  const handleEndLoading = (e: WebViewNavigationEvent | WebViewErrorEvent) => {
    console.log('handleEndLoading', e);
    // 웹뷰가 로딩 완료되었을 때, 저장된 remoteMessage가 있다면 전송
    if (remoteMessage) {
      // 메시지 전송 후 remoteMessage 초기화
      setRemoteMessage(true);
    }
  };

  enum Event {
    BIO_AUTH,
  }

  /** 웹뷰에서 rn으로 값을 보낼때 거치는 함수 */
  const handleOnMessage = async (e: WebViewMessageEvent) => {
    // data에 웹뷰에서 보낸 값이 들어옵니다.
    console.log(e.nativeEvent.data);
    const messageData = e.nativeEvent.data;
    if (messageData === 'triggerBiometric') {
      handleBiometric();
    }
  };

  //FCM
  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    try {
      console.log('FCM TOKEN : + ' + fcmToken);
      setFcmToken(fcmToken);
      webviewRef.current.postMessage(fcmToken);
    } catch (e) {
      console.log(e, 'Error -------------------------------------------');
    }
  };

  // 토큰 값 가져오기 관련 로직
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      return getToken();
    }
  };

  return (
    <>
      <WebView
        onLoadEnd={handleEndLoading}
        onMessage={handleOnMessage}
        ref={webviewRef}
        source={{uri: 'https://j9b208.p.ssafy.io/'}}
      />
    </>
  );
};

export default App;
