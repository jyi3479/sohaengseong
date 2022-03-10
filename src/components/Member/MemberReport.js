import React from "react";
import styled from "styled-components";
import { Grid } from "../../elements";
import dropdown from "../../image/icons/ic_dropdown@2x.png";

const MemberReport = (props) => {
  return (
    <Grid padding="0px" margin="35px 0 0">
      <Title>위클리 리포트</Title>
      <Date>
        2022년 3월 13~19 <img src={dropdown} />
      </Date>
      <div
        style={{
          width: "335px",
          height: "268px",
          backgroundImage: `url("https://www.tuomokankaanpaa.com/blog-posts/how-to-create-a-bar-chart-with-react/images/Screen-Shot-2018-06-20-at-20.59.30-300x196.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
    </Grid>
  );
};

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  line-height: 1.22;
  letter-spacing: -0.54px;
  text-align: left;
  color: #000;
`;

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
