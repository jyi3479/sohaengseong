# 🛸 소행성 : 나를 바꾸는 습관 🛸

<img width="651" alt="스크린샷 2022-04-04 오후 8 28 48" src="https://user-images.githubusercontent.com/89513776/161534752-987d41bc-bf24-454f-82c1-acd042e628fc.png">


[소행성 바로가기🚀](https://sohangsung.co.kr/)

#### FRONTEND MEMBERS
[안진희👩‍🚀](https://github.com/aaanjini/)
[이주영👩‍🚀](https://github.com/jyi3479/)
[한태훈👩‍🚀](https://github.com/hantaehoon1/)


## 1️⃣ 프로젝트 설명
<pre>“나와 같은 목표로 함께할 누군가가 필요해!”

먼 미래보다 행복한 하루를 바라는 MZ세대 나아가 모든 세대들의 트렌드 ‘갓생살기’

때로는 가까운 지인이 아닌 나를 봐줄 익명의 다수가 필요한 이들을 위해 

함께할 수 있는 팀원들을 편하게 구하고, 동기부여까지 받을 수 있는 플랫폼을 기획/제작하였습니다.</pre>

<p>저희의 프로젝트가 더 궁금하신가요?⤵️</p>
[📍소행성 팀 노션](https://sohaengseong.notion.site/232e061b559f46b3a5f9b38fcfaedb2b/) </br>
[📍소행성 인스타그램](https://www.instagram.com/sohangsung.official/?hl=ko/)

</br>

## 2️⃣ 프로젝트 요약

* 기간 :  2022.02.25 ~ 2022.04.08
* 개발 언어 : Javascript
* 개발 라이브러리 : React
* 배포 환경 : Amazon S3, CloudFront
* 협업 툴 : Git / Notion / Zeplin 

</br>

## 3️⃣ 아키텍처

<img src="https://apricot-tarsal-29a.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F59c621b1-4a4b-4e85-8400-ecd509294f7d%2FUntitled.png?table=block&id=fa0c9fa2-8d0b-42a8-b032-c7cda177cdb0&spaceId=758b74dd-be75-47e6-8ad5-a4133966de3f&width=2000&userId=&cache=v2"/>

</br></br>


## 4️⃣ 프로젝트 주요기능
### ⓞ 주요 기능
* 로그인, 회원가입, 소셜로그인
* 검색
* 기록 : 마이 리포트 
* 소통 : 레벨업/마이 행성(캐릭터)  
* 보상 : 랭킹 / 채팅


### ① 로그인, 회원가입, 소셜로그인
* axios와 axios-interceptors 를 통한 서버와 api 요청
* 회원가입 시 이메일 인증 메일을 통해 이메일 확인
* 카카오톡 api를 이용한 소셜로그인

### ② 검색
> 검색기능을 이용해 많은 카테고리중에서 원하는 챌린지를 찾을 수 있도록 구현하였고, 
  디바운스를 이용해 검색 버튼을 클릭하지 않아도 서버와 통신해 검색결과를 볼 수 있게 타이핑과 클릭을 최소화하여 사용성을 높이는데 초점을 맞춰서 개발했습니다. 사용자가 좀 더 검색기능을 알차게 활용할 수 있도록 추천 검색어도 기능도 구현하였습니다.

* 검색 + 카테고리 탭
  - 챌린지를 검색하면 자동으로 전체 탭에서 검색결과 리스트가 노출되고, 검색어가 없으면 전체 리스트를 볼 수 있게 구현하였습니다.
  - 검색결과가 없다면 챌린지 등록을 할 수 있는 버튼을 노출시켜 자연스럽게 챌린지 등록을 유도하였습니다.
  - 검색 인풋이 포커스되면 추천검색어를 띄워줘 사용자가 검색 기능을 효율적이고 빠르게 이용할 수 있게 구현하였습니다.

* 페이징
  - 많은 챌린지를 한 번에 불러오는 페이지인만큼 사용자가 렌더링 시간을 기다리지 않도록 화면 끝에 스크롤이 닿으면 다음 챌린지들을 불러오는 무한스크롤을 구현하였습니다.
 

### ③ 챌린지

* 챌린지 등록/수정
  - 챌린지를 등록할 때 값을 미입력한 뒤 등록하기를 누르면 토스트 메시지와 스크롤 포커싱이 되도록 구현하여 편의성을 높혔습니다.
  - 이미지를 한 번에 3개씩 등록할 수 있게 for문을 이용해 사용자가 업로드한 이미지 파일을 image 배열안에 넣어주도록 구현하였습니다.

* 챌린지 소개페이지
  - 사용자가 업로드한 이미지를 슬라이드 형식으로 볼 수 있게 구현하였습니다.
  - react-share 와 카카오 api를 통해 챌린지 공유 기능을 구현하였습니다.
  - dayjs를 이용해 챌린지 기간을 자동으로 계산하고, 계산한 기간으로 조건문을 걸어 버튼 예외처리(입장가능,불가능,이미입장..)를 하였습니다.
  - 챌린지 공유를 했을 때는 history가 없는 점을 파악해 history.length가 0이라면 메인으로 이동하게 처리해 사용자의 편의를 높혔습니다.


   
### ④ 멤버 전용 페이지

* 챌린지 인증
  - 실시간 인증 피드
    + 인증을 하면 경험치를 얻고, 실시간 인증 피드에 올라가게 됩니다.
    + 다른 챌린지멤버가 인증한 게시글에 댓글을 달며 소통할 수 있게 구현하였습니다
   
* 위클리 리포트
  - 멤버 페이지 메인에 있는 위클리 리포트로 챌린지 멤버가 얼마나 인증을 했는 지 알 수 있도록 그래프 형식으로 구현하였습니다.

* 실시간 채팅
  - 멤버들간에 실시간 채팅으로 챌린지에 관련된 정보를 공유할 수 있게 sockjs, stompjs 을 이용해 구현한 기능입니다.


### ⑤ 마이페이지

* 마이페이지
  - 인증한 챌린지에는 스탬프가 찍히도록 구현하였습니다.
  - 나만의 외계인 토비
    + 사용자가 인증을 하면 오르는 경험치를 먹고 자라는 소행성의 외계인 토비, 서버와 통신하여 레벨업을 하면 토비의 모습이 변하게 구현하였습니다.

* 내가 개설한 챌린지 수정/삭제
  - 런칭 이후 유저피드백을 반영해 구현한 기능입니다.
  - 챌린지 멤버페이지로 이동하는 플로우가 복잡해 편의성과 접근성을 높히기 위해 개설탭에서 바로 챌린지를 수정/삭제할 수 있도록 하였습니다.

* 마이리포트
  - 그동안의 사용자의 노력을 잊지 않도록 마이 행성 > 마이리포트에서 지난 챌린지와 성공 여부를 확인할 수 있게 구성하였습니다.
  - 지난 챌린지를 클릭 할 경우 팀원들과 함께 했던 기록들이 고스란히 남아있어 사용자의 동기부여를 유도하였습니다.


### ⑥ 기타

* 닉네임 수정 기능
  -  런칭 이후 유저피드백을 반영해 구현한 기능입니다.
  - 기존에는 닉네임이 수정 불가하였지만, 카카오 사용자들의 피드백을 반영해 닉네임을 수정할 수 있도록 반영하였습니다.
  - 소셜로그인을 했을 경우 디폴트 값으로 소셜매체의 닉네임이 들어옵니다.

* 반응형 UI
  - 모바일 뷰를 가지고 있지만 다양한 기종에 호환이 가능하도록 일부 반응형을 구현하였습니다.
  - 뿐만아니라 웹에서도 단순 모바일형 UI가 아닌 프레임 밖에서도 상호작용할 수 있는 기능과 배경이미지를 활용하여 사용성을 높혔습니다.

</br>

## 5️⃣ 트러블 슈팅

## 6️⃣ 데모🎥
|메인페이지|오늘의행성|사용자가이드| 
|:---:|:---:|:---:| 
|<img src="https://user-images.githubusercontent.com/89513776/161700363-6103dccc-5145-4905-915e-6ceabeea6c24.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/89513776/161700723-a692fc85-aa15-44df-abbe-456d6b26c00b.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/89513776/161701259-8665226f-0ad8-4ac6-bbcf-ee2e547b6951.gif" width="200"/>|
|검색|카테고리|알림| 
|:---:|:---:|:---:| 
|<img src="https://user-images.githubusercontent.com/89513776/161700674-a010391b-a6a0-4407-838d-00125f8ac053.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/89513776/161700062-bea2a953-fb27-4c6b-b7d3-36c6fd5d3bfc.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/89513776/161701136-79f1089c-f483-4af1-bb98-be52601a8c09.gif" width="200"/>|
|챌린지 소개|공유기능|챌린지 등록| 
|:---:|:---:|:---:| 
|<img src="https://user-images.githubusercontent.com/89513776/161701623-a04a32ba-a091-4e2b-87da-ab8dc2ed26aa.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/89513776/161701647-d5bfd171-0acd-4964-8d01-ca861eac3292.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/89513776/161701808-de3b1a05-0ba5-40d0-a9b2-73e5e6ad4521.gif" width="200"/>|
|마이페이지|챌린지 수정|프로필수정| 
|:---:|:---:|:---:| 
|<img src="https://user-images.githubusercontent.com/89513776/161702057-f8f0ffb1-2e0a-4d67-9b9a-51e5335c1a6c.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/89513776/161702023-c3340c26-4730-4203-b033-09c686c5614f.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/89513776/161702556-198e8c61-9660-4375-b16b-17aaa6b72a1b.gif" width="200"/>|
|위클리리포트|인증 피드|실시간 채팅| 
|:---:|:---:|:---:| 
|<img src="https://user-images.githubusercontent.com/89513776/161702625-0e6382c4-43b1-4984-863b-6d09f06da9e7.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/89513776/161702750-c9d482b8-77e8-43a3-bd20-6b1b673474e6.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/89513776/161702194-e2c8fa0a-67d6-42e5-9fc7-407353e53be9.gif" width="200"/>|

## 7️⃣ 사용한 라이브러리(패키지)

|라이브러리명|내용|참고| 
|:---|:---|:---| 
|axios|서버통신|| 
|redux|상태관리||
|lodash|디바운스 쓰로틀링을 사용한 검색 로직 구현||
|createAyncThunk|미들웨어||
|history|history 동기화||
|styled-component|컴포넌트 스타일링||
|material-ui|달력 elements||
|swiper|이미지 슬라이더||
|react-code-input|비밀번호 입력 인풋 커스텀||
|react-copy-to-clipboard|URL 복사||
|react-share|sns 공유 기능|페이스북, 라인, 트위터|
|moment, dayjs|시간 핸들링||
|simplebar-react|스크롤바 커스텀||
|sockjs-client|소켓 통신|실시간 채팅|
|stompjs|소켓 통신|실시간 채팅|
|browser-image-compression|이미지 리사이징||

