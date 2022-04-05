import React from "react";
import styled from "styled-components";

import '../styles/css/custom.scss';
import { Grid, Input, Button } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import * as baseAction from "../redux/modules/base";
import { ActionCreators as userActions } from "../redux/modules/user";
import { userApis } from "../shared/apis";

import drop from "../image/icons/ic_dropdown@2x.png";
import deleteIcon from "../image/icon/ic_text_delete@2x.png";
import PopModal from "../components/shared/PopModal";

const Signup = (props) => {
  const dispatch = useDispatch();

  //드롭다운(selectBox)
  const [active, setActive] = React.useState(false);
  const [option, setOption] = React.useState("");

  //회원가입 목록
  const [keypressNick, setKeypressNick] = React.useState();
  const [email, setEmail] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [nickname, setnickname] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [passwordCheck, setpasswordCheck] = React.useState("");

  //유효성 검사
  const [isNick, setIsNick] = React.useState("");
  const [isPwd, setIsPwd] = React.useState(false);
  const [samePwd, setSamePwd] = React.useState(false);


  //중복검사
  const _nickCheck = useSelector((state) => state.user.nickCk);
  const [err,setErr] = React.useState(false); // 닉네임 중복검사 에러
  const [errMsg,setErrMsg] = React.useState(""); // 닉네임 중복검사 에러메시지
  
  //회원가입 완료 팝업
  const [modalOpen, setModalOpen] = React.useState(false);

  const closeModal = () => {
      setModalOpen(false);
  };

  // 드롭박스 - 라벨을 클릭시 옵션 목록이 열림/닫힘
  const selectClick = () => {
    setActive(!active);
    setOption("");
  };
  const optionClick = (e) => {
    setOption(e.target.innerText);
    setActive(false);    
    if (option !== "직접 입력") {
      setDomain(e.target.innerText);
    }
  };

  const send = () => {
    const mail = `${email}@${domain}`;
    dispatch(userActions.emailCheckResend(mail));
  };

  const deleteValue = () => {
    setDomain("");
  };

  //이메일 한글막기
  const onChangeMail = (e) => {
    //좌우 방향키, 백스페이스, 딜리트, 탭키에 대한 예외
    if(e.keyCode === 8 || e.keyCode === 9 || e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 46 ) return;
    e.target.value = e.target.value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');    
  };

  //닉네임 정규식
  const onChangeNick = (e) => {
    setnickname(e.target.value);
    setErr(false);
    dispatch(userActions.nickCheck("false"));
    setErrMsg("");

    let userNickRegex = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,7}$/;
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
    const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
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
    if (pwdcurrent2 === password) {
      setSamePwd(true);
    } else {
      setSamePwd(false);
    }
  };

  const nicknameCheck = () => {
    setErr(false);
    setErrMsg("");
    // 닉네임 중복체크
    userApis
      .nicknameCheck(nickname)
      .then((res) => {
        dispatch(userActions.nickCheck(res.data));
        setKeypressNick(res.data.result);
      })
      .catch((err) => {
        console.log("닉네임 중복확인 에러", err);
        setErr(true);
        setErrMsg(err.response.data.message);
      });
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
          if(res.data.result === "true"){
            setModalOpen(true);
          }
        })
        .catch((error) => {
          window.alert(error.response.data.message);
          console.log("회원가입 실패:", error);
          setModalOpen(false);
        });

    } else {
      window.alert("모든 조건이 맞는지 확인해주세요.");
    }
  };  


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
    <Grid padding="24px 20px" margin="48px 0 0" bg="#fff" style={{ overflow: "revert" }}>
      <Grid padding="0" margin="0 0 28px" style={{ overflow: "revert" }}>
        <label className="small">아이디(이메일)</label>
        <p className="small sub_color">입력하신 이메일로 본인 인증 메일이 발송됩니다.</p>
        <Grid
          padding="0"
          is_flex
          margin="7px 0 0"
          style={{ overflow: "revert" }}
        >
          <input
            className="email_input"
            onChange={(e)=>{
              setEmail(e.target.value);
            }}
            onKeyUp={onChangeMail}
            placeholder="이메일 주소"
            style={{opacity: option ? "1" : "0.5", imeMode:"disabled"}}
            ></input>
          <p>@</p>
          <div className={active ? "active custom_select" : option ? "ok custom_select" : "custom_select"}>
            <img src={drop}></img>
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
          </div>
        </Grid>
        <SelfInput style={{display: option === "직접 입력" ? "block" : "none"}}>
          <input
            className="email_input width"
            onChange={(e) => {
              setDomain(e.target.value);
            }}
            disabled={option === "직접 입력" ? "" : "disabled"}
            value={option !== "직접 입력" ? option : domain}
            
          ></input>
          {domain?<button onClick={deleteValue}></button>:null}          
        </SelfInput>
      </Grid>

      <Grid padding="0" margin="0 0 28px" style={{ overflow: "revert" }}>
        <InputWrap>
          <Input
            double
            label="닉네임"
            value={nickname}
            is_submit
            placeholder="닉네임을 입력하세요."
            btnClick={nicknameCheck}
            btn_disabled={
              (isNick === true && _nickCheck === null) || keypressNick === false ? ""
              : isNick === true && _nickCheck === undefined ? ""
              : "disabled"
            }
            _onChange={onChangeNick}
            className={ isNick === null || (isNick === false && nickname === "") ? ""
                : isNick === false && _nickCheck === null ? ""
                : isNick === false && _nickCheck === "true" ? ""
                : (isNick === true && _nickCheck === null) || keypressNick === false ? "red"
                : isNick === true && _nickCheck === undefined ? "red" : "green"
            }
          />
          <span
            className={
              isNick === null || (isNick === false && nickname === "") ? ""
                : isNick === false && _nickCheck === null ? ""
                : isNick === false && _nickCheck === "true" ? ""
                :(isNick === true && _nickCheck === null) || keypressNick === false ? "red"
                : isNick === true && _nickCheck === undefined ? "red" : "green"
            }
          >
            {isNick === null || isNick === "" || (isNick === false && nickname === "") ? ""
              : isNick === false && _nickCheck === undefined ? "2-8자의 닉네임을 입력하세요."
              : isNick === false && _nickCheck === "true" ? "2-8자의 닉네임을 입력하세요."
              : (isNick === true && _nickCheck === undefined && !err && errMsg === "" ) && keypressNick === false ? "중복확인을 해주세요"
              : (isNick === true && _nickCheck === undefined && err) && keypressNick === false ? errMsg : "사용 가능한 닉네임입니다"}
          </span>
        </InputWrap>
      </Grid>

      <Grid padding="0" margin="0 0 28px" style={{ overflow: "revert" }}>
        <InputWrap>
          <Input
            type="password"
            label="비밀번호"
            value={password}
            is_submit
            placeholder="비밀번호를 입력하세요."
            _onChange={onChangePwd}
            className={
              password.length === 0
                ? ""
                : isPwd && password.length
                ? "green"
                : "red"
            }
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

      <Grid padding="0" margin="0 0 28px" style={{ overflow: "revert" }}>
        <InputWrap>
          <Input
            type="password"
            label="비밀번호 확인"
            value={passwordCheck}
            is_submit
            placeholder="비밀번호를 입력하세요."
            _onChange={checkPwd}
            className={
              passwordCheck.length === 0
                ? ""
                : samePwd && passwordCheck.length
                ? "green"
                : "red"
            }
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
              : "비밀번호가 일치하지 않습니다."}
          </span>
        </InputWrap>
      </Grid>
      <Fixed>
        <Button _onClick={()=>{
          signup()
        }} 
        disabled={isPwd === true && samePwd === true && _nickCheck === "true"? "" : "disabled"}
        >가입하기</Button>
      </Fixed>
    </Grid>


    {/* 회원가입 완료 팝업 */}
    {/* 이메일 전송 팝업 */}
    <PopModal open={modalOpen} close={closeModal} h2="소행성 가입을 환영합니다!" p={`메일을 전송하였습니다.
아래의 메일에서 전송된 링크를
클릭하면 회원가입이 완료됩니다.`} mail={`${email}@${domain}`} btn_click={send}>
    </PopModal>
    </>
  );
};

const InputWrap = styled.div`
  position: relative;
  > span {
    position: absolute;
    left: 0;
    bottom: -20px;
    font-size: 12px;
  }
  > span.green {
    color: #5a76ea;
  }
  > span.red {
    color: #f57391;
  }
`;
const SelfInput = styled.div`
  position: relative;
  margin-bottom: 42px;
  >button {
    position: absolute;
    width: 20px;
    height: 20px;
    background-image: url(${deleteIcon});
    background-size: contain;
    right: 0;
    top: 10px;
    border: none;
    background-color: transparent;
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

export default Signup;
