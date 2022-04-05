import React from "react";
import { Grid } from "../../elements";
import { Select } from "../../styles/ChallengeStyle";
import drop from "../../image/icons/ic_dropdown@2x.png";

const Category = React.memo(({ category, setCategory }) => {
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

export default Category;
