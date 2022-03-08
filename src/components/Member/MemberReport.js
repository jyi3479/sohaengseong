import React from "react";
import styled from "styled-components";
import { Grid } from "../../elements";

const MemberReport = (props) => {
  return (
    <Grid padding="0px" margin="35px 0 0">
      <Title>위클리 리포트</Title>
      <Date>2022년 3월 13~19</Date>
      <div style={{ width: "335px", height: "268px", background: "#cecece" }}>
        리포트
      </div>
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
`;

export default MemberReport;
