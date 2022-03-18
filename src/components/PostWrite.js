import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as memberAction } from "../redux/modules/member";
import { actionCreators as baseAction } from "../redux/modules/base";
import { Grid, Input, Button } from "../elements";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import { memberApis } from "../shared/apis";
import plus from "../image/icons/ic_plus_xl@2x.png";
import deleteIcon from "../image/icon/ic_delete_m.png";
import confirmIcon from "../image/img_good@2x.png";

const PostWrite = (props) => {
  const postId = +useParams().postId;
  const roomId = useParams().roomId;
  const isEdit = postId ? true : false;
  const dispatch = useDispatch();
  const challengeId = +useParams().challengeId;
  const userInfo = useSelector((state) => state.user.user);
  const postList = useSelector((state) => state.member.postList);
  const targetPost = postList.filter((el) => el.postId === postId)[0];

  //  인증 게시글 수정은 어디서 할건지에 따라 is_edit 변수 활용하기
  const [content, setContent] = React.useState(
    isEdit ? targetPost.content : ""
  );
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(
    isEdit ? targetPost.postImage : ""
  );

  const [isLevelUp, setIsLevelup] = React.useState(false);

  // 이미지 업로드 부분
  const fileInput = React.useRef();

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    // 파일 내용을 읽어온다.
    reader.readAsDataURL(file);
    // 읽기가 끝나면 발생하는 이벤트 핸들러.
    reader.onloadend = () => {
      //console.log(reader.result); // 파일 컨텐츠(내용물)
      setPreview(reader.result);
    };
    if (file) {
      setImage(file);
    }
  };

  const deleteImage = () => {
    setPreview("");
    setImage(null);
  };

  // 인증 게시글 추가하기
  const addPost = () => {
    // 서버에 보내기 위한 작업
    let formData = new FormData();
    if (content === "") {
      window.alert("내용을 입력해주세요!");
      return;
    }
    const contentJson = { content: content };
    formData.append(
      "post",
      new Blob([JSON.stringify(contentJson)], { type: "application/json" })
    );
    formData.append("postImage", image);

    memberApis
      .addPost(challengeId, formData)
      .then((res) => {
        console.log("인증 게시글 작성", res);
        setModalType("okModal");
        setModalOpen(true);
        if (res.data.experiencePoint === res.data.rankingPoint) {
          setIsLevelup(true);
        }
      })
      .catch((err) => {
        console.log("인증 게시글 작성 오류", err);
      });
    setPreview("");
  };
  // 인증 게시글 수정하기
  const editPost = () => {
    // 서버에 보내기 위한 작업
    let formData = new FormData();
    if (content === "") {
      window.alert("내용을 입력해주세요!");
      return;
    }
    const contentJson = { content: content };
    // formData.append("content", content);
    formData.append(
      "post",
      new Blob([JSON.stringify(contentJson)], { type: "application/json" })
    );
    formData.append("postImage", image);
    // formData api랑 통신하는 부분으로 dispatch 하기
    // 유저 정보랑 날짜 등 합치고 initialstate 형식에 맞추어서 딕셔너리 만들기
    // state 관리를 위한 작업 필요 : user 정보까지 포함해서 reducer에 전달해야 한다.
    const post = {
      nickname: userInfo.nickname,
      profileImage: "",
      content: content,
      postImage: preview, // 임시로 지정해둠
      comments: [], // 첫 게시글에는 댓글이 없으니까 일단 이렇게 설정했습니다.
    };
    memberApis
      .editPost(postId, formData)
      .then((res) => {
        console.log("인증 게시글 수정", res);
        // dispatch(memberAction.editPost(post));

        history.replace(`/post/${challengeId}/${roomId}`);
      })
      .catch((err) => {
        console.log("인증 게시글 수정 오류", err);
      });
    setPreview("");
  };

  React.useEffect(() => {
    dispatch(baseAction.setHeader(isEdit ? "수정하기" : "인증하기", false));

    if (isEdit) {
      //수정이면 특정 포스트 1개 조회하기 (default value 위해)
      dispatch(memberAction.getPostDB(challengeId));
    }
    dispatch(baseAction.setGnb(false));
    return () => {
      dispatch(baseAction.setHeader(false, ""));
      dispatch(baseAction.setGnb(true));
    };
  }, []);

  // 모달 팝업 ---------------------------------
  const [modalType, setModalType] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => {
    setModalType("openModal");
    console.log("챌린지 개설");
    setModalOpen(true);
  };

  const closeModal = () => {
    console.log("눌림");
    setModalOpen(false);
  };

  return (
    <Grid className="bg_color" padding="0px" height="700px">
      <Grid bg="#ffffff" padding="24px 20px">
        <h3>{userInfo.nickname}님, 오늘의 인증을 남겨주세요!</h3>
        {/* 이미지 업로드 부분 */}

        <ImageLabel
          className="input-file-button"
          htmlFor="input-file"
          src={preview ? preview : ""}
          default={plus}
        >
          <button onClick={() => deleteImage()}></button>
        </ImageLabel>
        <input
          id="input-file"
          type="file"
          onChange={selectFile}
          ref={fileInput}
          // disabled={is_uploading}
          style={{ display: "none" }}
        />

        {/* PostWrite의 작성 input */}

        <Input
          placeholder="오늘의 활동은 어떠셨나요? 소감을 남겨주세요."
          value={content}
          _onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </Grid>
      <Notice>
        <p className="bold sub_color">유의사항</p>
        <ul>
          <li className="sub_color">인증 사진은 필수입니다.</li>
          <li className="sub_color mt4">타인을 불쾌하게 하는 사진을 업로드 시 관리자의 권한에 따라 
삭제될 수 있습니다. </li>
        </ul>
      </Notice>
      <Fixed>
        <Button
          _onClick={openModal}
          disabled={preview === "" || content === "" ? "disabled" : ""}
        >
          {isEdit ? "수정하기" : "저장하기"}
        </Button>
      </Fixed>
      <Modal
        open={modalType === "openModal" ? modalOpen : ""}
        close={closeModal}
        double_btn
        btn_text={isEdit ? "수정" : "인증"}
        _onClick={() => {
          if (isEdit) {
            editPost();
          } else {
            addPost();
          }
        }}
      >
        <p>{isEdit ? "수정하시겠습니까?" : "인증하시겠습니까?"}</p>
      </Modal>
      <Modal
        open={modalType === "okModal" ? modalOpen : ""}
        close={closeModal}
        header
        isPrivate
      >
        <Grid>
          <CharacterImg></CharacterImg>
          <h2 style={{ marginBottom: "9px" }}>인증 완료</h2>
          <p style={{ marginBottom: "35px" }}>
            인증을 완료했습니다.
            <br />
            오늘도 즐거운 하루되세요!
          </p>
          <Button
            _onClick={() => {
              if (isLevelUp) {
                setModalType("levelUpModal");
                setModalOpen(true);
              } else {
                history.replace(`/post/${challengeId}/${roomId}`);
              }
            }}
          >
            확인
          </Button>
        </Grid>
      </Modal>
      <Modal
        open={modalType === "levelUpModal" ? modalOpen : ""}
        close={closeModal}
        header
        isPrivate
      >
        <Grid>
          <CharacterImg></CharacterImg>
          <h2 style={{ marginBottom: "9px" }}>Level UP!</h2>
          <p style={{ marginBottom: "35px" }}>
            축하합니다! {userInfo.level}이 되었습니다.
            <br />
            뭐가 달라졌는지 보러갈까요?
          </p>
          <Button
            _onClick={() => {
              history.replace(`/mypage`);
            }}
          >
            보러가기
          </Button>
        </Grid>
      </Modal>
    </Grid>
  );
};

