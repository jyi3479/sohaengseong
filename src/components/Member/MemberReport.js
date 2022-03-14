import React from "react";
import styled from "styled-components";
import { Grid } from "../../elements";
import dropdown from "../../image/icons/ic_dropdown@2x.png";

const MemberReport = (props) => {
  return (
    <Grid padding="0px" margin="35px 0 0">
      <h2 className="mb4">위클리 리포트</h2>
      <p className="sub_color mb4">일주일 간 인증률 확인하기</p>
      {/* <Date>
        2022년 3월 13~19 <img src={dropdown} />
      </Date> */}
      <div
        style={{
          width: "335px",
          height: "268px",
          // backgroundImage: `url("https://www.tuomokankaanpaa.com/blog-posts/how-to-create-a-bar-chart-with-react/images/Screen-Shot-2018-06-20-at-20.59.30-300x196.png")`,
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
          backgroundColor: "#fff",
          margin: "10px 0px",
        }}
      >
        <Progress />
      </div>
    </Grid>
  );
};

const Date = styled.p`
  margin: 10px 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.57;
  letter-spacing: -0.42px;
  text-align: left;
  color: #000;

  img {
    width: 12px;
    cursor: pointer;
  }
`;

export default MemberReport;

const Progress = (props) => {
  const my_level = props.my_level;

  return (
    <>
      <ProgressBar>
        {/* <HighLight width={(count / bucket_list.length) * 100 + "%"}></HighLight> */}
        <HighLight height="75%"></HighLight>
      </ProgressBar>
      {/* <p className="sub_color caption t_right">{my_level.rankingPoint}/{my_level.experiencePoint}</p> */}
    </>
  );
};

const ProgressBar = styled.div`
  background: #f4f6fa;
  width: 16px;
  height: 160px;
  border-radius: 8px;
  display: flex; // HighLight와 Circle이 한 줄에 붙어있게 하도록.
  align-items: center; //세로로 중앙 정렬
  margin: 16px 20px 2px 54px;
`;

const HighLight = styled.div`
  background: #95c8d7;
  transition: 1s;
  height: ${(props) => props.height};
  vertical-align: bottom;
  /* height: 100%; */
  width: 100%;
  border-radius: 8px;
`;
