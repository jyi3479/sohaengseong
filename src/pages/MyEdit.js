import React from "react"
import styled from "styled-components";
import {Grid, Input, Button} from "../elements"
import {useDispatch, useSelector} from 'react-redux'
import * as baseAction from '../redux/modules/base';
import { mypageApis } from "../shared/apis";
import { history } from "../redux/configureStore";
import _ from "lodash"; // lodash 부르기


const MyEdit = (props) => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.user);

    //비밀번호 확인
    const [pwd, setPwd] = React.useState("");
    const [isPwd, setIsPwd] = React.useState(false);
    
    //axios 요청을 줄이기위한 debounce
    const debounce = _.debounce((password) =>{
        //dispatch(myActions.checkPwdDB(password));
        const pwd = {
            password:password
        };
        mypageApis.checkPwd(pwd)
        .then((res) => {
            console.log("비번확인",res.data);
            setIsPwd(true);
        })
        .catch((err) => {
            console.log("비번확인 에러", err.message); 
            setIsPwd(false);
        });
    }, 400);
    const keyPress = React.useCallback(debounce, []);


    const pwdChange = (e) => {
        keyPress(e.target.value);
        setPwd(e.target.value);
    };

    //헤더&푸터 state
    React.useEffect(() => {
    dispatch(baseAction.setHeader("회원정보 수정"));
    dispatch(baseAction.setGnb(false));
        return()=>{
            dispatch(baseAction.setHeader("",false));
            dispatch(baseAction.setGnb(true));
        }
    }, [])

    return (     
      <Grid padding="0 40px" margin="48px 0 0">
          <Grid padding="0" margin="50px 0 40px">           
            <h1 style={{fontSize:"20px", marginBottom:"4px"}}>회원 정보 수정</h1>
            <p style={{fontSize:"14px", lineHeight:"1.5", wordBreak: "keep-all"}}>{userInfo?userInfo.nickname:"회원"}님의 회원정보를 안전하게 보호하기 위해 비밀번호를 한 번 더 입력해주세요.</p>
          </Grid>
        <Grid padding="0" margin="0 0 32px" style={{overflow:"initial"}}>
          <InputWrap>
            <Input
              type="password"
              label="비밀번호"
              value={pwd}
              is_submit
              placeholder="비밀번호를 입력해 주세요."
              _onChange={pwdChange}
            />
            <span className={  pwd.length === 0 ? "" : isPwd && pwd.length ? "green" : "red" }>
              {pwd === null || pwd === "" ? "" : isPwd && pwd.length  ? "" : "비밀번호가 맞지 않습니다."}
            </span>
          </InputWrap>
        </Grid>
        <Fixed>
            <Button _disabled={pwd === null || pwd === "" || !isPwd ? "disabled" : ""} 
                _onClick={()=>{
                    history.push("/mypage/profile/edit");
                }}
            >확인</Button>
        </Fixed>        
      </Grid>
       
    );
};

const InputWrap = styled.div`
  position: relative;
  > span {
    position: absolute;
    left: 0;
    bottom: -17px;
    font-size: 10px;
  }
  > span.green {
    color: #00a106;
  }
  > span.red {
    color: #fd5414;
  }
`;

const Fixed = styled.div`
    width: 100%;
    position: fixed;
    background-color: #fff;
    bottom:0;
    left:0;
    padding:12px 20px;
    box-shadow: 0 -5px 6px 0 rgba(0, 0, 0, 0.04);
    button {
        border-radius: 5px;
    }
`;


export default MyEdit;
