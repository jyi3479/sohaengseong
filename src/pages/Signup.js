import React, { useState } from "react";
import { Grid, Input, Button } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
const Signup = (props) => {
  const dispatch = useDispatch();
  const [email, setemail] = React.useState("");
  const [nickname, setnickname] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [passwordCheck, setpasswordCheck] = React.useState("");

  const signup = () => {
    if (email === "" || password === "" || nickname === "") {
      window.alert("아이디, 패스워드 , 닉네임을 모두 입력해주세요!");
      return;
    }
    if (password !== passwordCheck) {
      window.alert("패스워드와 패스워드 확인이 일치하지 않습니다!");
    }
    dispatch(userActions.signupDB(email, nickname, password));
  };

  const emailchk = () => {
    dispatch(userActions.emailCheck(email));
  };

  return (
    <>
      <React.Fragment>
        <Grid padding="16px">
          <p>회원가입</p>

          <Grid margin="5%" width="50%" height="10%" padding="16px 0px">
            <Input
              label="아이디"
              value={email}
              is_submit
              placeholder="이메일 아이디를 입력해주세요."
              _onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </Grid>
          <br />
          <Button width="20%" _onClick={emailchk}>
            중복확인
          </Button>

          <Grid margin="5%" width="50%" height="10%" padding="16px 0px">
            <Input
              label="닉네임"
              value={nickname}
              is_submit
              placeholder="닉네임을 입력해주세요."
              _onChange={(e) => {
                setnickname(e.target.value);
              }}
            />
          </Grid>

          <Grid margin="5%" width="50%" height="10%" padding="16px 0px">
            <Input
              type="password"
              label="비밀번호"
              value={password}
              is_submit
              placeholder="비밀번호를 입력해주세요."
              _onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </Grid>

          <Grid margin="5%" width="50%" height="10%" padding="16px 0px">
            <Input
              type="password"
              label="비밀번호 확인"
              value={passwordCheck}
              is_submit
              placeholder="비밀번호를 다시 입력해주세요."
              _onChange={(e) => {
                setpasswordCheck(e.target.value);
              }}
            />
          </Grid>
          <br />

          <Button width="50%" margin="10px" _onClick={signup}>
            회원가입하기
          </Button>
        </Grid>
      </React.Fragment>
    </>
  );
};

export default Signup;
