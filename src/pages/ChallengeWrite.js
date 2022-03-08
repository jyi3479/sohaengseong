import React, { forwardRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// 기간 선택 라이브러리
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

import { actionCreators as challengeAction } from "../redux/modules/challenge";
import { actionCreators as baseAction } from "../redux/modules/base";
import { Grid, Input, Button } from "../elements";
import plus from "../image/icons/btn_number_plus_l@2x.png";

const ChallengeWrite = (props) => {
  const dispatch = useDispatch();

  // 추천 태그 리스트 가져오기
  const recommendList = useSelector((state) => state.search.recommend);
  console.log(recommendList);

  //수정 / 작성 유무 판별
  const params = useParams();
  const target = useSelector((state) => state.challenge.target);
  console.log(target);
  const isEdit = params.challengeId ? true : false;
  // 챌린지 시작 하루 전까지 수정 가능함 (오늘 날짜랑 시작일 비교하기)

  // Header 적용 (수정/작성 분기)
  React.useEffect(() => {
    dispatch(baseAction.setHeader(true, isEdit ? "수정하기" : "개설하기"));
    if (isEdit) {
      //수정이면 특정 챌린지 1개 조회하기 (default value 위해)
      dispatch(challengeAction.getOneChallengeDB(+params.challengeId));
      // // 기존에 입력한 태그 보여주기
      // const $HashWrapOuter = document.querySelector(".HashWrapOuter");
      // const $HashWrapInner = document.createElement("span");
      // $HashWrapInner.className = "HashWrapInner";
      // // 삭제 버튼 만들기
      // const $HashDelete = document.createElement("a");
      // $HashDelete.className = "HashDelete";

      // /* 삭제(x 표시)를 클릭 이벤트 관련 로직 */
      // $HashDelete.addEventListener("click", () => {
      //   $HashWrapOuter?.removeChild($HashWrapInner);

      //   console.log($HashWrapInner.innerHTML);
      //   setHashArr(hashArr.filter((hashtag) => hashtag));
      // });

      // // 입력했던 태그가 있을 경우
      // if (hashArr.length > 0) {
      //   console.log(hashArr);
      //   // hashArr.map((el, idx)=>{
      //   //   $HashWrapInner.innerHTML = e.target.value;
      //   //         $HashWrapOuter?.appendChild($HashWrapInner);
      //   //         $HashDelete.innerHTML = "x";
      //   //         $HashWrapInner?.appendChild($HashDelete);
      //   //   return null;
      //   // })
      //   // $HashWrapInner.innerHTML = e.target.value;
      //   // $HashWrapOuter?.appendChild($HashWrapInner);
      //   // $HashDelete.innerHTML = "x";
      //   // $HashWrapInner?.appendChild($HashDelete);
      //   // setHashArr((hashArr) => [...hashArr, hashtag]);
      //   // setHashtag("");
      // }
    }
    return () => {
      dispatch(baseAction.setHeader(false, ""));
    };
  }, []);

  const [title, setTitle] = React.useState(isEdit ? target.title : "");
  const [content, setContent] = React.useState(isEdit ? target.content : "");
  const [category, setCategory] = React.useState(isEdit ? target.category : "");
  const [maxMember, setMaxMember] = React.useState(
    isEdit ? target.maxMember : ""
  );

  //이미지 부분
  const [compareImage, setCompareImage] = React.useState(
    isEdit ? target.challengeImage : []
  );
  const [image, setImage] = React.useState([]);
  const [preview, setPreview] = React.useState(
    isEdit ? target.challengeImage : []
  );

  //해시태그 부분
  const [hashtag, setHashtag] = React.useState(""); //onChange로 관리할 문자열
  const [hashArr, setHashArr] = React.useState(isEdit ? target.tagName : []); // 해시태그 담을 배열

  // 날짜 선택 부분
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState(null);
  // 방 공개 여부
  const [checkedInputs, setCheckedInputs] = React.useState(
    isEdit ? (target.isPrivate ? "private" : "public") : null
  );
  const [password, setPassword] = React.useState(isEdit ? target.password : "");

  // 비밀방 여부 체크 함수
  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs(id); // checked가 true이면 해당 id값이 state에 저장된다.
    } else {
      setCheckedInputs(null);
    }
  };

  // 날짜 선택 input 커스텀
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <InputBox ref={ref}>
      {isEdit ? (
        <Input
          label="기간을 선택해주세요. (변경 불가)"
          value={`${target.startDate} - ${target.endDate}`}
          height="46px"
          onClick={onClick}
          disabled
        />
      ) : (
        <Input
          label="기간을 선택해주세요. *"
          placeholder="최소 2주"
          value={value}
          height="46px"
          onClick={onClick}
        />
      )}
    </InputBox>
  ));

  // 태그 관련 함수
  // 1. 태그 직접 입력 시
  const onKeyUp = React.useCallback(
    (e) => {
      //   if (process.browser) {
      /* 요소 불러오기, 만들기*/
      const $HashWrapOuter = document.querySelector(".HashWrapOuter");
      const $HashWrapInner = document.createElement("span");
      $HashWrapInner.className = "HashWrapInner";
      // 삭제 버튼 만들기
      const $HashDelete = document.createElement("a");
      $HashDelete.className = "HashDelete";

      /* 삭제(x 표시)를 클릭 이벤트 관련 로직 */
      $HashDelete.addEventListener("click", () => {
        $HashWrapOuter?.removeChild($HashWrapInner);

        console.log($HashWrapInner.innerHTML);
        setHashArr(hashArr.filter((hashtag) => hashtag));
      });

      /* enter 키 코드 :13 */
      if (e.keyCode === 13 && e.target.value.trim() !== "") {
        if (hashArr.length > 10) {
          window.alert("태그 작성 개수를 확인해주세요!");
        }
        console.log("Enter Key 입력됨!", e.target.value);
        $HashWrapInner.innerHTML = e.target.value;
        $HashWrapOuter?.appendChild($HashWrapInner);
        $HashDelete.innerHTML = "x";
        $HashWrapInner?.appendChild($HashDelete);
        setHashArr((hashArr) => [...hashArr, hashtag]);
        setHashtag("");
      }
    },
    [hashtag, hashArr]
  );

  // 2. 추천 키워드 클릭 시
  const recommendClick = React.useCallback(
    (keyword) => {
      //   if (process.browser) {
      /* 요소 불러오기, 만들기*/
      if (hashArr.length > 10) {
        window.alert("태그 작성 개수를 확인해주세요!");
      }
      const $HashWrapOuter = document.querySelector(".HashWrapOuter");
      const $HashWrapInner = document.createElement("span");
      $HashWrapInner.className = "HashWrapInner";
      // 삭제 버튼 만들기
      const $HashDelete = document.createElement("a");
      $HashDelete.className = "HashDelete";

      console.log("추천 키워드 입력!", keyword);
      $HashWrapInner.innerHTML = keyword;
      $HashWrapOuter?.appendChild($HashWrapInner);
      $HashDelete.innerHTML = "x";
      $HashWrapInner?.appendChild($HashDelete);
      setHashArr((hashArr) => [...hashArr, keyword]);
      setHashtag("");
      console.log(hashArr);

      /* 삭제(x 표시)를 클릭 이벤트 관련 로직 */
      $HashDelete.addEventListener("click", () => {
        console.log(keyword, hashArr);
        $HashWrapOuter?.removeChild($HashWrapInner);
        console.log($HashWrapInner.innerHTML);
        setHashArr(hashArr.filter((hashtag) => hashtag));
      });
    },
    [hashtag, hashArr]
  );
  console.log(hashArr);
  // 이미지 업로드 부분
  const fileInput = React.useRef();

  const selectFile = (e) => {
    const reader = new FileReader();

    const file = fileInput.current.files[0];
    console.log(file);
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
  };

  const deleteImage = (index) => {
    const imageArr = image.filter((el, idx) => idx !== index);
    const previewArr = preview.filter((el, idx) => idx !== index);

    setImage([...imageArr]);
    setPreview([...previewArr]);
    if (isEdit) {
      const compareArr = compareImage.filter((el, idx) => idx !== index);
      setCompareImage([...compareArr]);
    }
  };

  // 인증 게시글 추가하기
  const addChallenge = () => {
    if (content === "") {
      window.alert("내용을 입력해주세요!");
      return;
    }
    if (+maxMember > 30) {
      window.alert("30명 이하로 등록해주세요!");
      return;
    } else if (+maxMember === 0 || maxMember === "") {
      window.alert("모집 인원 수를 입력해주세요!");
      return;
    }
    // 서버에 보내기 위한 작업
    // 폼데이터 생성
    let formData = new FormData();

    // 날짜 형식 맞춰주는 함수
    function dateFormat(date) {
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();

      month = month >= 10 ? month : "0" + month;
      day = day >= 10 ? day : "0" + day;
      hour = hour >= 10 ? hour : "0" + hour;
      minute = minute >= 10 ? minute : "0" + minute;
      second = second >= 10 ? second : "0" + second;

      return (
        date.getFullYear() +
        "." +
        month +
        "." +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    }
    console.log(dateFormat(startDate));

    // 보낼 데이터 묶음 (이미지 제외)
    const data = {
      title: title,
      content: content,
      category: category,
      maxMember: parseInt(maxMember),
      startDate: dateFormat(startDate),
      endDate: dateFormat(endDate),
      isPrivate: checkedInputs === "private" ? true : false,
      password: checkedInputs === "private" ? password : null,
      tagName: hashArr,
    };

    for (let i = 0; i < image.length; i++) {
      formData.append("challengeImage", image[i]);
    }

    formData.append(
      "challenge",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    for (let value of formData.values()) {
      console.log(value);
    }

    // 폼데이터에 이미지와 데이터 묶어서 보내기
    console.log(image);

    // formData api랑 통신하는 부분으로 dispatch 하기(apis에서 미리 설정해둠)
    dispatch(challengeAction.addChallengeDB(formData));
  };

  // 인증 게시글 수정하기
  const editChallenge = () => {
    if (content === "") {
      window.alert("내용을 입력해주세요!");
      return;
    }

    // 서버에 보내기 위한 작업
    // 폼데이터 생성
    let formData = new FormData();

    // 보낼 데이터 묶음 (이미지 제외)
    const data = {
      image: compareImage,
      title: title,
      content: content,
      category: category,
      tagName: hashArr,
    };

    // 폼데이터에 이미지와 데이터 묶어서 보내기
    for (let i = 0; i < image.length; i++) {
      formData.append("challengeImage", image[i]);
    }
    // formData.append("challenge", data, { type: "application/json" });
    formData.append(
      "challenge",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    // formData api랑 통신하는 부분으로 dispatch 하기(apis에서 미리 설정해둠)
    dispatch(challengeAction.editChallengeDB(+params.challengeId, formData));
  };

  return (
    <Grid margin="78px 0px 0px" padding="0px" bg="#eeeeee">
      <InputContainer>
        <label
          htmlFor="select"
          style={{ fontSize: "14px", color: "#000", margin: 0 }}
        >
          어떤 주제로 진행하나요? *
        </label>
        <div>
          <Select
            name="evaluation"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
          >
            <option value="">카테고리 선택</option>
            <option value="일상 루틴">일상 루틴</option>
            <option value="운동">운동</option>
            <option value="스터디">스터디</option>
            <option value="식습관">식습관</option>
            <option value="힐링">힐링</option>
            <option value="취미">취미</option>
            <option value="셀프케어">셀프케어</option>
            <option value="펫">펫</option>
            <option value="친환경">친환경</option>
          </Select>

          <Input
            label="함께 실천할 습관을 적어주세요. *"
            subLabel="상대방에게 불쾌감을 줄 수 있는 단어는 사용하지 않습니다."
            placeholder="예) 하루에 한번 물마시기"
            maxLength="20"
            value={title}
            _onChange={(e) => setTitle(e.target.value)}
            height="46px"
          />

          <CountBox>({title.length}/20)</CountBox>
        </div>
        <InputBox>
          <Input
            label="챌린지에 관한 내용을 입력해주세요. *"
            placeholder="설명, 인증 방법, 규칙 등을 자유롭게 적습니다."
            textarea
            maxLength="1000"
            value={content}
            _onChange={(e) => setContent(e.target.value)}
            padding="14px 35px 13px 10px"
          />
          <CountBox>({content.length}/1000)</CountBox>
        </InputBox>
        {/* 태그 부분 */}
        <InputBox>
          <p style={{ fontSize: "14px", margin: "0px 0px 10px" }}>
            태그를 작성해주세요.{" "}
            <span style={{ color: "#797979" }}>(최대 10개)</span>
          </p>
          {/* 태그 입력 부분 */}

          <HashWrap className="HashWrap">
            {/* 동적으로 생성되는 태그를 담을 div */}
            <span className="HashWrapOuter"></span>
            <input
              className="HashInput"
              placeholder={
                hashArr.length > 0
                  ? ""
                  : "챌린지를 설명할 수 있는 단어를 적습니다."
              }
              value={hashtag}
              onChange={(e) => setHashtag(e.target.value)}
              onKeyUp={onKeyUp}
              maxLength="6"
            />
          </HashWrap>

          {/* 추천키워드 부분 */}
          <Grid margin="14px 0px" padding="0px">
            <span
              style={{
                fontSize: "13px",
                color: "#383838",
                marginRight: "10px",
              }}
            >
              추천키워드
            </span>
            {recommendList.map((el, idx) => {
              return (
                <HashButton
                  key={idx}
                  onClick={() => {
                    recommendClick(el);
                  }}
                  disabled={hashArr.includes(el)}
                >
                  {el}
                </HashButton>
              );
            })}
          </Grid>
        </InputBox>
      </InputContainer>
      {/* 기간 선택 부분 */}
      <InputContainer>
        <DatePicker
          locale={ko} // 달력 한글화
          dateFormat="yyyy.MM.dd" // 날짜형식
          showPopperArrow={false} // popover 화살표 없애기
          fixedHeight // 고정된 height에서 남은 공간은 다음 달로 채워지기
          selected={startDate} // 날짜 state
          startDate={startDate}
          endDate={endDate}
          selectsRange
          minDate={new Date()} // 과거 날짜 disable
          // inline
          // excludeDateIntervals={[
          //   { start: subDays(startDate, 0), end: addDays(startDate, 14) },
          // ]}
          onChange={(dates) => {
            const [start, end] = dates;
            let range = (end - start) / (1000 * 60 * 60 * 24);
            if (end && range < 14) {
              window.alert("2주 이상 선택해주세요!");
              setStartDate("");
            } else {
              setStartDate(start);
              setEndDate(end);
            }
          }}
          customInput={<CustomInput />}
        />

        {/* 인원수 선택 부분 */}
        <InputBox>
          {isEdit ? (
            <Input
              label="인원수를 선택해주세요. (변경 불가)"
              placeholder="최대 30명"
              value={maxMember}
              _onChange={(e) => setMaxMember(e.target.value)}
              height="46px"
              disabled
            />
          ) : (
            <Input
              label="인원수를 선택해주세요. *"
              placeholder="최대 30명"
              value={maxMember}
              _onChange={(e) => {
                setMaxMember(e.target.value);
              }}
              height="46px"
            />
          )}
        </InputBox>

        {/* 이미지 업로드 부분 */}
        <InputBox>
          <p style={{ fontSize: "14px", margin: "0px" }}>
            사진을 첨부해주세요.{" "}
            <span style={{ color: "#797979" }}>(최대 3건)</span>
          </p>
          <p style={{ fontSize: "12px", margin: "0px", color: "#808080" }}>
            첫번째 이미지가 대표 이미지로 등록됩니다.
          </p>
          <div
            sytle={{
              display: "flex",
              whiteSpace: "nowrap",
              overflowX: "scroll",
            }}
          >
            {preview.map((el, idx) => {
              return (
                <div
                  key={idx}
                  style={{
                    padding: "0px",
                    width: "auto",
                    display: "inline-block",
                    position: "relative",
                  }}
                >
                  <img
                    src={
                      preview[idx]
                        ? preview[idx]
                        : "https://png.pngtree.com/element_our/20190601/ourlarge/pngtree-plus-icon-image_1338383.jpg"
                    }
                    style={{
                      width: "74px",
                      height: "74px",
                      margin: "17px 8px 0px 0px",
                    }}
                  />
                  <span
                    onClick={() => deleteImage(idx)}
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      cursor: "pointer",
                    }} // absolute로 하기
                  >
                    x
                  </span>
                </div>
              );
            })}
            {preview.length < 3 && (
              <ImageLabel
                className="input-file-button"
                htmlFor="input-file"
                style={{
                  width: "74px",
                  height: "74px",
                  margin: "17px 8px 0px 0px",
                  display: "inline-block",
                  position: "relative",
                  border: "solid 1px #808080",
                  verticalAlign: "top", // 최상단에 정렬 맞추기
                  textAlign: "center", //이미지 가운데
                }}
              >
                <img
                  src={plus}
                  style={{
                    width: "18px",
                    margin: "27px 0px 0px",
                  }}
                ></img>
              </ImageLabel>
            )}
          </div>

          <input
            id="input-file"
            type="file"
            onChange={selectFile}
            ref={fileInput}
            // disabled={is_uploading}
            // multiple // 다중 업로드 가능
            accept="image/*" // 이미지에 해당하는 모든 파일 허용 (JPG,JPEG,GIF,PNG 제한?)
            style={{ display: "none" }}
          />
        </InputBox>
        {/* 비밀방 여부 */}
        <InputBox>
          {isEdit ? (
            <Grid is_flex padding="0px">
              <p>방 공개 여부</p>
              <Grid is_flex width="auto">
                <Grid width="auto">
                  <input
                    type="checkbox"
                    id="public"
                    checked={checkedInputs === "public" ? true : false}
                    disabled
                  />
                  <label htmlFor="public">공개</label>
                </Grid>
                <Grid width="auto">
                  <input
                    type="checkbox"
                    id="private"
                    checked={checkedInputs === "private" ? true : false}
                    disabled
                  />
                  <label htmlFor="private">비밀</label>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid is_flex padding="0px">
              <p>방 공개 여부</p>
              <Grid is_flex width="auto">
                <Grid width="auto">
                  <input
                    type="checkbox"
                    id="public"
                    onChange={(e) => {
                      changeHandler(e.currentTarget.checked, "public");
                      console.log(e.currentTarget.checked);
                    }}
                    checked={checkedInputs === "public" ? true : false}
                  />
                  <label htmlFor="public">공개</label>
                </Grid>
                <Grid width="auto">
                  <input
                    type="checkbox"
                    id="private"
                    onChange={(e) => {
                      changeHandler(e.currentTarget.checked, "private");
                      console.log(e.currentTarget.checked);
                    }}
                    checked={checkedInputs === "private" ? true : false}
                  />
                  <label htmlFor="private">비밀</label>
                </Grid>
              </Grid>
            </Grid>
          )}
          <InputBox>
            {checkedInputs === "private" &&
              (isEdit ? (
                <Input
                  // type="password"
                  label="비밀번호 설정 (변경 불가)"
                  placeholder="비밀번호를 입력해주세요."
                  value={password}
                  _onChange={(e) => setPassword(e.target.value)}
                  height="46px"
                  margin="0px 0px 20px"
                  disabled
                />
              ) : (
                <Input
                  // type="password"
                  label="비밀번호 설정"
                  placeholder="비밀번호를 입력해주세요.(숫자 4자리)"
                  value={password}
                  _onChange={(e) => setPassword(e.target.value)}
                  height="46px"
                  margin="0px 0px 20px"
                  maxLength="4"
                />
              ))}
          </InputBox>
        </InputBox>
      </InputContainer>
      <ButtonContainer>
        {isEdit ? (
          <Button _onClick={editChallenge}>수정하기</Button>
        ) : (
          <Button _onClick={addChallenge}>등록하기</Button>
        )}
      </ButtonContainer>
    </Grid>
  );
};

