# 🛸 소행성 : 나를 바꾸는 습관 🛸

<img width="400" alt="스크린샷 2022-04-04 오후 8 28 48" src="https://user-images.githubusercontent.com/89513776/161534752-987d41bc-bf24-454f-82c1-acd042e628fc.png">


[소행성 바로가기🚀](https://sohangsung.co.kr/)

#### FRONTEND MEMBERS
[안진희👩‍🚀](https://github.com/aaanjini/)
[이주영👩‍🚀](https://github.com/jyi3479/)
[한태훈👩‍🚀](https://github.com/hantaehoon1/)
</br></br>

## 1️⃣ 프로젝트 설명⚡️
<pre>“나와 같은 목표로 함께할 누군가가 필요해!”

먼 미래보다 행복한 하루를 바라는 MZ세대 나아가 모든 세대들의 트렌드 ‘갓생살기’

때로는 가까운 지인이 아닌 나를 봐줄 익명의 다수가 필요한 이들을 위해 

함께할 수 있는 팀원들을 편하게 구하고, 동기부여까지 받을 수 있는 플랫폼을 기획/제작하였습니다.</pre>

<p>저희의 프로젝트가 더 궁금하신가요?⤵️</p>
[📍소행성 팀 노션](https://sohaengseong.notion.site/232e061b559f46b3a5f9b38fcfaedb2b/) </br>
[📍소행성 인스타그램](https://www.instagram.com/sohangsung.official/?hl=ko/)

</br></br>

## 2️⃣ 프로젝트 요약🌈

* 기간 :  2022.02.25 ~ 2022.04.08
* 개발 언어 : Javascript
* 개발 라이브러리 : React
* 배포 환경 : Amazon S3, CloudFront
* 협업 툴 : Git / Notion / Zeplin 

</br>

## 3️⃣ 아키텍처✨

<img src="https://apricot-tarsal-29a.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F59c621b1-4a4b-4e85-8400-ecd509294f7d%2FUntitled.png?table=block&id=fa0c9fa2-8d0b-42a8-b032-c7cda177cdb0&spaceId=758b74dd-be75-47e6-8ad5-a4133966de3f&width=2000&userId=&cache=v2"/>

</br></br>


## 4️⃣ 프로젝트 주요기능🌟
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
  - 챌린지 공유를 했을 때는 history가 없는 점을 파악해 history.length가 1 이하라면 메인으로 이동하게 처리해 사용자의 편의를 높혔습니다.


   
### ④ 멤버 전용 페이지

* 챌린지 인증
  - 실시간 인증 피드
    + 인증을 하면 경험치를 얻고, 실시간 인증 피드에 올라가게 됩니다.
    + 다른 챌린지멤버가 인증한 게시글에 댓글을 달며 소통할 수 있게 구현하였습니다
   
* 위클리 리포트
  - 멤버 페이지 메인에 있는 위클리 리포트로 챌린지 멤버가 얼마나 인증을 했는 지 알 수 있도록 그래프 형식으로 구현하였습니다.

* 실시간 채팅
  - 멤버들간에 실시간 채팅으로 챌린지에 관련된 정보를 공유할 수 있게 sockjs, stompjs 을 이용해 구현한 기능입니다.
  - 무한스크롤과 메시지 입력 시 스크롤 이동 등을 적용하여 사용자 경험을 개선하였습니다.


### ⑤ 마이페이지

* 마이페이지
  - 인증한 챌린지에는 스탬프가 찍히도록 구현하였습니다.
  - 나만의 외계인 토비
    + 사용자가 인증을 하면 오르는 경험치를 먹고 자라는 소행성의 외계인 토비, 서버와 통신하여 레벨업을 하면 토비의 모습이 변하게 구현하였습니다.

* 프로필 수정
  - 비밀번호 확인 시 디바운스를 활용하여 서버에 자동으로 비밀번호 확인을 할 수 있어 사용자의 편의성을 높혔습니다.

* 내가 개설한 챌린지 수정/삭제
  - 런칭 이후 유저피드백을 반영해 구현한 기능입니다.
  - 챌린지 멤버페이지로 이동하는 플로우가 복잡해 편의성과 접근성을 높히기 위해 개설탭에서 바로 챌린지를 수정/삭제할 수 있도록 하였습니다.

* 마이리포트
  - 그동안의 사용자의 노력을 잊지 않도록 마이 행성 > 마이리포트에서 지난 챌린지와 성공 여부를 확인할 수 있게 구성하였습니다.
  - 지난 챌린지를 클릭 할 경우 팀원들과 함께 했던 기록들이 고스란히 남아있어 사용자의 동기부여를 유도하였습니다.


### ⑥ 기타

* 닉네임 수정 기능
  - 런칭 이후 유저피드백을 반영해 구현한 기능입니다.
  - 기존에는 닉네임이 수정 불가하였지만, 카카오 사용자들의 피드백을 반영해 닉네임을 수정할 수 있도록 반영하였습니다.
  - 소셜로그인을 했을 경우 디폴트 값으로 소셜매체의 닉네임이 들어옵니다.

* 반응형 UI
  - 모바일 뷰를 가지고 있지만 다양한 기종에 호환이 가능하도록 일부 반응형을 구현하였습니다.
  - 뿐만아니라 웹에서도 단순 모바일형 UI가 아닌 프레임 밖에서도 상호작용할 수 있는 기능과 배경이미지를 활용하여 사용성을 높혔습니다.

* 알림
  - 사용자가 놓친 챌린지를 확인하고, 쌓이는 경험치를 확인할 수 있도록 알림기능을 구현하였습니다.

</br>

## 5️⃣ 기술적 목표 & 트러블 슈팅🚀

### UX 중심적 개발
<details>
  <summary>무한스크롤 구현</summary>
  
  * 도입 이유 : 플랫폼 특성 상 많은 게시물과 채팅 메시지에 대한 최적화 필요
  * 문제 상황
    - 이미지 위주의 게시물들로 인한 로딩 지연
    - 최소 2주 이상의 챌린지 기간 동안 축적될 채팅 메시지의 일괄 호출 불필요
  * 해결 방안
    - 페이지네이션으로 클릭 시 다음페이지로 이동
    - 스크롤 인식으로 다음 게시글을 호출하는 무한스크롤 방식
  * 의견 조율
    - 페이지네이션은 모바일에서 버튼 클릭에 다소 불편함이 있을 것으로 판단
    - scroll event를 사용하여 구현 시, 현재 스크롤 위치값을 계속 읽어오면서 브라우저의 Reflow를 야기하여 성능 저하가 우려됨
  * 의견 결정
    - Intersection observer API로 무한스크롤 구현 결정
    - 채팅의 경우 사용자 경험을 고려하여 밑에서 위로 무한스크롤 구현
  </details>
  
  ### 로딩 최적화
<details>
  <summary>이미지 리사이징</summary>
  
  * 도입 이유 : 이미지 위주의 카드 리스트를 보여주는 페이지가 많았기 때문에 렌더링 지연이 우려됨
  * 문제 상황
    - 페이지 진입 시 이미지 로딩이 오래 걸려서 페이지 렌더링이 늦어지는 현상 발생
    - s3 용량 문제
  * 해결 방안
    - 이미지를 압축한다.
    - 리엑트 스켈레톤 UI를 사용한다.
    - 렌더링마다 스피너를 적용한다.
  * 의견 조율
    - 2안과 3안을 적용할 정도로 긴 로딩시간이 아니라고 판단
    - 로딩 시간 개선 및 s3 용량 부담 감소 효과를 위해 이미지 압축 실행
  * 의견 결정
    - 라이브러리(browser-image-compression)를 사용하여 이미지 압축
    - 리사이징 전 대비 로딩시간 50% 
  
  </br>
  
  <img width="800" alt="스크린샷 2022-04-06 오후 8 56 36" src="https://user-images.githubusercontent.com/89513776/161969630-e3a58a1f-cfe4-476c-bf30-65d6f9f7b558.png">
  
  </details>
  
### 렌더링 최적화
<details>
  <summary>컴포넌트 최적화</summary>
  
  * 도입 이유 : 불필요한 리렌더링을 막고, 반응이 빠른 UI 성능을 제공하기 위함
  * 문제 상황
    - input element가 많은 챌린지 작성 컴포넌트에서 과도한 리렌더링 발생
  
     <img src="https://user-images.githubusercontent.com/94282246/162983041-e94dee70-1474-43ca-998a-940e0dd1834b.gif" width="250"/>
  
    - 기능별 코드 응집도가 부족함
  
     <img src="https://user-images.githubusercontent.com/94282246/162983878-d6e39157-b981-4b6e-80bf-641b0a8381e7.png" width="400"/>
     <img src="https://user-images.githubusercontent.com/94282246/162984452-945ec247-81d7-4bf0-9957-baba579aade1.png" width="400"/>
  
  * 해결 방안
    - React.memo
    - 컴포넌트 분리
    - 디자인 수정 (작성 단계별 페이지 분리)
  * 의견 조율
    - 페이지를 분리하는 것은 큰 디자인 수정이 불가피하며 사용자들에게 혼란을 줄 수 있어 어렵다고 판단
    - 모든 기능을 담아 무거워진 컴포넌트를 분리하고 자식 컴포넌트들의 불필요한 리렌더링을 방지하는 것이 필요
  * 의견 결정
    - 컴포넌트 분리 후 props 변화가 없다면 리렌더링이 되지 않도록 React.memo 적용
  <img src="https://user-images.githubusercontent.com/89513776/161964569-b7febd69-b908-46c6-b007-b758d746bd92.png" width="250"/>
  
  </details>

## 6️⃣ 피드백 개선🔥
<details>
  <summary>챌린지 수정/삭제 플로우 개선</summary>
  
  * 피드백
  <pre>내 정보에서 진행예정인 챌린지를 들어가면 행성 나가기가 보입니다.
진행중인 소행성말고 진행예정도 리스트에서 들어갔을 때 취소할 수 있으면 좋겠습니다.</pre>
  * 개선 내용
    - 원하는 기능을 원하는 곳에서 찾을 수 있도록, 마이페이지 > 개설 탭에 수정/삭제 기능 추가
  
  <img width="250" alt="image" src="https://user-images.githubusercontent.com/89513776/161965405-93b858d1-f86c-4478-9055-cbe7002fc433.png">
  
</details>
  
<details>
  <summary>챌린지 등록 페이지 작성 편의성 향상</summary>
  
  * 피드백
  <pre>개설하기 버튼이 비활성화 됐을 때 무엇을 입력 안했는지 알려주면 좋을 것 같습니다.</pre>
  * 개선 내용
    - 미입력 값이 무엇인지 사용자가 고민하지 않도록, 토스트 메시지 노출과 미입력 항목으로 스크롤 이동 및 포커싱 적용
  
  <img width="200" alt="image" src="https://user-images.githubusercontent.com/89513776/161965459-24a25ecc-e18a-4793-bca7-75ff28ff4d2e.png">
  
</details>
  
<details>
  <summary>서비스에 대한 이해 부족으로 이탈률이 높아지는 것에 대한 이슈 개선</summary>
  
  * 피드백
  <pre>전반적인 서비스에 대한 안내 및 설명이 부족합니다.</pre>
  * 개선 내용
    - 소행성을 사용자가 더 잘 사용할 수 있도록 사용자 가이드 추가
    - 메인에 후킹 요소로 배치하여 클릭 유도
  
  <img width="200" alt="image" src="https://user-images.githubusercontent.com/89513776/161965719-d8a1ae87-773f-4ee5-b702-1f432b803b1c.png">
  
  
</details>


## 7️⃣ 사이트 데모🎥

<details>
<summary>데모영상</summary>
  
|메인페이지|오늘의행성(무한스크롤 적용)|사용자가이드| 
|:---:|:---:|:---:| 
|<img src="https://user-images.githubusercontent.com/89513776/161700363-6103dccc-5145-4905-915e-6ceabeea6c24.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/89513776/161700723-a692fc85-aa15-44df-abbe-456d6b26c00b.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/89513776/161701259-8665226f-0ad8-4ac6-bbcf-ee2e547b6951.gif" width="200"/>|
|검색|카테고리|알림|
|<img src="https://user-images.githubusercontent.com/89513776/161700674-a010391b-a6a0-4407-838d-00125f8ac053.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/89513776/161700062-bea2a953-fb27-4c6b-b7d3-36c6fd5d3bfc.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/89513776/161701136-79f1089c-f483-4af1-bb98-be52601a8c09.gif" width="200"/>|
|챌린지 소개|공유기능|챌린지 등록|
|<img src="https://user-images.githubusercontent.com/89513776/161701623-a04a32ba-a091-4e2b-87da-ab8dc2ed26aa.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/89513776/161701647-d5bfd171-0acd-4964-8d01-ca861eac3292.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/89513776/161701808-de3b1a05-0ba5-40d0-a9b2-73e5e6ad4521.gif" width="200"/>|
|마이페이지|챌린지 수정|프로필수정|
|<img src="https://user-images.githubusercontent.com/89513776/161702057-f8f0ffb1-2e0a-4d67-9b9a-51e5335c1a6c.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/89513776/161702023-c3340c26-4730-4203-b033-09c686c5614f.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/89513776/161702556-198e8c61-9660-4375-b16b-17aaa6b72a1b.gif" width="200"/>|
|위클리리포트|인증 피드(+댓글)|실시간 채팅(무한스크롤 적용)|
|<img src="https://user-images.githubusercontent.com/89513776/161702625-0e6382c4-43b1-4984-863b-6d09f06da9e7.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/94282246/161708962-fb9a2949-159e-4abd-a120-5985ef76d01e.gif" width="200"/>|<img src="https://user-images.githubusercontent.com/89513776/161702194-e2c8fa0a-67d6-42e5-9fc7-407353e53be9.gif" width="200"/>|

</details>

## 8️⃣ 사용한 라이브러리(패키지)

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

