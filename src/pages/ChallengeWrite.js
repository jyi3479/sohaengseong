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
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    // 파일 내용을 읽어온다.
    reader.readAsDataURL(file);
    // 읽기가 끝나면 발생하는 이벤트 핸들러.
    reader.onloadend = () => {
      console.log(reader.result); // 파일 컨텐츠(내용물)
      setPreview([...preview, reader.result]);
    };
    if (file) {
      setImage([...image, file]);
    }
    // const fileArr = e.target.files;

    // let fileURLs = [];

    // let file;
    // let filesLength = fileArr.length > 3 ? 3 : fileArr.length;

    // // for 반복문을 돌려서 파일 내용물 담기
    // for (let i = 0; i < filesLength; i++) {
    //   file = fileArr[i];
    //   let reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     console.log(reader.result);
    //     fileURLs[i] = reader.result;
    //     setPreview([...fileURLs]);
    //   };
    // }

    // if (fileArr) {
    //   setImage(fileArr);
    // }
  };

  const deleteImage = (index) => {
    const imageArr = image.filter((el, idx) => idx !== index);
    const previewArr = preview.filter((el, idx) => idx !== index);

    setImage([...imageArr]);
    setPreview([...previewArr]);
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
    <Grid>
      <label
        htmlFor="select"
        style={{ fontSize: "14px", color: "#000", margin: 0 }}
      >
        어떤 주제로 진행하나요? *
      </label>
      <Select
        name="evaluation"
        //   onChange={(e) => {
        //     setEvaluation(e.target.value);
        //   }}
        //   value={evaluation}
      >
        <option value="">유형 선택</option>
        <option value="아주좋음">아주좋음</option>
        <option value="좋음">좋음</option>
        <option value="보통">보통</option>
        <option value="별로">별로</option>
        <option value="최악">최악</option>
      </Select>
      <Input
        label="함께 실천할 습관을 적어주세요. *"
        subLabel="상대방에게 불쾌감을 줄 수 있는 단어는 사용하지 않습니다."
        placeholder="예) 하루에 한번 물마시기"
      />
      <Input
        label="습관에 관한 내용을 입력해주세요. *"
        placeholder="설명, 인증 방법, 규칙 등을 자유롭게 적습니다."
        textarea
        padding="10px"
      />
      {/* 태그 부분 */}
      {/* 기간 선택 부분 */}
      <Input label="인원수를 선택해주세요. *" placeholder="최대 30명" />
      {/* 이미지 업로드 부분 */}
      <div>
        {preview.map((el, idx) => {
          return (
            <Grid padding="0px">
              <img
                key={idx}
                src={
                  preview[idx]
                    ? preview[idx]
                    : "https://png.pngtree.com/element_our/20190601/ourlarge/pngtree-plus-icon-image_1338383.jpg"
                }
                style={{
                  display: "inline-block",
                  width: "74px",
                  height: "74px",
                  margin: "17px 8px 28px 20px",
                }}
              />
              <button
                onClick={() => deleteImage(idx)}
                style={{ float: "right" }}
              >
                x
              </button>
            </Grid>
          );
        })}
        {preview.length < 3 && (
          <ImageLabel className="input-file-button" htmlFor="input-file">
            <img
              src="https://png.pngtree.com/element_our/20190601/ourlarge/pngtree-plus-icon-image_1338383.jpg"
              style={{
                width: "74px",
                height: "74px",

                margin: "17px 8px 28px 20px",
              }}
            />
          </ImageLabel>
        )}
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
    </Grid>
  );
};

const Wrap = styled.div`
  /* padding: 10px; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Select = styled.select`
  width: 335px;
  height: 46px;
  margin: 10px 20px 28px 0px;
  padding: 14px 22.3px 13px 20px;
  border: solid 1px #999;
  font-family: inherit;
  /* margin: 5px 0 20px 0px;
  min-width: 0;
  display: block;
  width: 100%;
  padding: 8px 8px;
  font-family: inherit; // font 상속
  line-height: inherit;
  border: 2px solid #acacac;
  border-radius: 10px;
  color: inherit;
  background-color: transparent; */
  &:focus {
    outline: none;
    border: 1px solid #000;
  }

  /* 방향 화살표 없애기 */
  /* -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; */
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

export default ChallengeWrite;
