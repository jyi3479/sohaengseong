import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as memberActions } from "../redux/modules/member";
import { Grid, Input, Button } from "../elements";

const PostWrite = (props) => {
  const dispatch = useDispatch();

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
          <div>
            {/* 이미지 업로드 부분 */}
            <ImageLabel className="input-file-button" htmlFor="input-file">
              사진 업로드
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
        </Grid>

        {/* PostWrite의 작성 input */}
        <Input
          textarea
          value={content}
          _onChange={(e) => {
            setContent(e.target.value);
          }}
        ></Input>
        <img
          src={
            preview
              ? preview
              : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAADVCAMAAACMuod9AAAAXVBMVEXv7+9mZmbs7OxfX1/39/d+fn6np6fX19fz8/POzs55eXlbW1uDg4PS0tJkZGRhYWFqamrn5+eLi4tWVlbh4eGUlJSqqqqhoaH7+/u+vr5vb2/Jycm/v7+Ojo6wsLDYus8vAAADXElEQVR4nO3b6XLiOhCGYWshtG0siWVCljNz/5c5LQhhiWAyFacO8rzPv2Bw1eeW1LIJTQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADcYMXKCKfRs4gd4TzfbT7MxzFUkFY6F3v3devYt2MMku/lZ6GbjWCR+uH+02ptR6mJLMY5z/eSbpQRKJq2itqOM99Ie39Ie4u91lUnmPZq1kmmFZHmSuDppZXN0G6ubIgnltbKZuvi2vzYSGlATyytn3frZFIMaVMq7sTSNj+jCSlq3lVT+MS00srcGZNCSsa4eeH4xNI+uxQ1qta3f55+bZ9dfNGwOpLjP5B23ufK5rjrtnC86rTiP7y0iPu0oZtWB7LWv66WFyuvH2La5Q2vpVgVp/Wvyc2Wl28dOuN699L6afVbaVN86WcXoazY/349vi7FyuWFaCpOK63J3SZ254+areb1XrfJxTuhWtP6IUQTc9zZ6cv27W7A7p6V7+prT26IKk0rw9vau1t9S5tEtRvOZ3d/daaVoQ+HtMl11743kW0n9ddW2vAeVjeJujIXM/itc4s8pt9fqTGtNtWYjrUtxc3zVx7WenOwypU91LfCtNp6jpXdi7O8zThZh2VpZRvy3Har/PfbgerSWhlMNJfiru+edZ0HF0Me5+uf9n2pri6tb81lZQ9xT3usf3RBB7ne2afdYN5/vLa0MiQX0se0eWU+dCLJq3EurDbkoIl1MNva0tpcOh3GpcruqtsdMlldjU/fFsLK79eputLqpuLjnD1w3X52Wvu07c/f5xa+vrR+cLEwio/V3Rc3h81z9jjMjVlIPlRTWtGw17O+x9VNRZ7Zx+uSH7m6RS58NWlz67md1bz13e2Hqa25damSmtLqLd4f0+oEXe777KWQd1X1fKPp2+RuzNlDFcNLviShlDeumlUlaeeD3rxfaz5nY1ZbbGEQpD7F+GPRz+8/re/MQxfMrfX4mLYs5EsVQ6ygtr5zn5izn1FDWulKm8Wppn3qPjGIJ5NW5+1ISHtv/r20I0zcVEva3sWv/3uynmJdQdrm18Moto/bzf8d5RPEy5MfQeEL3/sjdpxfP4zzY4zvZhu7zE8Uv2pZ/uYPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg7/0G6cMyGr/MjwcAAAAASUVORK5CYII="
          }
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "5px",
            margin: "10px auto",
          }}
        />
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

export default PostWrite;
