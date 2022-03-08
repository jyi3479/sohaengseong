import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as memberActions } from "../redux/modules/member";
import { Grid, Input, Button } from "../elements";
import { useParams } from "react-router-dom";
import { memberApis } from "../shared/apis";
import plus from "../image/icons/btn_number_plus_l@2x.png";

const PostWrite = (props) => {
  const postId = useParams().postId;
  const isEdit = postId ? true : false;
  const dispatch = useDispatch();
  const challengeId = useParams().challengeId;
  const userInfo = useSelector((state) => state.user.user);

  //  인증 게시글 수정은 어디서 할건지에 따라 is_edit 변수 활용하기
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState("");

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
      .addPost(+challengeId, formData)
      .then((res) => {
        console.log("인증 게시글 작성", res);
        dispatch(memberActions.addPost(post));
        setPreview("");
      })
      .catch((err) => {
        console.log("인증 게시글 작성 오류", err);
      });
  };

  return (
    <Grid margin="16px 0px">
      <Grid is_flex>
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
          // placeholder={`${userInfo.nickname}님, 오늘의 인증을 남겨주세요`}
          placeholder={`주영주영님, 오늘의 인증을 남겨주세요`}
          border="none"
        ></Input>
      </Grid>

      <Button _onClick={addPost}>{isEdit ? "인증하기" : "수정하기"}</Button>
    </Grid>
  );
};

const Wrap = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProfileImage = styled.img`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  min-width: var(--size);
  min-height: var(--size);
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  border: 1px solid red;
`;

const ImageLabel = styled.label`
  /* border: 1px solid #c0c0c0;
  border-radius: 5px;
  font-weight: 900; */
  cursor: pointer;
`;

export default PostWrite;
