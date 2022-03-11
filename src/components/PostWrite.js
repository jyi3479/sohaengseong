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
import plus from "../image/icons/btn_number_plus_l@2x.png";

const PostWrite = (props) => {
  const postId = +useParams().postId;
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

  // 이미지 업로드 부분
  const fileInput = React.useRef();

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    // 파일 내용을 읽어온다.
    reader.readAsDataURL(file);
    // 읽기가 끝나면 발생하는 이벤트 핸들러.
    reader.onloadend = () => {
      console.log(reader.result); // 파일 컨텐츠(내용물)
      setPreview(reader.result);
    };
    if (file) {
      setImage(file);
    }
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
    // formData.append("content", content);
    formData.append(
      "post",
      new Blob([JSON.stringify(contentJson)], { type: "application/json" })
    );
    formData.append("postImage", image);

    // formData api랑 통신하는 부분으로 dispatch 하기

    // // 유저 정보랑 날짜 등 합치고 initialstate 형식에 맞추어서 딕셔너리 만들기
    // // state 관리를 위한 작업 필요 : user 정보까지 포함해서 reducer에 전달해야 한다.
    // const post = {
    //   nickname: userInfo.nickname,
    //   profileImage: "",
    //   content: content,
    //   postImage: preview, // 임시로 지정해둠
    //   comments: [], // 첫 게시글에는 댓글이 없으니까 일단 이렇게 설정했습니다.
    // };
    memberApis
      .addPost(challengeId, formData)
      .then((res) => {
        console.log("인증 게시글 작성", res);
        setModalType("okModal");    
        setModalOpen(true);        
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
        console.log("인증 게시글 작성", res);
        // dispatch(memberAction.editPost(post));

        history.push(`/post/${challengeId}`);
      })
      .catch((err) => {
        console.log("인증 게시글 작성 오류", err);
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
    <Grid margin="16px 0px" padding="0px" height="700px" bg="#f5f5f5">
      <Grid display="flex" bg="#ffffff" style={{ alignItems: "flex-start" }}>
        {/* 이미지 업로드 부분 */}
        <div>
          <ImageLabel
            className="input-file-button"
            htmlFor="input-file"
            style={{
              width: "98px",
              height: "98px",
              margin: "0x 8px 0px 0px",
              display: "inline-block",
              position: "relative",
              border: "solid 1px #808080",
              verticalAlign: "top", // 최상단에 정렬 맞추기
              textAlign: "center", //이미지 가운데
            }}
          >
            <img
              src={
                preview
                  ? preview
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png"
              }
              style={{
                width: "98px",
                height: "98px",
              }}
            />
          </ImageLabel>
          <input
            id="input-file"
            type="file"
            onChange={selectFile}
            ref={fileInput}
            // disabled={is_uploading}
            style={{ display: "none" }}
          />
        </div>
        {/* PostWrite의 작성 input */}

        <Input
          textarea
          value={content}
          _onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder={`${userInfo.nickname}님, 오늘의 인증을 남겨주세요`}
          border="none"
          width="220px"
          margin="0 0 0 16px"
        ></Input>
      </Grid>
      <NoticeBox>
        <p>유의사항</p>
        <p>
          타인을 불쾌하게 하는 사진을 업로드 시 방장의 권한에 따라 재인증을
          해야할 수도 있습니다.
        </p>
      </NoticeBox>

      <Fixed>
        <Button
          width="calc(100% - 5px)"
          bg="#fff"
          style={{ color: "#666", border: "1px solid #666" }}
          _onClick={openModal}
        >
          {isEdit ? "수정하기" : "인증하기"}
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
          <div style={{width:"110px",height:"110px",backgroundColor:"#eee", margin:"20px auto 13px"}} ></div>
          <h1 style={{marginBottom:"9px"}}>인증 완료</h1>
          <p style={{marginBottom:"35px"}}>인증을 완료했습니다.<br/>오늘도 즐거운 하루되세요!</p>
          <Button _onClick={()=>{history.replace(`/post/${challengeId}`);}}>확인</Button>
        </Grid>        
      </Modal>
    </Grid>
  );
};

const ImageLabel = styled.label`
  /* border: 1px solid #c0c0c0;
  border-radius: 5px;
  font-weight: 900; */
  cursor: pointer;
`;

const NoticeBox = styled.div`
  padding: 20px;

  p:first-child {
    font-weight: 500;
    line-height: 1.43;
    text-align: left;
    color: #333;
    margin-bottom: 6px;
  }

  p:last-child {
    font-size: 12px;
    line-height: 1.58;
    text-align: left;
    color: #333;
  }
`;

const Fixed = styled.div`
  width: 100%;
  position: fixed;
  background-color: #fff;
  bottom: 0;
  left: 0;
  padding: 12px 20px;
  box-shadow: 0 -5px 6px 0 rgba(0, 0, 0, 0.04);
  button {
    border-radius: 5px;
  }
`;

export default PostWrite;