const ImageLabel = styled.label`
  width: 100%;
  height: 280px;
  margin: 12px auto 16px;
  display: inline-block;
  position: relative;
  ${(props) => (props.src ? "border: none;" : "border: solid 1px #a2aab3;")}
  border-radius: 12px;
  cursor: pointer;
  background-image: url("${(props) => props.default}");
  background-position: center;
  background-size: 48px;
  overflow: hidden;
  ::before {
    width: 100%;
    height: 280px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /* 빈 값으로 넣어야 가상의 요소 생성; */
    content: "";

    background-image: url("${(props) => props.src}");
    background-position: center;
    background-size: cover;
    border-radius: 12px;
  }
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 280px;
    ${(props) => (props.src ? "background-color: rgba(3, 1, 2, 0.5);" : "")}
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 12px;
  }

  button {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
    background-image: url(${deleteIcon});
    background-size: cover;
    background-color: transparent;
    border: none;
    z-index: 2;
  }
`;
const Notice = styled.div`
  padding: 24px 20px;
  ul {
    margin-top: 8px;
    li {
      font-size: 13px;
      margin-left: 13px;
      list-style: disc;
    }
  }
`;

const Fixed = styled.div`
    width: 100%;
    position: fixed;
    background-color: #fff;
    bottom:0;
    left:0;
    padding:12px 20px;
    box-shadow: 0 -4px 8px 0 rgba(3, 1, 2, 0.04);
`;

const CharacterImg = styled.div`
  width: 120px;
  height: 120px;
  margin: 20px auto 13px;
  background-image: url(${confirmIcon});
  background-size: cover;
`;

export default PostWrite;
