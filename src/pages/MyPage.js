import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button } from "../elements";
import { actionCreators as baseAction } from "../redux/modules/base";
import {ActionCreators as userActions} from "../redux/modules/user";
import MyChallenge from "../components/MyChallenge";
import MyLevel from "../components/MyLevel";

import arrow from "../image/icons/small_arrow.png";
import insta from "../image/icon/ic_insta@2x.png";
import notion from "../image/icon/ic_notion@2x.png";

const MyPage = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.user)
  const logout = () => {
    dispatch(userActions.logOutAction(userInfo.userId));
  };

  React.useEffect(() => {
    dispatch(baseAction.setHeader("마이행성", false,true));
  }, []);


  return (
    <Grid margin="48px 0px 64px" padding="0px" style={{position:"relative"}}>
      <MyLevel />
      <Container>
        <MyChallenge />
      </Container>
      <LinkBox>
        <p className="small sub_color">저희 팀을 소개합니다!</p>
        <div className="links mt12">
          <div onClick={() => window.open('https://sohaengseong.notion.site/232e061b559f46b3a5f9b38fcfaedb2b', '_blank')} >
            <img src={notion}/>
            <p>팀 소개 페이지 바로가기</p>
          </div>
          <div onClick={() => window.open('https://www.instagram.com/sohangsung.official/?hl=ko', '_blank')} >
            <img src={insta}/>
            <p>인스타그램으로 바로가기</p>
          </div>
        </div>
      </LinkBox>
      <Grid margin="0 20px 24px" padding="36px 0 0" width="calc(100% - 40px)" style={{borderTop:"1px solid #e4e5e6"}}>
        <Button line_btn onClick={logout}>로그아웃</Button>
      </Grid>
    </Grid>
  );
};

const Container = styled.div`
  padding: 24px 20px 0;
  
`;

const LinkBox = styled.div`
  padding: 0 20px;
  margin-bottom: 28px;
 .links {
  background-color: #fff;
  border-radius: 8px;  
  padding: 0 20px;
  >div {
    display: flex;
    align-items: center;
    padding: 16px 0;
    background-image: url(${arrow});
    background-size: 19px;
    background-position: right top 22px;
    cursor: pointer;
    img {
      width: 32px;
    }
    p {
      margin-left: 18px;
    }
    &:first-child {
      border-bottom: 1px solid #e4e5e6;
    }
  }
 }
`;

export default MyPage;
