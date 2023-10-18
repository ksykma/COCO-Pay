# 코코페이

#### 한 줄 소개: 사용자가 보유한 모든 카드들의 혜택과 실적을 고려하여 카드를 추천해주고, 추천 받은 최적의 카드로 결제를 해주는 “카드 오토체인징 페이먼츠 시스템”

진행 기간: 2023/08/28 → 2023/10/05

담당 Skills & 사용 Libraries: HTML/CSS, React, React-Query, Recoil, TypeScript, 아토믹디자인시스템

팀 구성: Backend 3명, Frontend3명

### 🔗Link

**Source**

[https://github.com/ksykma/COCO-Pay](https://github.com/ksykma/COCO-Pay)

## 🏆삼성 청년 SW아카데미 9th 특화프로젝트 최우수상(1위)🏆

## 📑 프로젝트 소개

### ✅ **서비스 목적**

사용자가 카드의 혜택을 보다 더 쉽고 편하게 활용할 수 있도록 자동으로 카드 추천 및 결제 기능을 제공

### ✅ **기획 의도 및 배경**

**: 고객에게 최적의 카드를 추천, 결제를 도와 현명한 소비를 돕자!**

**[문제 제기 1]**

결제 시 제품에 따른 결제 카드들의 혜택, 실적이 모두 다른데 이 모든 것들을 파악하고 다니는 것이 쉽지 않음

**[문제 제기 2]**

결제를 진행할 때 마다 미리 할인 혜택을 알아보는 것이 귀찮기도 하고, 결제 직전에 주섬주섬 적합한 카드를 찾는 민망한 상황이 연출 되기도 함

**[솔루션 도출]** 

내가 보유한 카드들의 할인율과 실적을 비교해 가장 최적의 카드를 골라 결제할 수 있는 오토체인징 페이 서비스가 필요하다는 결론에 이름

### ✅ 자료 조사를 위한 설문조사 진행

기간 : 2023.09.04~ 2023.09.06 (3일간 진행)

**[결과]**

![Alt text](/Image/스크린샷%202023-10-16%20오후%209.46.36.png)
![Alt text](/Image/스크린샷%202023-10-16%20오후%209.46.57.png)
![Alt text](/Image/스크린샷%202023-10-16%20오후%209.47.15.png)
![Alt text](/Image/스크린샷%202023-10-16%20오후%209.47.49.png)
![Alt text](/Image/스크린샷%202023-10-16%20오후%209.49.15.png)
![Alt text](/Image/스크린샷%202023-10-16%20오후%209.49.38.png)
![Alt text](/Image/스크린샷%202023-10-16%20오후%209.50.10.png)

## 📖 프로젝트 상세

<aside>
삼성 소프트웨어 아카데미에서 진행한 두 번째 프로젝트입니다. 코코페이는 사용자가 보유한 모든 카드들의 혜택과 실적을 고려하여 최적의 카드를 추천 및 결제 해주는 **“카드 오토체인징 페이먼츠 시스템”** 입니다.  평소 카드를 사용하며 불편했던 경험들을 생각해보다가 카드 혜택을 쉽게 챙길 수 있으면 좋지 않을까 하는 아이디어에서 시작되었습니다.

</aside>

### ✅ 주요 기능

![Alt text](</Image/오프라인 결제.png>)

![Alt text](</Image/온라인 결제.png>)

![Alt text](/Image/%EC%9A%B0%EC%84%A0%EC%88%9C%EC%9C%84.png)

### ✅ 그 외의 기능들

![Alt text](</Image/본인인증 문자인증.png>)

![Alt text](</Image/지문인식 로그인.png>)

![Alt text](</Image/카드목록 및 삭제.png>)

![Alt text](</Image/카드 상세.png>)

![Alt text](</Image/카드 결제내역 상세.png>)

![Alt text](/Image/%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80.png)

### ✅ 아키텍쳐

![Alt text](/Image/%EC%95%84%ED%82%A4%ED%83%9D%EC%B3%90.JPG)

## 📚 산출물(ERD, 명세서, 파일구조)

### ERD (back, cocopay)

![Alt text](</Image/스크린샷 2023-10-16 오후 9.10.28.png>)

![Alt text](</Image/스크린샷 2023-10-16 오후 9.10.28-1.png>)

은행 API를 활용할 수 없는 환경이었기 때문에 은행 db를 직접 구현하여 결제 기능을 구현하였음

### **명세서**

- **요구사항, 기능 명세서**

    https://www.notion.so/922db08d09724288b2f8ac562a70bd59?pvs=4
    
- **API 명세서**
    
    coco pay : [https://documenter.getpostman.com/view/23655032/2s9YC8wWWE](https://documenter.getpostman.com/view/23655032/2s9YC8wWWE)
    
    bank : [https://documenter.getpostman.com/view/23655032/2s9YBxZG3t](https://documenter.getpostman.com/view/23655032/2s9YBxZG3t)
    

## 🛠️ 사용 기술 및 라이브러리

![Alt text](</Image/기술 스택.png>)

- Back-End : MySql, Spring boot, Amazon S3
- Front-End : **React, TypeScript, Recoil,** React Native
- Deploy : Docker, Jenkins, **Git**
- Tools : IntelliJ, **Visual Studio Code, Notion, [Figma](https://www.figma.com/file/4Tt3Zha29s5If3pGRaU1BN/%5BSSAFY-%ED%8A%B9%ED%99%94%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%5D-%ED%8C%94%EB%94%B1%ED%8C%94%EB%94%B1?type=design&node-id=0-1&mode=design&t=iGzO4Z15yCxjTbDo-0)**
- Os : Mac OS, Windows 10

## 📱 담당한 기능 (Frontend)

- UI&UX 설계
- **오프라인 결제** 기능 구현
- **온라인 결제** 화면 및 기능 구현
- **우선순위** 화면 구현
- **카드목록** 화면 및 기능 구현
- **카드 상세** 화면 및 기능 구현
- **마이페이지** 화면 및 기능 구현
- **온라인 쇼핑몰** 화면 구현

## 💡 깨달은 점

- **Github PR, 컨벤션** 등을 적극적으로 활용함.
- **아토믹 디자인 시스템**을 활용함으로써 **코드 재 사용성**을 정말 많이 높일 수 있음.
- 회의와 **소통의 중요성**을 깨달음 → 아무리 열심히 회의해도 서로 생각하는 것이 다를 수 있음!
- **React-Query**를 활용함으로써 **API 호출을 간단하게** 작성할 수 있음 → 기존에는 aixos 활용