import React, {useState} from "react"
import {Grid, Input, Button} from "../elements"
import {useDispatch, useSelector} from 'react-redux'
import * as baseAction from '../redux/modules/base';
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

  const nicknameCheck = () => {
    dispatch(userActions.nicknameCheck(nickname));
  }

  React.useEffect(() => {
    dispatch(baseAction.setHeader(true,"회원가입"));
    dispatch(baseAction.setGnb(false));
    return()=>{
        dispatch(baseAction.setHeader(false,""));
        dispatch(baseAction.setGnb(true));
    }
  }, [])

    return (     
      <Grid padding="0 40px" margin="113px 0 0">
        <Grid padding="0" margin="0 0 17px">
          <Input
            double
            label="이메일"
            value={email}
            is_submit
            placeholder="이메일을 입력해 주세요."
            _onChange={(e) => {
              setemail(e.target.value);
            }}
            btnClick={emailchk}
            style={{width:"calc(100% - 50px)"}}
          />
        </Grid>
        <Grid padding="0" margin="0 0 17px">
          <Input
            double
            label="닉네임"
            value={nickname}
            is_submit
            placeholder="닉네임을 입력해 주세요."
            btnClick={nicknameCheck}
            _onChange={(e) => {
              setnickname(e.target.value);
            }}
            style={{width:"calc(100% - 50px)"}}
          />
        </Grid>

        <Grid padding="0" margin="0 0 17px">
          <Input
            type="password"
            label="비밀번호"
            value={password}
            is_submit
            placeholder="비밀번호를 입력해 주세요."
            _onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="0" margin="0 0 149px">
          <Input
            type="password"
            label="비밀번호 확인"
            value={passwordCheck}
            is_submit
            placeholder="비밀번호를 재입력해 주세요."
            _onChange={(e) => {
              setpasswordCheck(e.target.value);
            }}
          />
        </Grid>
        <br />
        <Button _onClick={signup}>가입하기</Button>
      </Grid>
       
    );
};

export default Signup;
