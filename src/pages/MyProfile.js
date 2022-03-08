import React from "react"
import styled from "styled-components";
import {Grid, Input, Button, Image} from "../elements"
import {useDispatch, useSelector} from 'react-redux'
import { history } from "../redux/configureStore";
import * as baseAction from '../redux/modules/base';
import { ActionCreators as userActions } from "../redux/modules/user";
import { mypageApis } from "../shared/apis";
import  defalt from "../image/img_profile_defalt @2x.png";
import setIcon from "../image/icons/ic_setting@2x.png";

//모달팝업
import Modal from '../components/Modal';

const MyProfile = (props) => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.mypage.myInfo);
    const userId = localStorage.getItem("userId");    

    //수정 목록
    const [password, setpassword] = React.useState("");
    const [passwordCheck, setpasswordCheck] = React.useState("");
    const [image, setImage] = React.useState(null);
    const [preview, setPreview] = React.useState(userInfo&&userInfo.profileUrl === null ? defalt : userInfo.profileUrl);
    const [compareImage, setCompareImage] = React.useState(userInfo?userInfo.challengeImage:null);


    //유효성 검사
    const [isPwd,setIsPwd] = React.useState(false);
    const [samePwd,setSamePwd] = React.useState(false);

    //모달팝업
    const [modalType, setModalType] = React.useState("");
    const [modalOpen, setModalOpen] = React.useState(false);


    const comfirmModal = () => {
        console.log("열림");
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

        if (pwdcurrent === passwordCheck ) {
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

        formData.append("profileImage",image);

        const data = {           
            password:password,
            passwordCheck:passwordCheck
        };

        formData.append(
            "profile",
            new Blob([JSON.stringify(data)], { type: "application/json" })
        );

        mypageApis.editMyInfo(userId,formData)
        .then((res)=>{
          console.log("프로필 수정",res);
          setModalType("comfirmModal2");
            setModalOpen(true);
        }).catch((err)=>{
          console.log("프로필 수정에러",err);
        });
    
    };

    
    React.useEffect(() => {
        //유저 정보 없으면 불러오기
        if(userInfo === null){
            dispatch(userActions.loginCheckDB());
        };
        //헤더&푸터 state
        dispatch(baseAction.setHeader("프로필 편집"));
        dispatch(baseAction.setGnb(false));
        return()=>{
            dispatch(baseAction.setHeader("",false));
            dispatch(baseAction.setGnb(true));
        }
    }, []);

    return(
    <>
        {userInfo &&
            <Grid padding="0 40px" margin="48px 0 0">
                <Grid margin="26px 0 0" padding="0">
                    <Grid margin="0 auto 32px"  width="109px" padding="0" style={{position: "relative"}}>
                        <Image size="109" shape="circle" profile={preview}></Image>
                        <FileBox>
                            {/* 이미지 업로드 */}                
                            <label htmlFor="file_input" className="upload-box"></label>
                            <input type="file" id="file_input" ref={fileInput} onChange={selectFile}/>               
                        </FileBox>     
                    </Grid>
                    <Grid padding="0" margin="0 0 24px">
                        <InputWrap>
                            <Input                        
                            label="이메일"
                            value={userInfo.email}
                            is_submit
                            disabled
                            />                
                        </InputWrap>
                    </Grid>

                    <Grid padding="0" margin="0 0 24px" style={{overflow: "revert"}}>
                        <InputWrap>
                            <Input
                            label="닉네임"
                            value={userInfo.nickname}
                            is_submit
                            disabled
                            />                
                        </InputWrap>
                    </Grid>

                    <Grid padding="0" margin="0 0 24px" style={{overflow: "revert"}}>
                        <InputWrap>
                            <Input
                            type="password"
                            label="비밀번호"
                            value={password}
                            is_submit
                            placeholder="비밀번호를 입력해 주세요."
                            _onChange={onChangePwd}
                            />
                            <span className={  password.length === 0 ? "" : isPwd && password.length ? "green" : "red" }>
                            {password === null || password === "" ? "" : isPwd && password.length  ? "사용 가능한 비밀번호입니다" : "영문,숫자,특수문자 8-20자로 구성된 비밀번호를 입력해 주세요."}
                            </span>
                        </InputWrap>
                    </Grid>

                    <Grid padding="0" margin="0 0 24px" style={{overflow: "revert"}}>
                        <InputWrap>
                            <Input
                            type="password"
                            label="비밀번호 확인"
                            value={passwordCheck}
                            is_submit
                            placeholder="비밀번호를 재입력해 주세요."
                            _onChange={checkPwd}
                            />
                            <span className={passwordCheck.length === 0 ? "" : samePwd && passwordCheck.length ? "green": "red"}>
                            {passwordCheck === null || passwordCheck === "" ? "" : samePwd && passwordCheck.length? "비밀번호가 일치합니다.": "일치하지 않는 비밀번호 입니다."}
                            </span>
                        </InputWrap>
                    </Grid>
                </Grid>
                <Fixed>
                    <Button 
                        _onClick={comfirmModal}
                        disabled={password === "" && preview === "" ? "disabeld" : ""}
                    >작성</Button>
                </Fixed>  
                {/* 작성 버튼 클릭 시 뜨는 모달팝업 */}
                <Modal open={modalType === "comfirmModal"? modalOpen : ""} close={closeModal} double_btn btn_text="수정" _onClick={()=>{
                    editProfile()
                    closeModal()
                }}>
                    <p>프로필을 수정하시겠습니까?</p>
                </Modal>
                {/* 삭제하기 눌렀을 때 진행중인 챌린지에 뜨는 모달팝업 */}
                <Modal open={modalType === "comfirmModal2"? modalOpen : ""} close={closeModal} btn_text="확인" 
                    _onClick={()=>{
                        closeModal()
                        history.push("/mypage")
                    }}
                >
                    <p>프로필 수정이 완료되었습니다.</p>
                </Modal>     
            </Grid>
            
        }
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
const FileBox = styled.div`
    position: absolute;
    width: 36px;
    height: 36px;
    right: 0;
    bottom:0;
    .upload-box {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #efefef;
        background-image: url(${setIcon});
        background-position: center;
        background-size: 24px;
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
    bottom:0;
    left:0;
    padding:12px 20px;
    box-shadow: 0 -5px 6px 0 rgba(0, 0, 0, 0.04);
    button {
        border-radius: 5px;
    }
`;

export default MyProfile;