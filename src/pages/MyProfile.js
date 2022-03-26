import React from "react";
import styled from "styled-components";
import { Grid, Input, Button, Image } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import * as baseAction from "../redux/modules/base";
import { ActionCreators as userActions } from "../redux/modules/user";
import { actionCreators as mypageAction } from "../redux/modules/mypage";
import { mypageApis } from "../shared/apis";

//image
import defaultImg from "../image/img_profile_defalt @2x.png";
import setIcon from "../image/icon/ic_setting@2x.png";

//모달팝업
import Modal from "../components/Modal";

const MyProfile = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.mypage.myInfo);
  const userId = localStorage.getItem("userId");

  //수정 목록
  const [password, setpassword] = React.useState("");
  const [passwordCheck, setpasswordCheck] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  //유효성 검사
  const [isPwd, setIsPwd] = React.useState(false);
  const [samePwd, setSamePwd] = React.useState(false);

  //모달팝업
  const [modalType, setModalType] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);

  const comfirmModal = () => {
    setModalType("comfirmModal");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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

  //프로필 사진 수정
  const fileInput = React.useRef();

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file); //파일 내용 읽어오기
    // onloadend: 읽기가 끝나면 발생하는 이벤트 핸들러
    reader.onloadend = () => {
      // reader.result는 파일의 컨텐츠(내용물)입니다!
      setPreview(reader.result);
    };
    if (file) {
      setImage(file);
    }
  };

  const editProfile = () => {
    let formData = new FormData();

    formData.append("profileImage", image);

    const data = {
      password: password,
      passwordCheck: passwordCheck,
    };

    formData.append(
      "profile",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    mypageApis
      .editMyInfo(userId, formData)
      .then((res) => {
        console.log("프로필 수정", res);
        //변경된 유저 정보 세팅하기
        dispatch(userActions.loginCheckDB());
        setModalType("comfirmModal2");
        setModalOpen(true);
      })
      .catch((err) => {
        console.log("프로필 수정에러", err);
        window.alert(err.response.data.message);
      });
  };

   React.useEffect(() => {
    //유저 정보 불러오기
    dispatch(mypageAction.getMyInfoDB(userId));

    //헤더&푸터 state
    dispatch(baseAction.setHeader("회원정보 수정"));
    dispatch(baseAction.setGnb(false));
    return () => {
      dispatch(baseAction.setHeader("", false));
      dispatch(baseAction.setGnb(true));
    };
  }, []);

  return (
    <>
      {userInfo && (
        <Grid margin="48px 0 0" padding="0">
          <Grid padding="28px 20px 32px" bg="#fff">
            <Grid
              margin="0 auto 40px"
              width="90px"
              padding="0"
              style={{ position: "relative", overflow: "initial" }}
            >
              <Image
                className="edit"
                shape="rectangle"
                size="90"
                radius="30px"
                src={preview?preview:(userInfo.profileUrl?(userInfo.profileUrl):defaultImg)}
              ></Image>
              <FileBox>
                {/* 이미지 업로드 */}
                <label htmlFor="file_input" className="upload-box"></label>
                <input
                  type="file"
                  id="file_input"
                  ref={fileInput}
                  onChange={selectFile}
                />
              </FileBox>
            </Grid>
            <Grid padding="0" margin="0 0 24px">
              <InputWrap disabled>
                <label className="caption_color">아이디(이메일)</label>
                <Input value={userInfo.email} is_submit disabled />
              </InputWrap>
            </Grid>

            <Grid padding="0" margin="0 0 24px" style={{ overflow: "revert" }}>
              <InputWrap disabled>
                <label className="caption_color">닉네임</label>
                <Input value={userInfo.nickname} is_submit disabled />
              </InputWrap>
            </Grid>

            <Grid padding="0" margin="0 0 24px" style={{ overflow: "revert" }}>
              <InputWrap>
              {userInfo.kakao?( <Input
                  type="password"
                  label="새 비밀번호"
                  value={password}
                  is_submit
                  placeholder="카카오 사용자입니다."
                  disabled
                
                />):( <Input
                  type="password"
                  label="새 비밀번호"
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
                />)}
               
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

            <Grid padding="0" margin="0 0 24px" style={{ overflow: "revert" }}>
              <InputWrap>
              {userInfo.kakao?( <Input
                  type="password"
                  label="비밀번호 확인"
                  value={passwordCheck}
                  is_submit
                  placeholder="카카오 사용자입니다."
                  disabled
                
                />):(  <Input
                  type="password"
                  label="비밀번호 확인"
                  value={passwordCheck}
                  is_submit
                  placeholder="비밀번호를 재입력하세요."
                  _onChange={checkPwd}
                  className={
                    passwordCheck.length === 0
                      ? ""
                      : samePwd && passwordCheck.length
                      ? "green"
                      : "red"
                  }
                />)}
               
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
          </Grid>
          <Fixed>
            <Button
              _onClick={comfirmModal}
              disabled={password === "" && preview === "" ? "disabeld" : ""}
            >
              수정하기
            </Button>
          </Fixed>
          {/* 작성 버튼 클릭 시 뜨는 모달팝업 */}
          <Modal
            open={modalType === "comfirmModal" ? modalOpen : ""}
            close={closeModal}
            double_btn
            btn_text="수정"
            _onClick={() => {
              editProfile();
              closeModal();
            }}
          >
            <p>프로필을 수정하시겠습니까?</p>
          </Modal>
          {/* 삭제하기 눌렀을 때 진행중인 챌린지에 뜨는 모달팝업 */}
          <Modal
            open={modalType === "comfirmModal2" ? modalOpen : ""}
            close={closeModal}
            btn_text="확인"
            _onClick={() => {
              closeModal();
              history.push("/mypage");
            }}
          >
            <p>프로필 수정이 완료되었습니다.</p>
          </Modal>
        </Grid>
      )}
    </>
  );
};

const InputWrap = styled.div`
  position: relative;
  label,
  p:first-child {
    font-size: 14px;
  }
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
const FileBox = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  right: -8px;
  bottom: -8px;
  .upload-box {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: solid 2px #fff;
    background-color: #a2aab3;
    background-image: url(${setIcon});
    background-position: center;
    background-size: 32px;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;

const Fixed = styled.div`
  width: 100%;
  position: fixed;
  background-color: #fff;
  bottom: 0;
  left: 0;
  padding: 11px 20px;
  box-shadow: 0 -4px 8px 0 rgba(3, 1, 2, 0.04);
`;

export default MyProfile;
