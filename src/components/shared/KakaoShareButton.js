import React, { useEffect } from 'react'
import styled from 'styled-components'
import kakaoIcon from '../../image/icon/ic_kakao@2x.png'
import logo from '../../image/logo_xl@2x.png'

const KakaoShareButton = () => {

  //렌더링 될 때마다 불러오기
  useEffect(() => {
    createKakaoButton()
  }, [])


  const createKakaoButton = () => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능
    if (window.Kakao) {
      const kakao = window.Kakao;

      //공유 주소
      const siteUrl = "https://www.sohangsung.co.kr/";

      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init("177378354cec5f3729e84d1d90edb8f4");
      }

      kakao.Link.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: '#kakao-link-btn',
        objectType: 'feed',
        content: {
          title: '소행성 : 나를 변화시키는 습관',
          description: '동기부여가 가득한 습관형성 플랫폼 소행성으로 놀러오세요!',
          imageUrl: logo,
          link: {
            mobileWebUrl: siteUrl,
            webUrl: siteUrl,
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: siteUrl,
              webUrl: siteUrl,
            },
          },
        ],
      })
    }
  }
  return (
    <KaKaoWrap className="kakao-share-button">
      {/* Kakao share button */}
      <button id="kakao-link-btn">
        <img src={kakaoIcon} alt="kakao-share-icon"/>
      </button>
    </KaKaoWrap>
  )
}

const KaKaoWrap = styled.div`
  button {
    background-color: #fee500;
    img {
      width: 30px;
    }
  }
`;


export default KakaoShareButton;