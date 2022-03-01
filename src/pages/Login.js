import React from "react";
import { useDispatch } from "react-redux";
import { Grid, Input, button, Button} from '../elements'
import { ActionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
const Login = (props) => {
    const dispatch = useDispatch();
    const [email, setemail] = React.useState('')
    const [password, setpassword] = React.useState('')

    const login = () => {

        if(email ==='' || password === ''){
            window.alert('아이디 혹은 비밀번호가 공란입니다! 입력해주세요!')
            return
        }
    
       
             dispatch(userActions.loginDB(email, password))
             
    }
 

    return (
      <>
        <React.Fragment>
          <Grid padding="16px">
            <p>로그인</p>
            <Grid margin="5%" width="50%" height="10%" padding="16px 0px">
              <Input
                value={email}
                label="아이디"
                placeholder="이메일 아이디를 입력해주세요"
                is_submit
                _onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </Grid>

            <Grid margin="5%" width="50%" height="10%" padding="16px 0px">
              <Input
                value={password}
                label="패스워드"
                placeholder="패스워드를 입력해주세요"
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
            <Button _onClick={() => history.push("/signup")}>회원가입</Button>
          </Grid>
        </React.Fragment>
      </>
    );
};

export default Login;