import React from "react";
import styled from "styled-components";
import { Grid, Input, Button } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import * as baseAction from "../redux/modules/base";
import { ActionCreators as userActions } from "../redux/modules/user";
import { userApis } from "../shared/apis";
//import { history } from "../redux/configureStore";
import { useHistory } from "react-router";
import drop from "../image/icons/ic_dropdown@2x.png";
import Modal from "../components/Modal";

const Signup = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  //드롭다운(selectBox)
  const [active, setActive] = React.useState(false);
  const [option, setOption] = React.useState("");

  //회원가입 목록
  const [keypressID, setKeypressID] = React.useState();
  const [keypressNick, setKeypressNick] = React.useState();
  const [email, setEmail] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [nickname, setnickname] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [passwordCheck, setpasswordCheck] = React.useState("");

  //유효성 검사
  const [isEmail, setIsEmail] = React.useState("");
  const [isNick, setIsNick] = React.useState("");
  const [isPwd, setIsPwd] = React.useState(false);
  const [samePwd, setSamePwd] = React.useState(false);

  //중복검사
  const _nickCheck = useSelector((state) => state.user.nickCk);

  
  //회원가입 완료 팝업
  const [modalOpen, setModalOpen] = React.useState(false);

  const closeModal = () => {
      setModalOpen(false);
  };

  const send = () => {
    const mail = `${email}@${domain}`;
    dispatch(userActions.emailCheckResend(mail));
  };

  //닉네임 정규식

  const onChangeNick = (e) => {
    setnickname(e.target.value);
    let userNickRegex = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{2,8}$/;
    let NickRegex = userNickRegex.test(e.target.value);

    setKeypressNick(false);

    if (!NickRegex) {
      setIsNick(false);
    } else {
      setIsNick(true);
    }
  };

  //비밀번호 정규식

  const onChangePwd = (e) => {
    setSamePwd(false);
    const pwdRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
    const pwdcurrent = e.target.value;
    let PwdRegex = pwdRegex.test(e.target.value);
    setpassword(pwdcurrent);

    if (!PwdRegex) {
      setIsPwd(false);
    } else {
      setIsPwd(true);
    }

    if (pwdcurrent === passwordCheck) {
      setSamePwd(true);
    } else {
      setSamePwd(false);
    }
  };

  //비밀번호 확인

  const checkPwd = (e) => {
    setSamePwd(false);
    const pwdcurrent2 = e.target.value;
    setpasswordCheck(pwdcurrent2);
    //console.log(pwdcurrent2);
    if (pwdcurrent2 === password) {
      setSamePwd(true);
    } else {
      setSamePwd(false);
    }
  };

  const nicknameCheck = () => {
    // 닉네임 중복체크
    setKeypressNick(_nickCheck);
    dispatch(userActions.nicknameCheck(nickname));
  };

  const signup = () => {
    if (isPwd === true && samePwd === true && _nickCheck === "true") {
      const mail = `${email}@${domain}`;

      const signup = {
        email: mail,
        nickname: nickname,
        password: password,
        passwordCheck: passwordCheck,
      };

      userApis
        .signup(signup)
        .then((res) => {
          console.log(res.data, "회원가입");
          if(res.data.result === "true"){
            setModalOpen(true);
          }
        })
        .catch((error) => {
          window.alert("회원가입 오류입니다!");
          console.log("회원가입 실패:", error);
          setModalOpen(false);
        });

      //dispatch(userActions.signupDB(mail, nickname, password, passwordCheck));


    } else {
      window.alert("모든 조건이 맞는지 확인해주세요.");
    }
  };

  // 드롭박스 - 라벨을 클릭시 옵션 목록이 열림/닫힘
  const selectClick = () => {
    setActive(!active);
  };
  const optionClick = (e) => {
    setOption(e.target.innerText);
    setActive(false);
    if (option !== "직접 입력") {
      setDomain(e.target.innerText);
    }
  };
  //console.log("닉네임중복=",_nickCheck,"닉네임유효성=",isNick,"비밀번호확인=",samePwd,"비밀번호재입력=",passwordCheck);

  //헤더&푸터 state
  React.useEffect(() => {
    dispatch(baseAction.setHeader("회원가입"));
    dispatch(baseAction.setGnb(false));
    return () => {
      dispatch(baseAction.setHeader(""));
      dispatch(baseAction.setGnb(true));
    };
  }, []);

  return (
    <>
    <Grid padding="0 40px" margin="100px 0 0" style={{ overflow: "revert" }}>
      <Grid padding="0" margin="0 0 32px" style={{ overflow: "revert" }}>
        <label style={{ fontSize: "14px" }}>이메일</label>
        <Grid
          padding="0"
          margin="9px 0 5px"
          is_flex
          style={{ overflow: "revert" }}
        >
          <EmailInput
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></EmailInput>
          <p style={{ fontSize: "14px" }}>@</p>
          <Select>
            <button
              className="label"
              onClick={() => {
                selectClick();
              }}
            >
              {option ? option : "선택하세요"}
            </button>
            <ul className="optionList" id={active ? "active" : ""}>
              <li
                className="optionItem"
                onClick={(e) => {
                  optionClick(e);
                }}
              >
                naver.com
              </li>
              <li
                className="optionItem"
                onClick={(e) => {
                  optionClick(e);
                }}
              >
                nate.com
              </li>
              <li
                className="optionItem"
                onClick={(e) => {
                  optionClick(e);
                }}
              >
                daum.net
              </li>
              <li
                className="optionItem"
                onClick={(e) => {
                  optionClick(e);
                }}
              >
                hanmail.net
              </li>
              <li
                className="optionItem"
                onClick={(e) => {
                  optionClick(e);
                }}
              >
                gmail.com
              </li>
              <li
                className="optionItem"
                onClick={(e) => {
                  optionClick(e);
                }}
              >
                직접 입력
              </li>
            </ul>
          </Select>
        </Grid>
        <EmailInput
          className="width"
          onChange={(e) => {
            setDomain(e.target.value);
          }}
          disabled={option === "직접 입력" ? "" : "disabled"}
          value={option === "직접 입력" ? domain : option}
        ></EmailInput>
      </Grid>

      <Grid padding="0" margin="0 0 32px" style={{ overflow: "revert" }}>
        <InputWrap>
          <Input
            double
            label="닉네임"
            value={nickname}
            is_submit
            placeholder="닉네임을 입력해 주세요."
            btnClick={nicknameCheck}
            _onChange={onChangeNick}
            style={{ width: "calc(100% - 50px)" }}
          />
          <span
            className={
              isNick === null && _nickCheck === null
                ? ""
                : isNick === false && _nickCheck === null
                ? ""
                : isNick === false && _nickCheck === "true"
                ? ""
                : (isNick === true && _nickCheck === null) ||
                  keypressNick === false
                ? "red"
                : isNick === true && _nickCheck === undefined
                ? "red"
                : "green"
            }
          >
            {isNick === null || (isNick === "" && _nickCheck === null)? ""
              : isNick === false && _nickCheck === null ? "2글자 이상의 닉네임을 입력하세요."
              : isNick === false && _nickCheck === "true"? "2글자 이상의 닉네임을 입력하세요."
              : (isNick === true && _nickCheck === null) || keypressNick === false
? "중복확인을 해주세요"
              : isNick === true && _nickCheck === undefined
              ? "중복된 닉네임입니다."
              : "사용 가능한 닉네임입니다"}
          </span>
        </InputWrap>
      </Grid>

      <Grid padding="0" margin="0 0 32px" style={{ overflow: "revert" }}>
        <InputWrap>
          <Input
            type="password"
            label="비밀번호"
            value={password}
            is_submit
            placeholder="비밀번호를 입력해 주세요."
            _onChange={onChangePwd}
          />
          <span
            className={
              password.length === 0
                ? ""
                : isPwd && password.length
                ? "green"
                : "red"
            }
          >
            {password === null || password === ""
              ? ""
              : isPwd && password.length
              ? "사용 가능한 비밀번호입니다"
              : "영문,숫자,특수문자 8-20자로 구성된 비밀번호를 입력해 주세요."}
          </span>
        </InputWrap>
      </Grid>

      <Grid padding="0" margin="0 0 40px" style={{ overflow: "revert" }}>
        <InputWrap>
          <Input
            type="password"
            label="비밀번호 확인"
            value={passwordCheck}
            is_submit
            placeholder="비밀번호를 재입력해 주세요."
            _onChange={checkPwd}
          />
          <span
            className={
              passwordCheck.length === 0
                ? ""
                : samePwd && passwordCheck.length
                ? "green"
                : "red"
            }
          >
            {passwordCheck === null || passwordCheck === ""
              ? ""
              : samePwd && passwordCheck.length
              ? "비밀번호가 일치합니다."
              : "일치하지 않는 비밀번호 입니다."}
          </span>
        </InputWrap>
      </Grid>
      <Fixed>
        <Button _onClick={()=>{
          signup()          
        }} disabled={isPwd === true && samePwd === true && _nickCheck === "true"? "" : "disabled"}
        >가입하기</Button>
      </Fixed>
    </Grid>


    {/* 회원가입 완료 팝업 */}
    <Modal full_modal header open={modalOpen} close={closeModal}>
        <div style={{width:"180px", height:"180px", backgroundColor:"#ccc" , margin:"0 auto"}}></div>
        <Content>
            <h1>소행성 가입을 환영합니다!</h1>
            <p>메일을 전송하였습니다.<br/>아래의 메일에서 전송된 링크를<br/>클릭하면 회원가입이 완료됩니다.</p>
        </Content>
        <div style={{backgroundColor:"#f9f9f9", borderRadius:"10px", padding:"11px", marginBottom:"24px", textAlign:"center"}}>
            <p style={{fontSize:"14px"}}>{email}@{domain}</p>
        </div>
        <Grid padding="0" margin="0 0 56px" style={{textAlign:"center"}}>
            <p style={{fontSize:"14px", color:"#666"}}>메일을 받지 못하셨나요?</p>
            <Button width="250px" margin="10px 0 5px" radius="20px" bg={active?"#fff":"#666"} font_size="16px" style={{color:active?"#666":"#fff",border:"solid 1px #707070"}}
            _onClick={()=>{
                send()
            }}>이메일 재발송</Button>
            <p style={{display:active?"block":"none",fontSize:"10px", color:"#999"}}>인증 시간 01 : 00 : 00</p>
        </Grid>
        <Fixed>
            <Button _onClick={()=>{history.push("/login")}}>로그인 하기</Button>
        </Fixed>
    </Modal>
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
    color: #00a106;
  }
  > span.red {
    color: #fd5414;
  }
