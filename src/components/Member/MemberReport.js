import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as memberAction } from "../../redux/modules/member";
import styled from "styled-components";
import { Grid } from "../../elements";
import dropdown from "../../image/icons/ic_dropdown@2x.png";
import { memberApis } from "../../shared/apis";

const MemberReport = (props) => {
  const dispatch = useDispatch();
  const status = props.status;
  const challengeId = props.challengeId;
  const [startDate, setStartDate] = useState("2022.03.13");
  const report = useSelector((state) => state.member.report);
  console.log(report);
  useEffect(() => {
    dispatch(memberAction.getReportDB(challengeId, startDate));
  }, [startDate]);

  return (
    <Grid padding="0px" margin="35px 0 0">
      <h2 className="mb4">위클리 리포트</h2>
      <p className="sub_color mt6">일주일 간 인증률 확인하기</p>
      {/* <Date>
        2022년 3월 13~19 <img src={dropdown} />
      </Date> */}

      <div
        style={{
          width: "335px",
          height: "268px",
          backgroundColor: "#fff",
          margin: "12px 0px",
          padding: "32px 14px",
        }}
      >
        {status === "모집중" ? (
          <Grid center margin="auto" padding="90px 20px">
            <p className="sub_color">집계된 데이터가 없습니다</p>
          </Grid>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
                justifyContent: "space-evenly",
              }}
            >
              {report.map((el, idx) => {
                return <Progress key={el.date} {...el} />;
              })}
            </div>
            <div
              style={{
                display: "flex",
                margin: "24px 10px 20px",
                justifyContent: "flex-end",
              }}
            >
              <IndexBox>
                <div className="fail"></div>
                <p className="small">인증 실패</p>
              </IndexBox>
              <IndexBox>
                <div className="success"></div>
                <p className="small">인증 성공</p>
              </IndexBox>
            </div>
          </>
        )}
      </div>

      <p className="caption_color caption t_right">
        집계기준 : 1일 마다 멤버 전체 인증 성공/실패율
      </p>
    </Grid>
  );
};

const IndexBox = styled.div`
  display: flex;
  margin-left: 8px;
  div {
    width: 12px;
    height: 12px;
    border-radius: 4px;
    margin-right: 4px;
  }
  p {
    color: #999999;
  }

  .fail {
    background-color: rgba(162, 170, 179, 0.5);
  }

  .success {
    background-color: #5a76ea;
  }
`;

export default MemberReport;

const Progress = (props) => {
  const my_level = props.my_level;

  return (
    <ReportBox>
      <ProgressBar>
        {/* <HighLight width={(count / bucket_list.length) * 100 + "%"}></HighLight> */}
        <HighLight
          height={(props.percentage < 100 ? props.percentage : 100) + "%"}
        ></HighLight>
      </ProgressBar>
      <p className="caption_color caption mt6">
        {+props.date.split("-")[1] + "/" + props.date.split("-")[2]}
      </p>
    </ReportBox>
  );
};

const ReportBox = styled.div`
  /* margin: 0 10px; */
  text-align: center;
`;

const ProgressBar = styled.div`
  background: rgba(162, 170, 179, 0.5);
  width: 16px;
  height: 160px;
  border-radius: 8px;
  display: flex; // HighLight와 Circle이 한 줄에 붙어있게 하도록.
  align-items: flex-end; //밑에서 맞추기
  margin: auto;
`;

const HighLight = styled.div`
  background: #5a76ea;
  transition: 1s;
  height: ${(props) => props.height};
  vertical-align: bottom;
  width: 100%;
  border-radius: 8px;
`;
