import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { history } from "../redux/configureStore";

import { KAKAO_AUTH_URL } from "../shared/OAuth";
import { ActionCreators as userActions } from "../redux/modules/user";
import { Grid, Input, Button } from "../elements";
import WarningText from "../components/WarningText";

import kakao from "../image/icon/ic_kakao@2x.png";
import logo from "../image/logo2.png";
import arrow from "../image/icon/ic_arrow@2x.png";

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");

  const login = () => {
    if (email === "" || password === "") {
      window.alert("아이디 혹은 비밀번호가 공란입니다! 입력해주세요!");
      return;
    }
    dispatch(userActions.loginDB(email, password));
  };

  return (
    <React.Fragment>
      <header style={{padding: "8px 16px"}}>
        <button 
          style={{
            width: "32px",
            height: "32px",
            border:"none",
            backgroundColor:"transparent",
          }}
          onClick={()=>{
              history.goBack();
          }}><img src={arrow} style={{width:"100%"}}/>
        </button>
      </header>
      <Grid margin="60px 0 0">
        {/* 플랫폼 로고 들어갈 부분 ▼*/}
        <Logo className="t_center">
          <p>나를 변화시키는 습관</p>
          <img src={logo}></img>
        </Logo>
        <Box>
          <Grid padding="0" margin="0 0 12px">
            <Input
              value={email}
              placeholder="이메일을 입력해 주세요."
              is_submit
              _onChange={(e) => {
                setemail(e.target.value);
              }}
              style={{opacity:email?"1":"0.5"}}
            />
          </Grid>
          <Grid padding="0px" margin="0 0 36px">
            <Input
              value={password}
              placeholder="비밀번호를 입력해 주세요."
              is_submit
              type="password"
              _onChange={(e) => {
                setpassword(e.target.value);
              }}
              style={{opacity:password?"1":"0.5"}}
            />            
            <WarningText/> {/* alert 문구 */}
          </Grid>        
          <Button _onClick={login}>로그인</Button>
          <Grid padding="0" margin="20px 0 0">
            <Link className="small t_center" href="/signup">회원가입</Link>
            <Link className="small t_center" href="/find">비밀번호 찾기</Link>
          </Grid>
        </Box>
        <Kakao className="t_center" href={KAKAO_AUTH_URL} target="_blank">
          카카오로 시작하기
        </Kakao>
      </Grid>
    </React.Fragment>
  );
};

const Logo = styled.div`
  img {
    width: 106px;
    margin-top: 2px;
  }
`;

const Box = styled.div`
  padding: 40px 20px 36px;
  background-color: #fff;
  border-radius: 8px;
  margin: 25px 0 93px;
`;

const Link = styled.a`
  display: inline-block;
  width: 50%;
  &:first-child {
    border-right: 1px solid #e4e5e6;
  }
`;

const Kakao = styled.a`
  display: block;
  width: 100%;
  height: 45px;
  padding: 13px 0 14px 26px;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: #000;
  border-radius: 12px;
  background-color: #fee500;
  background-image: url(${kakao});
  background-size: 20px;
  background-position: 102px;
  background-repeat: no-repeat;
  
`;

export default Login;
