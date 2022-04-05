import React from "react";
import { InputBox } from "../../styles/ChallengeStyle";
import { Grid, Input } from "../../elements";

const PrivateCheck = React.memo(({ rooms, isEdit, checkedInputs, setCheckedInputs, password, setPassword }) => {
  // 비밀방 여부 체크 함수 ------------------------------------------------------------------------------
  const changeHandler = (checked, id) => {
    if (checked) {
      // checked가 true이면 해당 id값(private/public)이 state에 저장된다.(체크된 박스가 어떤 박스인지 알도록)
      setCheckedInputs(id);
    } else {
      setCheckedInputs(null);
    }
  };
  return (
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
  );
});

export default PrivateCheck;
