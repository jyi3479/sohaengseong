import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Grid, Input, Button } from "../elements";
import { ActionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import kakao from "../image/icons/ic_kakao@2x.png";
import { KAKAO_AUTH_URL } from "../shared/OAuth";
import WarningText from "../components/WarningText";

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
      <Grid padding="0px 64px">
        {/* 플랫폼 로고 들어갈 부분 ▼*/}
        <div
          style={{
            width: "200px",
            height: "100px",
            backgroundColor: "#ccc",
            margin: "100px auto 75px",
          }}
        ></div>
        <Grid padding="0">
          <Input
            value={email}
            placeholder="이메일을 입력해 주세요."
            is_submit
            _onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </Grid>
        <Grid padding="0px" margin="0 0 20px">
          <Input
            value={password}
            placeholder="비밀번호를 입력해 주세요."
            is_submit
            type="password"
            _onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <WarningText/>
        </Grid>        
        <Button
          radius="20px"
          style={{ fontWeight: "300" }}
          _onClick={() => {
            login();
          }}
        >
          로그인
        </Button>
        <Grid padding="0" margin="18px 0 90px">
          <Link href="/find">비밀번호 찾기</Link>
          <Link href="/signup">회원가입</Link>
        </Grid>

        <Grid padding="0" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "12px", marginBottom: "9px" }}>간편 로그인</p>
          {/* target="_blank" 새창으로 열겠다는 뜻*/}
          <Kakao href={KAKAO_AUTH_URL} target="_blank">
            카카오톡으로 시작하기
          </Kakao>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Link = styled.a`
  display: inline-block;
  text-align: center;
  width: 50%;
  height: 20px;
  font-size: 12px;
  &:first-child {
    border-right: 1px solid #000;
  }
`;

const Kakao = styled.a`
  display: block;
  width: 100%;
  height: 40px;
  padding: 7px 20px 7px 48px;
  background-color: #eeeeee;
  background-image: url(${kakao});
  background-size: 28px;
  background-position: 20px;
  background-repeat: no-repeat;
  font-size: 16px;
`;

export default Login;
