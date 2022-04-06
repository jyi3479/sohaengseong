/* eslint-disable no-loop-func */
import React from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { challengeApis } from "../shared/apis";
import { actionCreators as challengeAction } from "../redux/modules/challenge";
import { actionCreators as baseAction } from "../redux/modules/base";
import { actionCreators as searchAction } from "../redux/modules/search";

import { Grid, Input, Button } from "../elements";
import Modal from "../components/shared/Modal";
import { dateFormat } from "../shared/dateFormat";
import { ButtonContainer, InputBox, InputContainer, Notice, Toast, CountBox } from "../styles/ChallengeWriteStyle";
import Tag from "../components/ChallengeWrite/Tag";
import Category from "../components/ChallengeWrite/Category";
import DatePicker from "../components/ChallengeWrite/DatePicker";
import PrivateCheck from "../components/ChallengeWrite/PrivateCheck";
import ImageUpload from "../components/ChallengeWrite/ImageUpload";

const ChallengeWrite = (props) => {
  const dispatch = useDispatch();

  //수정 / 작성 유무 판별
  const params = useParams();
  const target = useSelector((state) => state.challenge.target);
  const isEdit = params.challengeId ? true : false;

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
  // 방 공개 여부
  const [checkedInputs, setCheckedInputs] = React.useState(null);
  const [password, setPassword] = React.useState("");

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

  // 모달 팝업 ----------------------------------------------------------------------------------------
  const [modalType, setModalType] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const rooms = React.useRef();
  const categories = React.useRef();
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
          categories.current.scrollIntoView(); //입력 안된 항목으로 스크롤 포커스
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
      <InputContainer ref={categories}>
        <Category category={category} setCategory={setCategory} />
        <Title title={title} setTitle={setTitle} />
        <Content content={content} setContent={setContent} />
        <Tag hashArr={hashArr} setHashArr={setHashArr} />
      </InputContainer>

      <InputContainer>
        <DatePicker
          value={value}
          setValue={setValue}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          isEdit={isEdit}
        />
        <MemberCount maxMember={maxMember} setMaxMember={setMaxMember} isEdit={isEdit} />
        <ImageUpload
          image={image}
          setImage={setImage}
          preview={preview}
          setPreview={setPreview}
          compareImage={compareImage}
          setCompareImage={setCompareImage}
          isEdit={isEdit}
        />
        <PrivateCheck
          rooms={rooms}
          isEdit={isEdit}
          checkedInputs={checkedInputs}
          setCheckedInputs={setCheckedInputs}
          password={password}
          setPassword={setPassword}
        />
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
          <Button
            _onClick={openModal}
            disabled={
              title !== "" || content !== "" || category !== "" || maxMember !== "" || checkedInputs !== null || !value.includes(null) ? "" : "disabled"
            }
          >
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

export default ChallengeWrite;

// React.memo ------------------------------------------------------------------------------
const Title = React.memo(({ title, setTitle }) => {
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

const Content = React.memo(({ content, setContent }) => {
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

const MemberCount = React.memo(({ maxMember, setMaxMember, isEdit }) => {
  return (
    <InputBox>
      {isEdit ? (
        <Input
          id="members"
          label="제한 인원을 작성해주세요"
          placeholder="최대 30명"
          value={maxMember}
          _onChange={(e) => setMaxMember(e.target.value)}
          disabled
        />
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
