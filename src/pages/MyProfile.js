import React from "react";
import styled from "styled-components";
import { Grid, Input, Button, Image } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import * as baseAction from "../redux/modules/base";
import { ActionCreators as userActions } from "../redux/modules/user";
import { actionCreators as mypageAction } from "../redux/modules/mypage";
import { mypageApis } from "../shared/apis";
import { userApis } from "../shared/apis";

//image
import defaultImg from "../image/img_profile_defalt @2x.png";
import setIcon from "../image/icon/ic_setting@2x.png";

//모달팝업
import Modal from "../components/shared/Modal";

//heic 이미지 파일을 jpeg로 변환하는 라이브러리
import heic2any from "heic2any";
// 이미지 압축 라이브러리
import imageCompression from "browser-image-compression";

const MyProfile = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.mypage.myInfo);
  const userId = localStorage.getItem("userId");

  //수정 목록
  const [password, setpassword] = React.useState("");
  const [passwordCheck, setpasswordCheck] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [isWarning, setIsWarning] = React.useState(false);

  // 닉네임
  const [keypressNick, setKeypressNick] = React.useState();
  const [nickname, setnickname] = React.useState(userInfo.nickname);
  const [isNick, setIsNick] = React.useState("");
  //중복검사
  const _nickCheck = useSelector((state) => state.user.nickCk);
  const [err, setErr] = React.useState(false); // 닉네임 중복검사 에러
  const [errMsg, setErrMsg] = React.useState(""); // 닉네임 중복검사 에러메시지
  const [isCheck, setIsCheck] = React.useState(false); // 중복검사를 한 번이라도 눌렀는지 여부

  //유효성 검사
  const [isPwd, setIsPwd] = React.useState(false);
  const [samePwd, setSamePwd] = React.useState(false);

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
    //console.log(pwdcurrent2);
    if (pwdcurrent2 === password) {
      setSamePwd(true);
    } else {
      setSamePwd(false);
    }
  };

  //프로필 사진 수정
  const fileInput = React.useRef();

  const selectFile = async (e) => {
    const reader = new FileReader();
    let file;
    // 이미지 resize 옵션 설정 (최대 width을 400px로 지정)
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 200,
    };
    if (
      fileInput.current.files[0].name.split(".")[1] === "gif" ||
      fileInput.current.files[0].name.split(".")[1] === "GIF" ||
      fileInput.current.files[0].name.split(".")[1] === "heic" ||
      fileInput.current.files[0].name.split(".")[1] === "HEIC"
    ) {
      file = fileInput.current.files[0];
    } else {
      file = await imageCompression(fileInput.current.files[0], options);
    }
    const maxSize = 20 * 1024 * 1024; // 파일 용량 제한 (20MB)
    if (file.size > maxSize) {
      setIsWarning(true);
    } else {
      setIsWarning(false);
      if (file.name.split(".")[1] === "heic" || file.name.split(".")[1] === "HEIC") {
        let blob = fileInput.current.files[0];
        // blob에다가 변환 시키고 싶은 file값을 value로 놓는다.
        // toType에다가는 heic를 변환시키고싶은 이미지 타입을 넣는다.
        heic2any({ blob: blob, toType: "image/jpeg" })
          .then(function (resultBlob) {
            //file에 새로운 파일 데이터를 씌웁니다.
            file = new File([resultBlob], file.name.split(".")[0] + ".jpg", {
              type: "image/jpeg",
              lastModified: new Date().getTime(),
            });
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              setPreview(reader.result);
            };
            if (file) {
              setImage(file);
            }
          })
          .catch(function (err) {
            console.log("이미지 변환 오류", err);
          });
      }
      reader.readAsDataURL(file); //파일 내용 읽어오기
      // onloadend: 읽기가 끝나면 발생하는 이벤트 핸들러
      reader.onloadend = () => {
        // reader.result는 파일의 컨텐츠(내용물)입니다!
        setPreview(reader.result);
      };
      if (file) {
        setImage(file);
      }
    }
  };

  const editProfile = () => {
    let formData = new FormData();

    formData.append("profileImage", image);

    const data = {
      password: password,
      passwordCheck: passwordCheck,
      nickname: nickname === userInfo.nickname ? "" : nickname,
    };
    formData.append("profile", new Blob([JSON.stringify(data)], { type: "application/json" }));

    mypageApis
      .editMyInfo(userId, formData)
      .then((res) => {
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
            <Grid margin="0 auto 60px" width="90px" padding="0" style={{ position: "relative", overflow: "initial" }}>
              <Image
                className="edit"
                shape="rectangle"
                size="90"
                radius="30px"
                src={preview ? preview : userInfo.profileUrl ? userInfo.profileUrl : defaultImg}
              ></Image>
              <FileBox>
                {/* 이미지 업로드 */}
                <label htmlFor="file_input" className="upload-box"></label>
                <input type="file" id="file_input" ref={fileInput} onChange={selectFile} />
              </FileBox>
              <WarningBox>
                <p className="caption sub_color">※ 최대 20MB</p>
                {isWarning && <p className="fail_color caption">첨부 가능한 용량을 초과합니다. 20MB 이하의 파일을 올려주세요.</p>}
              </WarningBox>
            </Grid>

            <Grid padding="0" margin="0 0 24px">
              <InputWrap disabled>
                <label className="caption_color">아이디(이메일)</label>
                <Input value={userInfo.email} is_submit disabled />
              </InputWrap>
            </Grid>

            <Grid padding="0" margin="0 0 24px" style={{ overflow: "revert" }}>
              <InputWrap disabled>
                <Input
                  double
                  label="닉네임"
                  value={nickname}
                  is_submit
                  placeholder="닉네임을 입력하세요."
                  btnClick={nicknameCheck}
                  btn_disabled={
                    ((isNick === true && _nickCheck === null) || keypressNick === false) && userInfo.nickname !== nickname
                      ? ""
                      : isNick === true && _nickCheck === undefined && userInfo.nickname !== nickname
                      ? ""
                      : "disabled"
                  }
                  _onChange={onChangeNick}
                  className={
                    isNick === null || (isNick === false && nickname === "") || userInfo.nickname === nickname
                      ? ""
                      : isNick === false && _nickCheck === null
                      ? ""
                      : isNick === false && _nickCheck === "true"
                      ? ""
                      : (isNick === true && _nickCheck === null) || keypressNick === false
                      ? "red"
                      : isNick === true && _nickCheck === undefined
                      ? "red"
                      : "green"
                  }
                />
                <span
                  className={
                    isNick === null || (isNick === false && nickname === "") || userInfo.nickname === nickname
                      ? ""
                      : isNick === false && _nickCheck === null
                      ? ""
                      : isNick === false && _nickCheck === "true"
                      ? ""
                      : (isNick === true && _nickCheck === null) || keypressNick === false
                      ? "red"
                      : isNick === true && _nickCheck === undefined
                      ? "red"
                      : "green"
                  }
                >
                  {isNick === null || isNick === "" || (isNick === false && nickname === "") || userInfo.nickname === nickname
                    ? ""
                    : isNick === false && _nickCheck === undefined
                    ? "2-8자의 닉네임을 입력하세요."
                    : isNick === false && _nickCheck === "true"
                    ? "2-8자의 닉네임을 입력하세요."
                    : isNick === true && _nickCheck === undefined && !err && errMsg === "" && keypressNick === false
                    ? "중복확인을 해주세요"
                    : isNick === true && _nickCheck === undefined && err && keypressNick === false
                    ? errMsg
                    : "사용 가능한 닉네임입니다"}
                </span>
              </InputWrap>
            </Grid>

            <Grid padding="0" margin="0 0 24px" style={{ overflow: "revert" }}>
              <InputWrap>
                {userInfo.kakao ? (
                  <Input type="password" label="새 비밀번호" value={password} is_submit placeholder="카카오 사용자입니다." disabled />
                ) : (
                  <Input
                    type="password"
                    label="새 비밀번호"
                    value={password}
                    is_submit
                    placeholder="비밀번호를 입력하세요."
                    _onChange={onChangePwd}
                    className={password.length === 0 ? "" : isPwd && password.length ? "green" : "red"}
                  />
                )}

                <span className={password.length === 0 ? "" : isPwd && password.length ? "green" : "red"}>
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
                {userInfo.kakao ? (
                  <Input type="password" label="비밀번호 확인" value={passwordCheck} is_submit placeholder="카카오 사용자입니다." disabled />
                ) : (
                  <Input
                    type="password"
                    label="비밀번호 확인"
                    value={passwordCheck}
                    is_submit
                    placeholder="비밀번호를 재입력하세요."
                    _onChange={checkPwd}
                    className={passwordCheck.length === 0 ? "" : samePwd && passwordCheck.length ? "green" : "red"}
                  />
                )}

                <span className={passwordCheck.length === 0 ? "" : samePwd && passwordCheck.length ? "green" : "red"}>
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
              disabled={
                (password === "" && !preview && (userInfo.nickname === nickname || nickname === "")) ||
                (password && (!isPwd || !samePwd)) ||
                (nickname && userInfo.nickname !== nickname && (_nickCheck !== "true" || !isCheck || !keypressNick))
                  ? "disabeld"
                  : ""
              }
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

const WarningBox = styled.div`
  position: absolute;
  text-align: center;
  width: 320px;
  left: -120px;
  margin-top: 13px;

  p:first-child {
    margin-bottom: 4px;
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