`;

const EmailInput = styled.input`
  width: calc(50% - 10px);
  height: 40px;
  border: solid 1px #999;
  outline: none;
  padding: 10px;
  &.width {
    width: 100%;
  }
`;

const Select = styled.div`
  position: relative;
  width: calc(50% - 10px);
  height: 40px;
  border: solid 1px #999;
  outline: none;
  background-image: url(${drop});
  background-size: 20px;
  background-position: right 10px top 10px;
  background-repeat: no-repeat;
  .label {
    display: flex;
    align-items: center;
    width: 100%;
    height: inherit;
    border: 0 none;
    outline: 0 none;
    padding-left: 10px;
    background: transparent;
    font-size: 14px;
    cursor: pointer;
  }
  .optionList {
    transform: scaleY(0);
    transform-origin: 0px 0px;
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    height: 157px;
    background: #fff;
    color: #fff;
    overflow: hidden;
    transition: 0.2s ease-in;
    opacity: 0;
    padding: 10px;
    border: solid 1px #999;
    z-index: 2;
    > li {
      font-size: 12px;
      color: #000;
      line-height: 1.5;
      margin-bottom: 2px;
      cursor: pointer;
    }
    &#active {
      transform: scaleY(1);
      opacity: 1;
    }
  }
`;

const Content = styled.div`
    text-align: center;
    margin:40px 0 8px;
    h1 {
        font-size: 18px;
        margin-bottom: 10px;
        font-weight: 400;
    }
    p {
        font-size: 14px;
        line-height: 1.36;
        letter-spacing: -0.2px;
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




export default Signup;
