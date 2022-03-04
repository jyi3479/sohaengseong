import React from "react";
import styled from "styled-components";

const MypageCard = (props) => {
  return (
    <Box>
      <div>
        <p>매주 1시간씩 프렌즈 보면서 영어 회화 공부하실 분!</p>
      </div>
      <div>#미드 #영어공부 #회화</div>
    </Box>
  );
};

const Box = styled.div`
  width: 158px;
  height: 178px;
  border-radius: 10px;
  box-shadow: 3px 3px 6px 0 rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
  div:first-child {
    height: 120px;
    border-radius: 10px 10px 0px 0px;
    background-image: url("https://t1.daumcdn.net/cfile/tistory/99C8CC365DBE46C613");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    text-align: center;
    p {
      color: #ffffff;
      padding: 30px 20px;
      font-size: 12px;
    }
  }
  &:last-child {
    margin-bottom: 0;
  }
  cursor: pointer;
`;

export default MypageCard;