const InputContainer = styled.div`
  background-color: #ffffff;
  padding: 0px 20px 20px;
  margin: 0px 0px 22px 0px;
`;

const ButtonContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
`;

const Select = styled.select`
  width: 335px;
  height: 46px;
  margin: 10px 20px 28px 0px;
  padding: 13px 10px;
  border: solid 1px #999;
  font-family: inherit;
  color: #808080;
  &:focus {
    outline: none;
    border: 1px solid #000;
    color: #000;
  }

  /* 방향 화살표 없애기 + 화살표 모양 바꾸기 */
  /* -webkit-appearance: none; 
  -moz-appearance: none;
  appearance: none;
  background: url("../image/icons/ic_dropdown@2x.png") no-repeat right 9px
    center; */
`;

const InputBox = styled.div`
  margin-top: 20px;
`;

const CountBox = styled.p`
  width: 100%;
  height: 19px;
  margin-top: 4px;
  font-size: 13px;
  text-align: right;
  color: #808080;
`;

const ImageLabel = styled.label`
  /* border: 1px solid #c0c0c0;
  border-radius: 5px;
  font-weight: 900; */
  cursor: pointer;
`;

/* emotion css 태그 */
const HashWrap = styled.div`
  height: 46px;
  color: rgb(52, 58, 64);
  font-size: 1.125rem;
  display: flex;
  flex-wrap: nowrap;
  letter-spacing: -0.6px;

  border: solid 1px #999;
  /* padding: 2px 2px 8px 2px; */

  // 생성된 태그 박스 span 태그 css
  .HashWrapOuter {
    display: inline-block;
    vertical-align: top;
    white-space: nowrap;
    padding-left: 10px;
    margin-top: 5px;
  }
  // 생성된 태그 내용물 span 태그 css
  .HashWrapInner {
    height: 22px;
    background: #ededed;
    opacity: 0.9;
    border-radius: 5px;
    margin: 5px 5px 0px 0px;
    padding: 2px 4px;
    align-items: center;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    font-size: 12px;
    text-align: center;
    color: #7b7b7b;
  }
  //생성된 태그 삭제 표시 css
  .HashDelete {
    margin: 0px 3px 2px 4px;
    color: #000000 !important;
    font-family: inherit;
    font-weight: 700;
    cursor: pointer;
  }

  // 태그 작성 input
  .HashInput {
    width: 100%;
    display: inline-block;
    vertical-align: top;
    outline: none;
    cursor: text;
    line-height: 2rem;
    /* min-width: 8rem; */
    border: none;
    font-family: inherit;
  }
`;

// 추천키워드 버튼
const HashButton = styled.button`
  background: #ededed;
  color: #7b7b7b;
  height: 22px;
  ${(props) => (props.disabled ? `opacity: 0.5;` : `opacity: 0.9;`)};

  border-radius: 5px;
  border: none;
  margin: 5px 5px 0px 6px;
  padding: 2px 4px;
  align-items: center;
  font-weight: normal;
  font-family: inherit;
  font-size: 12px;
  text-align: center;
`;

export default ChallengeWrite;
