import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";
import { useDispatch,  useSelector } from "react-redux";
import { actionCreators as baseAction } from "../redux/modules/base";
import { actionCreators as myActions } from "../redux/modules/mypage";
import Card from "../components/Card";

const MyCompleted = (props) => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const my_list = useSelector((state) => state.mypage.list);
  const completed_list = my_list.filter(
    (l) => l.status === "성공" || l.status === "실패"
  ); // 지난 챌린지(success+fail)
  const success_list = my_list.filter((l) => l.status === "성공");
  const fail_list = my_list.filter((l) => l.status === "실패");

  React.useEffect(() => {
    dispatch(baseAction.setHeader("마이 리포트"));
    dispatch(myActions.getMyChallengeDB(userId));
  }, []);


  return (
    <Grid margin="48px 0">
      {" "}
      <StatusContainer>
        <div>
          <Grid center>
            <p className="caption caption_color mb4">성공</p>
            <p className="poppins">{success_list.length}</p>
          </Grid>
        </div>
        <div>
          <Grid center>
            <p className="caption caption_color mb4">실패</p>
            <p className="poppins">{fail_list.length}</p>
          </Grid>
        </div>
      </StatusContainer>
      {completed_list.map((el, i) => {
        return (
          <Card
            key={el.challengeId}
            {...el}
            _onClick={() => {
              history.push(`/challenge/${el.challengeId}`); //소개 페이지로 이동
            }}
          ></Card>
        );
      })}
    </Grid>
  );
};

const StatusContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0;
  border-radius: 8px;
  background-color: #fff;
  margin: 20px 0;
  >div {
    width: 50%;
    border-right: 1px solid #eff0f2;
    &:last-child {
      border:none;
    }
  } 
`;

export default MyCompleted;
