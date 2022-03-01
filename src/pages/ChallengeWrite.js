import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as memberActions } from "../redux/modules/member";
import { Grid, Input, Button } from "../elements";
// 이미지 swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const ChallengeWrite = (props) => {
  const dispatch = useDispatch();

  //  인증 게시글 수정은 어디서 할건지에 따라 is_edit 변수 활용하기
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState([]);
  const [preview, setPreview] = React.useState([]);

  // 이미지 업로드 부분
  const fileInput = React.useRef();

  const selectFile = (e) => {
    const fileArr = e.target.files;

    let fileURLs = [];

    let file;
    let filesLength = fileArr.length > 3 ? 3 : fileArr.length;

    // for 반복문을 돌려서 파일 내용물 담기
    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        fileURLs[i] = reader.result;
        setPreview([...fileURLs]);
      };
    }

    if (fileArr) {
      setImage(fileArr);
    }
  };

  // 인증 게시글 추가하기
  const addPost = () => {
    // 서버에 보내기 위한 작업
    console.log(image);
    let formData = new FormData();
    if (content === "") {
      window.alert("내용을 입력해주세요!");
      return;
    }

    formData.append("content", content);
    formData.append("postImage", image);

    // formData api랑 통신하는 부분으로 dispatch 하기

    // 유저 정보랑 날짜 등 합치고 initialstate 형식에 맞추어서 딕셔너리 만들기
    // state 관리를 위한 작업 필요 : user 정보까지 포함해서 reducer에 전달해야 한다.
    const post = {
      nickname: "닉네임",
      profileImage: "",
      content: content,
      postImage: preview, // 임시로 지정해둠
      comments: [], // 첫 게시글에는 댓글이 없으니까 일단 이렇게 설정했습니다.
    };

    dispatch(memberActions.addPost(post));
  };

  return (
    <Wrap>
      <div>
        {/* 이미지 업로드 부분 */}
        {/* 미리보기 swiper */}

        <img
          src={
            preview[0]
              ? preview[0]
              : "https://png.pngtree.com/element_our/20190601/ourlarge/pngtree-plus-icon-image_1338383.jpg"
          }
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "5px",
            margin: "10px auto",
          }}
        />
        <ImageLabel className="input-file-button" htmlFor="input-file">
          이미지 업로드
        </ImageLabel>
        <input
          id="input-file"
          type="file"
          onChange={selectFile}
          ref={fileInput}
          // disabled={is_uploading}
          multiple // 다중 업로드 가능
          accept="image/*, video/*" // 이미지에 해당하는 모든 파일 허용
          style={{ display: "none" }}
        />
      </div>
      <Input label="제목" />
      <Grid border="1px solid grey" margin="5px 0px" padding="5px">
        {/* PostWrite의 윗 부분 : 현재 로그인한 유저 정보 넣기*/}
        <Grid is_flex>
          <Grid is_flex width="auto">
            <ProfileImage
              size={40}
              src="https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png"
            />
            <p>닉네임</p>
          </Grid>
        </Grid>

        {/* PostWrite의 작성 input */}
        <Input
          textarea
          value={content}
          _onChange={(e) => {
            setContent(e.target.value);
          }}
        ></Input>

        <Button width="50px" _onClick={addPost}>
          입력
        </Button>
      </Grid>
    </Wrap>
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
  border: 1px solid #c0c0c0;
  border-radius: 5px;
  font-weight: 900;
  cursor: pointer;
`;

export default ChallengeWrite;
