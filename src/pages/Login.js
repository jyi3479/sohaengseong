import React from "react";
import { useDispatch } from "react-redux";
import { Grid, Input, button, Button } from "../elements";
import { ActionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import { KAKAO_AUTH_URL } from "../shared/Oauth";
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
      <Grid padding="0px 64px" margin="60px 0px">
        <Grid>
          <Input
            value={email}
            label="아이디"
            placeholder="이메일 아이디를 입력해주세요"
            width="250px"
            height="40px"
            is_submit
            _onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </Grid>
        <Button
          onClick={() => {
            dispatch(userActions.emailCheck(email));
          }}
        >
          중복체크
        </Button>
        <Grid margin="5%" height="10%" padding="16px 0px">
          <Input
            value={password}
            label="패스워드"
            placeholder="패스워드를 입력해주세요"
            width="250px"
            height="40px"
            is_submit
            type="password"
            _onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </Grid>
        <br />
        <Button
          margin="10%"
          width="50%"
          height="5%"
          _onClick={() => {
            login();
          }}
        >
          로그인하기
        </Button>
        <Button
          onClick={() => {
            dispatch(userActions.findPassword);
            history.push("./login");
          }}
        >
          비밀번호찾기
        </Button>
        <Button _onClick={() => history.push("/signup")}>회원가입</Button>
        <button href={KAKAO_AUTH_URL}>
          <img></img>
          <span>카카오계정 로그인</span>
        </button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
