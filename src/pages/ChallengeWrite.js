/* eslint-disable no-loop-func */
import React from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as challengeAction } from "../redux/modules/challenge";
import { actionCreators as baseAction } from "../redux/modules/base";
import { actionCreators as searchAction } from "../redux/modules/search";

// 기간 선택 라이브러리(MUI)
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";

//스크롤바 커스텀
import ScrollBar from "../components/shared/ScrollBar";

//heic 이미지 파일을 jpeg로 변환하는 라이브러리
import heic2any from "heic2any";
// 이미지 압축 라이브러리
import imageCompression from "browser-image-compression";

import { Grid, Input, Button, Image } from "../elements";
import Modal from "../components/shared/Modal";

import plus from "../image/icon/ic_plus_g@2x.png";
import drop from "../image/icons/ic_dropdown@2x.png";
import defaultImg from "../image/ic_empty_s@2x.png";
import deleteIcon from "../image/icon/btn_delete_g@2x.png";
import deleteIconW from "../image/icon/btn_delete_s@2x.png";
import { challengeApis } from "../shared/apis";

const ChallengeWrite = (props) => {
  const dispatch = useDispatch();

  //수정 / 작성 유무 판별
  const params = useParams();
  const target = useSelector((state) => state.challenge.target);
  const isEdit = params.challengeId ? true : false;

  React.useEffect(() => {
    // Header 적용 (수정/작성 분기)
    dispatch(baseAction.setHeader(isEdit ? "행성 수리하기" : "행성 만들기"));
    dispatch(baseAction.setGnb(false));

    //추천 키워드 불러오기
    dispatch(searchAction.getRecommendDB());

    if (isEdit) {
      //수정이면 특정 챌린지 1개 조회하기 (default value 위해)
      challengeApis
        .getOneChallenge(params.challengeId)
        .then((res) => {
          setTitle(res.data.title);
          setContent(res.data.content);
          setCategory(res.data.category);
          setMaxMember(res.data.currentMember);
          setCompareImage(res.data.challengeImage);
          setPreview(res.data.challengeImage);
          setHashArr(res.data.tagName);
          setStartDate(res.data.startDate);
          setEndDate(res.data.endDate);
          setCheckedInputs(res.data.isPrivate ? "private" : "public");
          setPassword(res.data.isPrivate ? res.data.password : "");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      dispatch(baseAction.setHeader(""));
      dispatch(baseAction.setGnb(true));
    };
  }, []);

  // state 관리 부분 ------------------------------------------------------------------------

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [maxMember, setMaxMember] = React.useState("");

  //이미지 부분
  const [image, setImage] = React.useState([]);
  const [compareImage, setCompareImage] = React.useState([]); // 기존에 작성했던 이미지 url 담은 state (이미지 수정 시 새로운 이미지 등록과 비교하기 위해)
  const [preview, setPreview] = React.useState([]);
  //해시태그 부분
  const [hashArr, setHashArr] = React.useState([]); // 태그 담을 배열

  // 날짜 선택 부분
  const [value, setValue] = React.useState([null, null]);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [dateFocus, setDateFocus] = React.useState(false); // 날짜 선택 입력창 활성화 여부

  // 방 공개 여부
  const [checkedInputs, setCheckedInputs] = React.useState(null);
  const [password, setPassword] = React.useState("");

  // 비밀방 여부 체크 함수 ------------------------------------------------------------------------------
  const changeHandler = (checked, id) => {
    if (checked) {
      // checked가 true이면 해당 id값(private/public)이 state에 저장된다.(체크된 박스가 어떤 박스인지 알도록)
      setCheckedInputs(id);
    } else {
      setCheckedInputs(null);
    }
  };

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

    return date.getFullYear() + "." + month + "." + day + " " + hour + ":" + minute + ":" + second;
  }

  // 인증 게시글 추가하기 --------------------------------------------------------------------
  const addChallenge = () => {
    // 예외처리
    if (parseInt(maxMember)) {
      // 숫자만 추출해서 유효성 검사하기
      if (parseInt(maxMember) > 30) {
        window.alert("30명 이하로 등록해주세요.");
        return;
      } else if (parseInt(maxMember) <= 0 || maxMember === "") {
        window.alert("모집 인원 수를 입력해주세요!");
        return;
      }
    } else {
      // 문자만 입력했을 때
      window.alert("모집 인원 수를 입력해주세요.");
      return;
    }

    // 비밀번호 유효성 검사(숫자 4자리 정규식 적용)
    if (checkedInputs === "private") {
      const pwdRegex = /[0-9].{3,4}$/;
      if (!pwdRegex.test(password)) {
        window.alert("비밀번호 숫자 4자리를 입력해주세요!");
        return;
      }
    }

    // 서버에 보내기 위한 작업

    let formData = new FormData();
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

    formData.append("challenge", new Blob([JSON.stringify(data)], { type: "application/json" }));

    dispatch(challengeAction.addChallengeDB(formData));
  };

  // 인증 게시글 수정하기 ------------------------------------------------------------------------------
  const editChallenge = () => {
    // 서버에 보내기 위한 작업
    // 폼데이터 생성
    let formData = new FormData();
    // 보낼 데이터 묶음 (새로 업로드된 이미지 제외, 기존에 등록된 이미지 url 포함)
    const data = {
      image: compareImage,
      title: title,
      content: content,
      category: category,
      tagName: hashArr,
    };

    // 폼데이터에 새로운 이미지와 데이터 묶어서 보내기
    for (let i = 0; i < image.length; i++) {
      formData.append("challengeImage", image[i]);
    }
    formData.append("challenge", new Blob([JSON.stringify(data)], { type: "application/json" }));

    dispatch(challengeAction.editChallengeDB(+params.challengeId, formData));
  };

  // 모달 팝업 ---------------------------------
  const [modalType, setModalType] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const rooms = React.useRef();
  const openModal = () => {
    if (!isEdit) {
      //필수항목이 모두 입력되었을 때만 모달 팝업 show
      if (title !== "" && content !== "" && category !== "" && maxMember !== "" && checkedInputs !== null && !value.includes(null)) {
        setToast(false);
        setModalType("openModal");
        setModalOpen(true);
      } else {
        //필수항목 중 하나라도 입력이 되지않았다면 토스트 메시지 띄우기
        if (category === "") {
          document.getElementById("category").focus(); //입력 안된 항목으로 스크롤 포커스
        } else if (title === "") {
          document.getElementById("title").focus();
        } else if (content === "") {
          document.getElementById("content").focus();
        } else if (value.includes(null)) {
          document.getElementById("date").focus();
        } else if (maxMember === "") {
          document.getElementById("members").focus();
        } else if (checkedInputs === null) {
          rooms.current.scrollIntoView();
        }

        setToast(true);
        setTimeout(() => {
          //2초 후에 토스트메시지 사라지게 설정
          setToast(false);
        }, 2000);
      }
    } else {
      setModalType("openModal");
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid margin="48px 0px 64px" padding="0" bg="#f4f6fa">
      <InputContainer id="category">
        <MemorizedSelectCategory category={category} setCategory={setCategory} />
        <MemorizedTitle title={title} setTitle={setTitle} />
        <MemorizedContent content={content} setContent={setContent} />
        <MemorizedTag hashArr={hashArr} setHashArr={setHashArr} />
      </InputContainer>
      {/* 기간 선택 부분 */}
      <InputContainer>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div>
            <p style={{ fontSize: "16px", margin: "0px 0px 2px" }}>기간을 선택해주세요.</p>
            <p className="small sub_color">시작날짜와 종료날짜를 선택하여 기간을 설정할 수 있습니다.</p>
            <MobileDateRangePicker
              calendars={1}
              value={value}
              minDate={new Date()} // 오늘 이전 날짜 선택 못 함
              onChange={(newValue) => {
                setValue(newValue);

                const range = (newValue[1] - newValue[0]) / (1000 * 60 * 60 * 24);
                if (newValue[1] && range < 14) {
                  window.alert("2주 이상 선택해주세요!");
                  setValue([null, null]);
                } else {
                  setStartDate(newValue[0]);
                  setEndDate(newValue[1]);
                }
              }}
              renderInput={(startProps, endProps, inputRef) => (
                <React.Fragment>
                  {isEdit ? (
                    <DateBox className="ok">
                      <input id="date" style={{ color: "#a2aab3", cursor: "default" }} value={startDate?.split(" ")[0] + " - " + endDate?.split(" ")[0]} disabled />
                    </DateBox>
                  ) : (
                    <DateBox className={dateFocus ? "active" : !value.includes(null) ? "ok" : ""}>
                      <input
                        id="date"
                        ref={startProps.inputRef}
                        {...startProps.inputProps}
                        placeholder="예) 2022.03.06 - 2022.03.19"
                        value={startDate || endDate ? (startDate ? dateFormat(startDate).split(" ")[0] : "") + " - " + (endDate ? dateFormat(endDate).split(" ")[0] : "") : ""}
                        onFocus={() => setDateFocus(true)}
                        onBlur={() => setDateFocus(false)}
                      />
                    </DateBox>
                  )}
                </React.Fragment>
              )}
            />
          </div>
        </LocalizationProvider>

        {/* 인원수 선택 부분 */}
        <MemorizedMember maxMember={maxMember} setMaxMember={setMaxMember} isEdit={isEdit} />

        {/* 이미지 업로드 부분 */}
        <MemorizedImage image={image} setImage={setImage} preview={preview} setPreview={setPreview} compareImage={compareImage} setCompareImage={setCompareImage} isEdit={isEdit} />
        {/* 비밀방 여부 */}
        <InputBox id="rooms" ref={rooms}>
          {isEdit ? (
            <Grid is_flex padding="0px" style={{ justifyContent: "flex-start" }}>
              <p style={{ fontSize: "16px" }}>방 공개 여부</p>
              <Grid is_flex width="auto" padding="0">
                <Grid width="auto">
                  <label htmlFor="public" className="style_checkbox">
                    <input type="checkbox" id="public" checked={checkedInputs === "public" ? true : false} disabled />
                    <label htmlFor="public"></label>
                  </label>
                  <label htmlFor="public" className="font14">
                    공개
                  </label>
                </Grid>
                <Grid width="auto">
                  <label className="style_checkbox">
                    <input type="checkbox" id="private" checked={checkedInputs === "private" ? true : false} disabled />
                    <label htmlFor="private"></label>
                  </label>
                  <label htmlFor="private" className="font14">
                    비밀
                  </label>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid is_flex padding="0px" style={{ justifyContent: "flex-start" }}>
              <p style={{ fontSize: "16px" }}>방 공개 여부</p>
              <Grid is_flex width="auto" padding="0" style={{ justifyContent: "flex-start" }}>
                <Grid width="auto" padding="0" margin="0 0 0 20px">
                  <label htmlFor="public" className="style_checkbox">
                    <input
                      type="checkbox"
                      id="public"
                      onChange={(e) => {
                        changeHandler(e.currentTarget.checked, "public");
                      }}
                      checked={checkedInputs === "public" ? true : false}
                    />
                    <label htmlFor="public"></label>
                  </label>

                  <label htmlFor="public" className="font14">
                    공개
                  </label>
                </Grid>
                <Grid width="auto" padding="0" margin="0 0 0 20px">
                  <label className="style_checkbox">
                    <input
                      type="checkbox"
                      id="private"
                      onChange={(e) => {
                        changeHandler(e.currentTarget.checked, "private");
                      }}
                      checked={checkedInputs === "private" ? true : false}
                    />
                    <label htmlFor="private"></label>
                  </label>
                  <label htmlFor="private" className="font14">
                    비밀
                  </label>
                </Grid>
              </Grid>
            </Grid>
          )}
          <InputBox className="private_box">
            {checkedInputs === "private" &&
              (isEdit ? (
                <div className="private_input">
                  <Input
                    // type="password"
                    label="비밀번호를 설정해주세요."
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    _onChange={(e) => setPassword(e.target.value)}
                    disabled
                  />
                </div>
              ) : (
                <div className="private_input">
                  <Input label="비밀번호를 설정해주세요." placeholder="비밀번호를 입력해주세요.(숫자 4자리)" value={password} _onChange={(e) => setPassword(e.target.value)} maxLength="4" />
                </div>
              ))}
          </InputBox>
        </InputBox>
      </InputContainer>
      <Notice>
        <p className="bold sub_color">유의사항</p>
        <ul>
          <li className="sub_color">카테고리,제한 인원, 기간은 개설 이후 소행성측에서도 변경할 수 없으니, 개설 전 확인 부탁드립니다.</li>
          <li className="sub_color mt4">인증 규정에 관한 참여자의 문의는 채팅방을 통해 직접 답변해 주시길 바랍니다.</li>
          <li className="sub_color mt4">개설자도 함께 습관 형성에 참여해야하며, 시작 이후 개설자는 중도 포기가 불가능합니다.</li>
          <li className="sub_color mt4"> 규정에 맞지 않는 게시글은 관리자에 의해 삭제될 수 있습니다.</li>
        </ul>
      </Notice>
      <ButtonContainer>
        {isEdit ? (
          <Button _onClick={openModal} disabled={title !== "" || content !== "" || category !== "" ? "" : "disabled"}>
            수정하기
          </Button>
        ) : (
          <Button _onClick={openModal} disabled={title !== "" || content !== "" || category !== "" || maxMember !== "" || checkedInputs !== null || !value.includes(null) ? "" : "disabled"}>
            개설하기
          </Button>
        )}
      </ButtonContainer>
      <Toast className={toast ? "show" : ""}>
        <p className="small">
          {category === ""
            ? "카테고리를 선택해주세요."
            : title === ""
            ? "챌린지 제목을 적어주세요."
            : content === ""
            ? "챌린지 내용을 적어주세요."
            : value.includes(null)
            ? "기간을 선택해주세요."
            : maxMember === ""
            ? "제한 인원을 작성해주세요."
            : checkedInputs === null
            ? "방 공개 여부를 선택해주세요."
            : null}
        </p>
      </Toast>
      <Modal
        open={modalType === "openModal" ? modalOpen : ""}
        close={closeModal}
        double_btn
        btn_text={isEdit ? "수정" : "만들기"}
        _onClick={() => {
          if (isEdit) {
            editChallenge();
          } else {
            addChallenge();
          }
        }}
      >
        <p>{isEdit ? "행성을 수리하시겠습니까?" : "행성을 만드시겠습니까?"}</p>
      </Modal>
    </Grid>
  );
};

const InputContainer = styled.div`
  background-color: #ffffff;
  padding: 24px 20px;
  &:first-child {
    margin-bottom: 12px;
  }
  .label {
    font-size: 16px !important;
  }
  .label + .sub_label {
    margin-top: 2px;
    color: #7c8288;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  position: fixed;
  background-color: #fff;
  bottom: 0;
  left: 0;
  padding: 11px 20px;
  box-shadow: 0 -4px 8px 0 rgba(3, 1, 2, 0.04);
  z-index: 3;
`;

//토스트 메시지
const Toast = styled.div`
  position: fixed;
  width: 100%;
  bottom: 64px;
  left: 0;
  height: 40px;
  padding: 11px 24px;
  background-color: rgba(3, 1, 2, 0.8);
  bottom: 24px;
  transition: 0.4s;
  z-index: 2;
  p {
    color: #fff;
  }
  &.show {
    opacity: 1;
    bottom: 64px;
  }
`;

const Select = styled.div`
  position: relative;
  width: 100%;
  padding: 8px 0;
  border: none;
  border-bottom: 1px solid rgba(124, 130, 136, 0.5);
  outline: none;
  img {
    position: absolute;
    top: 8px;
    right: 0;
    width: 16px;
  }

  &.active {
    outline: none;
    border-bottom: 1px solid #4149d3;
    .label {
      color: rgba(124, 130, 136, 1);
    }
    img {
      transform: rotate(180deg);
    }
  }

  &.ok {
    border-bottom: 1px solid #7c8288;
    .label {
      color: #030102;
    }
  }
  .label {
    display: flex;
    align-items: center;
    width: 100%;
    height: inherit;
    border: 0 none;
    outline: 0 none;
    background: transparent;
    font-size: 14px !important;
    color: rgba(124, 130, 136, 0.5);
    cursor: pointer;
  }
  .optionList {
    transform: scaleY(0);
    transform-origin: 0px 0px;
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    height: 300px;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(3, 1, 2, 0.08);
    border-radius: 4px;
    overflow: hidden;
    transition: 0.2s ease-in;
    opacity: 0;
    padding: 6px 0;
    z-index: 2;
    > li {
      font-size: 12px;
      padding: 9px 10px;
      color: #030102;
      line-height: 14px;
      cursor: pointer;
      :hover {
        background-color: rgba(162, 170, 179, 0.2);
      }
    }
    &#active {
      transform: scaleY(1);
      opacity: 1;
    }
  }
`;

const InputBox = styled.div`
  margin-top: 28px;
  &.private_box {
    margin-top: 0;
    .private_input {
      margin-top: 20px;
    }
  }
`;

const DateBox = styled.div`
  width: 100%;
  padding: 8px 0px;
  border: none;
  border-bottom: solid 1px rgba(124, 130, 136, 0.5);
  background-color: transparent;

  input {
    border: none;
    width: 100%;
    cursor: pointer;
    ::placeholder {
      font-size: 14px;
      color: rgba(124, 130, 136, 0.5);
      line-height: 1.29;
    }
  }

  &.active {
    outline: none;
    border-bottom: 1px solid #4149d3;
  }

  &.ok {
    border-bottom: 1px solid #7c8288;
  }
`;

const CountBox = styled.p`
  font-size: 12px;
  font-weight: normal;
`;

const ImgBox = styled.div`
  display: inline-block;
  position: relative;
  padding: 0px;
  width: 72px;
  height: 72px;
  margin: 12px 8px 0 0;
  border-radius: 12px;
  overflow: hidden;
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(3, 1, 2, 0.5);
    left: 0;
    top: 0;
  }
  button {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 6px;
    right: 6px;
    cursor: pointer;
    background-image: url(${deleteIconW});
    background-size: cover;
    background-color: transparent;
    border: none;
    z-index: 2;
  }
`;

const ImageLabel = styled.label`
  cursor: pointer;
  width: 72px;
  height: 72px;
  margin: 12px 8px 0px 0px;
  display: inline-block;
  position: relative;
  border: solid 1px #a2aab3;
  vertical-align: top; // 최상단에 정렬 맞추기
  text-align: center; //이미지 가운데
  border-radius: 12px;
`;

/* emotion css 태그 */
const WholeBox = styled.div`
  color: rgb(52, 58, 64);
  font-size: 12px;
  display: flex;
  border-bottom: solid 1px rgba(124, 130, 136, 0.5);
  padding: 8px 0;

  input {
    width: 100vw;
    display: inline-block;
    vertical-align: top;
    outline: none;
    cursor: text;
    border: none;
    font-family: inherit;
    ::placeholder {
      font-size: 14px;
      color: rgba(124, 130, 136, 0.5);
      line-height: 1.29;
    }
  }

  &.active {
    outline: none;
    border-bottom: 1px solid #4149d3;
  }

  &.ok {
    border-bottom: 1px solid #7c8288;
  }
`;

const TagBox = styled.div`
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
`;

const TagItem = styled.span`
  display: inline-block;
  background: rgba(23, 171, 214, 0.1);
  color: #17abd6;
  border-radius: 10px;
  margin-right: 6px;
  padding: 2px 6px;
  span {
    color: #17abd6;
    font-size: 12px;
    text-align: center;
    vertical-align: bottom;
  }
`;

const DeleteButton = styled.span`
  display: inline-block;
  background-image: url(${deleteIcon});
  background-size: contain;
  width: 16px;
  height: 16px;
  vertical-align: sub;
  margin-left: 4px;
  margin-bottom: 1px;
  border: none;
`;

// 추천키워드 버튼
const HashButton = styled.button`
  background: rgba(23, 171, 214, 0.1);
  color: #17abd6;
  height: 19px;
  ${(props) =>
    props.disabled
      ? `
      background: rgba(162,170,179,0.1);
      color:#a2aab3;
    `
      : ""};
  border-radius: 10px;
  border: none;
  margin: 0 6px 6px 0;
  padding: 1px 6px;
  font-size: 12px;
  text-align: center;
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

export default ChallengeWrite;

// React.memo ------------------------------------------------------------------------------
const MemorizedSelectCategory = React.memo(({ category, setCategory }) => {
  const [active, setActive] = React.useState(false); // select 활성화 여부
  // 드롭박스 - 라벨을 클릭시 옵션 목록이 열림/닫힘
  const selectClick = () => {
    setActive(!active);
  };
  const optionClick = (e) => {
    setCategory(e.target.innerText);
    setActive(!active);
  };
  return (
    <>
      <label>어떤 주제로 진행하나요?</label>
      <Grid padding="0" margin="0 0 28px" is_flex style={{ overflow: "revert" }}>
        <Select className={active ? "active" : category ? "ok" : ""}>
          <img src={drop}></img>
          <button
            className="label"
            onClick={() => {
              selectClick();
            }}
          >
            {category ? category : "카테고리를 선택하세요."}
          </button>
          <ul className="optionList" id={active ? "active" : ""}>
            <li className="optionItem" onClick={optionClick}>
              일상 루틴
            </li>
            <li className="optionItem" onClick={optionClick}>
              운동
            </li>
            <li className="optionItem" onClick={optionClick}>
              스터디
            </li>
            <li className="optionItem" onClick={optionClick}>
              식습관
            </li>
            <li className="optionItem" onClick={optionClick}>
              힐링
            </li>
            <li className="optionItem" onClick={optionClick}>
              취미
            </li>
            <li className="optionItem" onClick={optionClick}>
              셀프케어
            </li>
            <li className="optionItem" onClick={optionClick}>
              펫
            </li>
            <li className="optionItem" onClick={optionClick}>
              친환경
            </li>
          </ul>
        </Select>
      </Grid>
    </>
  );
});

const MemorizedTitle = React.memo(({ title, setTitle }) => {
  return (
    <>
      <Input
        id="title"
        label="함께 실천할 습관을 적어주세요."
        subLabel="상대방에게 불쾌감을 줄 수 있는 단어는 사용하지 않습니다."
        placeholder="예) 일어나자마자 물 한잔 마시기"
        maxLength="20"
        value={title}
        _onChange={(e) => setTitle(e.target.value)}
      />

      <CountBox className="t_right poppins mt4 sub_color">
        (<span className="black_color">{title.length}</span>/20)
      </CountBox>
    </>
  );
});

const MemorizedContent = React.memo(({ content, setContent }) => {
  return (
    <InputBox>
      <Input
        id="content"
        label="챌린지에 관한 내용을 입력해주세요."
        placeholder="설명, 인증 방법, 규칙 등을 자유롭게 적습니다."
        textarea
        maxLength="1000"
        value={content}
        _onChange={(e) => setContent(e.target.value)}
        padding="5px 0 8px"
      />
      <CountBox className="t_right poppins mt4 sub_color">
        (<span className="black_color">{content.length}</span>/1000)
      </CountBox>
    </InputBox>
  );
});

const MemorizedTag = React.memo(({ hashArr, setHashArr }) => {
  // 추천 태그 리스트 가져오기
  const recommendList = useSelector((state) => state.search.recommend).filter((el, idx) => idx < 5);
  const [hashtag, setHashtag] = React.useState(""); //onChange로 관리할 문자열
  const [tagFocus, setTagFocus] = React.useState(false); // 태그 입력창 활성화 여부

  // 태그 관련 함수 ----------------------------------------------------------------------------------------
  // 엔터 시 태그 제출
  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      // 예외처리 : 중복된 태그 값 있으면 입력안되고 hashtag 초기화 되도록 설정
      if (hashArr.includes(e.target.value)) {
        setHashtag("");
        return;
      }
      // 태그 추가 함수 실행
      submitTagItem();
    }
  };

  // 엔터 및 키워드 클릭 시 실행 함수 (태그 추가 함수)
  const submitTagItem = (keyword) => {
    // 기존에 입력된 태그 배열
    let updatedTaglist = [...hashArr];
    // 키워드 클릭 시 keyword 추가, 직접 입력 시 onChange로 업데이트 되는 hashtag state 추가
    updatedTaglist.push(keyword ? keyword : hashtag);
    // 태그 배열 state 업데이트
    setHashArr(updatedTaglist);
    // 태그 input 창 초기화
    setHashtag("");
  };

  // 입력된 태그 삭제 함수
  const deleteTagItem = (e) => {
    // 지우려는 태그 내용 가져오기
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    // 지우려는 태그 내용과 다른 태그들만 걸러서 hashArr 업데이트 하기
    const filteredTaglist = hashArr.filter((hashtag) => {
      return hashtag !== deleteTagItem;
    });
    setHashArr(filteredTaglist);
  };

  return (
    <>
      {/* 태그 부분 */}
      <InputBox>
        <p style={{ fontSize: "16px", margin: "0px 0px 12px" }}>
          키워드를 작성해주세요. <span className="sub_color font14">(선택)</span>
        </p>
        {/* 태그 입력 부분 */}

        <ScrollBar width="500px" direction="ltr">
          <WholeBox className={tagFocus ? "active" : hashArr.length ? "ok" : ""}>
            <TagBox>
              {hashArr.map((tagItem, index) => {
                return (
                  <TagItem key={index}>
                    <span>{tagItem}</span>
                    <DeleteButton onClick={deleteTagItem}></DeleteButton>
                  </TagItem>
                );
              })}
            </TagBox>
            <input
              type="text"
              placeholder={hashArr.length > 0 ? "" : "습관을 설명할 수 있는 단어를 적습니다."}
              value={hashtag}
              onChange={(e) => setHashtag(e.target.value)}
              maxLength="6"
              onKeyPress={onKeyPress}
              onFocus={() => setTagFocus(true)}
              onBlur={() => setTagFocus(false)}
            />
          </WholeBox>
        </ScrollBar>
        {/* 추천키워드 부분 */}
        <Grid margin="12px 0 0" padding="0px">
          <span
            className="sub_color small"
            style={{
              marginRight: "13px",
            }}
          >
            추천 키워드
          </span>
          {recommendList.map((el, idx) => {
            return (
              <HashButton
                key={idx}
                onClick={() => {
                  submitTagItem(el);
                }}
                disabled={hashArr.includes(el)}
              >
                {el}
              </HashButton>
            );
          })}
        </Grid>
      </InputBox>
    </>
  );
});

const MemorizedMember = React.memo(({ maxMember, setMaxMember, isEdit }) => {
  return (
    <InputBox>
      {isEdit ? (
        <Input id="members" label="제한 인원을 작성해주세요" placeholder="최대 30명" value={maxMember} _onChange={(e) => setMaxMember(e.target.value)} disabled />
      ) : (
        <Input
          id="members"
          label="제한 인원을 작성해주세요"
          placeholder="최대 30명"
          value={maxMember}
          _onChange={(e) => {
            setMaxMember(e.target.value);
          }}
        />
      )}
    </InputBox>
  );
});

const MemorizedImage = React.memo(({ image, setImage, preview, setPreview, compareImage, setCompareImage, isEdit }) => {
  const [isWarning, setIsWarning] = React.useState(false);

  // 이미지 업로드 부분 ----------------------------------------------------------------------------
  const fileInput = React.useRef();
  const selectFile = async (e) => {
    // 이미지 resize 옵션 설정 (최대 width을 400px로 지정)
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 800,
    };

    let fileArr = fileInput.current.files;
    let fileURLs = []; // preview 담을 배열
    let files = []; // image 담을 배열

    let file; // 임시 변수
    let filesLength;

    const maxSize = 20 * 1024 * 1024; // 파일 용량 제한 (20MB)

    setIsWarning(false); // 업로드 마다 용량 초과 파일 있는지 확인을 위해, 초기화

    if (isEdit) {
      filesLength = 3 - compareImage.length; // 이미지 3장 제한
    } else {
      filesLength = fileArr.length > 3 ? 3 : fileArr.length; // 이미지 3장 제한
    }

    // 다중 선택된 이미지 file 객체들을 반복문을 돌리며 preview와 image 배열에 추가하기
    for (let i = 0; i < filesLength; i++) {
      // file = fileArr[i];
      if (fileArr[i].name.split(".")[1] === "gif" || fileArr[i].name.split(".")[1] === "GIF") {
        file = fileArr[i];
      } else {
        file = await imageCompression(fileArr[i], options);
      }
      if (file.size > maxSize) {
        console.log("파일 사이즈가 20MB를 넘습니다.");
        setIsWarning(true); // 용량 초과 파일 하나라도 있으면 true
      } else {
        let reader = new FileReader();
        if (file.name.split(".")[1] === "heic" || file.name.split(".")[1] === "HEIC") {
          let blob = file;
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
              reader.onload = () => {
                // 읽기가 끝나면 발생하는 이벤트 핸들러.
                fileURLs.push(reader.result);
                // 미리보기 state에 저장
                setPreview([...preview, ...fileURLs]);
              };
              // 이미지 state에 저장
              if (file) {
                files.push(file);
                setImage([...image, ...files]);
              }
            })
            .catch(function (err) {
              console.log("이미지 변환 오류", err);
            });
        } else {
          // 파일 내용을 읽어온다.
          reader.readAsDataURL(file);
          reader.onload = () => {
            // 읽기가 끝나면 발생하는 이벤트 핸들러.
            fileURLs.push(reader.result);
            // 미리보기 state에 저장
            setPreview([...preview, ...fileURLs]);
          };
          // 이미지 state에 저장
          if (file) {
            files.push(file);
            setImage([...image, ...files]);
          }
        }
      }
    }

    e.target.value = ""; // 같은 파일 upload를 위한 처리
  };
  // 업로드한 이미지 삭제 함수
  const deleteImage = (index) => {
    const previewArr = preview.filter((el, idx) => idx !== index);
    setPreview([...previewArr]);

    // 수정일 때, 기존 이미지 배열과 새로운 이미지 배열 모두 고려해야 함
    let compareArr = [];
    let imageArr = [];
    if (index < compareImage.length) {
      // 1) 삭제 이미지가 기존 이미지 배열 안에 있을 때, compareImage에서 지우기
      compareArr = compareImage.filter((el, idx) => idx !== index);
      setCompareImage([...compareArr]);
    } else {
      // 2) 삭제 이미지가 새로운 이미지 배열 안에 있을 때, image에서 지우기
      imageArr = image.filter((el, idx) => idx !== index - compareImage.length);
      setImage([...imageArr]);
    }
  };

  return (
    <InputBox>
      <p style={{ fontSize: "16px", margin: "0px 0px 2px" }}>
        사진을 첨부해주세요. <span className="sub_color font14">(최대 3건)</span>
      </p>
      <p className="small sub_color">첫번째 이미지가 대표 이미지로 등록됩니다. (최대 20MB)</p>
      <div
        style={{
          position: "relative",
        }}
      >
        {preview.map((el, idx) => {
          return (
            <ImgBox key={idx}>
              <Image shape="rectangle" src={preview[idx] ? preview[idx] : defaultImg} />
              <button onClick={() => deleteImage(idx)}></button>
            </ImgBox>
          );
        })}
        {preview.length < 3 && (
          <ImageLabel className="input-file-button" htmlFor="input-file">
            <img
              src={plus}
              style={{
                width: "32px",
                margin: "20px 0px 0px",
              }}
            ></img>
          </ImageLabel>
        )}
        {isWarning && (
          <p className="fail_color caption" style={{ position: "absolute" }}>
            첨부 가능한 용량을 초과합니다. 20MB 이하의 파일을 올려주세요.
          </p>
        )}
      </div>

      <input
        id="input-file"
        type="file"
        onChange={selectFile}
        ref={fileInput}
        // disabled={is_uploading}
        multiple // 다중 업로드 가능
        //accept="image/*" // 이미지에 해당하는 모든 파일 허용 (JPG,JPEG,GIF,PNG 제한?)
        style={{ display: "none" }}
      />
    </InputBox>
  );
});
