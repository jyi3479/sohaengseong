# 소행성 : 나를 바꾸는 습관 🛸

<a harf="https://sohangsung.co.kr/" target="_blank"><img width="651" alt="스크린샷 2022-04-04 오후 8 28 48" src="https://user-images.githubusercontent.com/89513776/161534752-987d41bc-bf24-454f-82c1-acd042e628fc.png"></a>


## 1️⃣ 프로젝트 요약

* 기간 :  2022.02.25 ~ 2022.04.08
* 개발 언어 : Javascript
* 개발 라이브러리 : React
* 배포 환경 : Amazon S3, CloudFront
* 협업 툴 : Git / Notion / Zeplin 

</br></br>


## 2️⃣ 프로젝트 설명
<pre>“나와 같은 목표로 함께할 누군가가 필요해!”

먼 미래보다 행복한 하루를 바라는 MZ세대 나아가 모든 세대들의 트렌드 ‘갓생살기’

때로는 가까운 지인이 아닌 나를 봐줄 익명의 다수가 필요한 이들을 위해 

함께할 수 있는 팀원들을 편하게 구하고, 동기부여까지 받을 수 있는 플랫폼을 기획/제작하였습니다.</pre>

<p>저희의 프로젝트가 더 궁금하신가요?⤵️</p>
[소행성 팀 노션 📍](https://sohaengseong.notion.site/232e061b559f46b3a5f9b38fcfaedb2b) </br>
[소행성 인스타그램 📍](https://www.instagram.com/sohangsung.official/?hl=ko)

</br></br>



## 3️⃣ 아키텍처

<img src="https://apricot-tarsal-29a.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F59c621b1-4a4b-4e85-8400-ecd509294f7d%2FUntitled.png?table=block&id=fa0c9fa2-8d0b-42a8-b032-c7cda177cdb0&spaceId=758b74dd-be75-47e6-8ad5-a4133966de3f&width=2000&userId=&cache=v2"/>

</br></br>


## 4️⃣ 프로젝트 주요기능
### ⓞ 주요 기능
* 로그인, 회원가입, 소셜로그인
* 기록 : 마이 리포트 
* 소통 : 레벨업/마이 행성(캐릭터)  
* 보상 : 랭킹 / 채팅


### ① 로그인, 회원가입, 소셜로그인
* axios와 axios-interceptors 를 통한 서버와 api 요청
* 회원가입 시 이메일 인증 메일을 통해 이메일 확인
* 카카오톡 api를 이용한 소셜로그인

### ② 기록
* 마이리포트
  - 그동안의 사용자의 노력을 잊지 않도록 마이 행성 > 마이리포트에서 지난 챌린지와 성공 여부를 확인할 수 있게 구성하였습니다.
  - 지난 챌린지를 클릭 할 경우 팀원들과 함께 했던 기록들이 고스란히 남아있어요 

### ③ 소통
### ④ 보상

</br></br>

## 5️⃣ 트러블 슈팅



## 6️⃣ 사용한 라이브러리(패키지)

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


</br></br>



