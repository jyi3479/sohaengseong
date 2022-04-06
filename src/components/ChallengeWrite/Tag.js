import React from "react";
import { useSelector } from "react-redux";
import { InputBox, WholeBox, TagBox, TagItem, DeleteButton, HashButton } from "../../styles/ChallengeWriteStyle";
import { Grid } from "../../elements";
//스크롤바 커스텀
import ScrollBar from "../../components/shared/ScrollBar";

const Tag = React.memo(({ hashArr, setHashArr }) => {
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

export default Tag;
