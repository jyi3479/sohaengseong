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
        const pwd = {
            password:password
        };
        mypageApis.checkPwd(pwd)
        .then((res) => {
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
      <>
        <Grid padding="48px 20px" margin="48px 0 0" bg="#fff">                 
          <h1>회원 정보 수정</h1>
          <p className="sub_color mt12" style={{lineHeight:"20px"}}>{userInfo?userInfo.nickname:"회원"}님의 회원정보를 안전하게 보호하기 위해<br/>비밀번호를 한 번 더 입력해주세요.</p>          
          <Grid padding="0" margin="64px 0 0" style={{overflow:"initial"}}>
            <InputWrap>
              <Input
                type="password"
                label="비밀번호"
                value={pwd}
                is_submit
                placeholder="비밀번호를 입력하세요."
                _onChange={pwdChange}
                className={  pwd.length === 0 ? "" : isPwd && pwd.length ? "green" : "red" }
              />
              <span className={  pwd.length === 0 ? "" : isPwd && pwd.length ? "green" : "red" }>
                {pwd === null || pwd === "" ? "" : isPwd && pwd.length  ? "" : "비밀번호가 맞지 않습니다."}
              </span>
            </InputWrap>
          </Grid>        
        </Grid>
        <Fixed>
            <Button 
              _disabled={pwd === null || pwd === "" || !isPwd ? "disabled" : ""}
              _onClick={()=>{
                  history.push("/mypage/profile/edit");
              }}
            >계속하기</Button>
        </Fixed>
      </>       
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
    color: #5a76ea;
  }
  > span.red {
    color: #f57391;
  }
`;

const Fixed = styled.div`
    width: 100%;
    position: fixed;
    background-color: #fff;
    bottom:0;
    left:0;
    padding:11px 20px;
    box-shadow: 0 -4px 8px 0 rgba(3, 1, 2, 0.04);
`;

export default MyEdit;
