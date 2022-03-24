import React, { useEffect } from "react";
import styled from "styled-components";

import { history } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as memberAction } from "../../redux/modules/member";

import { Grid } from "../../elements";
//스크롤바 커스텀
import ScrollBar from "../../components/shared/ScrollBar";

import arrow from "../../image/icon/ic_arrow_s@2x.png";

const TodayPost = (props) => {
  const dispatch = useDispatch();
  const postInfo = useSelector((state) => state.member);
  const postList = postInfo.postList;

  // 인증 게시글 리스트 조회
  useEffect(() => {
    dispatch(memberAction.getPostDB(props.challengeId, 0, 4));
  }, []);

  return (
    <Grid padding="0px" margin="39px 0 20px">
      <Grid is_flex padding="0" margin="19px 0px">
        <h2>실시간 인증</h2>
        <p
          onClick={() => {
            history.push(`/post/${props.challengeId}/${props.roomId}`); // 인증게시글 리스트 페이지로 이동
          }}
          style={{ cursor: "pointer" }}
        >
          전체보기
          <img
            src={arrow}
            style={{ width: "16px", height: "16px", verticalAlign: "sub" }}
          />
        </p>
      </Grid>
      <Grid padding="0px" margin="13px 0 0">
        <ScrollBar width="500px" direction="ltr">        
        <Container>
          {postList.map((el, i) => {
            return (
              <ImageBox
                key={el.postId}
                src={el.postImage}
                onClick={() => {
                  history.push(
                    `/post/${props.challengeId}/detail/${el.postId}/${props.roomId}`
                  );
                }}
              >
                <Info>
                  <p>{el.content}</p> <h3 className="mt6">{el.nickname}</h3>
                </Info>
              </ImageBox>
            );
          })}
        </Container>
        </ScrollBar>
      </Grid>
    </Grid>
  );
};

const Container = styled.div`
  white-space: nowrap;
  padding-bottom: 10px;
`;

const ImageBox = styled.div`
  display: inline-block;
  width: 159px;
  height: 152px;
  border-radius: 12px;
  margin-right: 9px;
  padding: 10px;
  ${(props) => (props.src ? `background-image: url(${props.src});` : "")};

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;

  cursor: pointer;

  ::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /* 빈 값으로 넣어야 가상의 요소 생성; */
    content: "";
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 12px;
  }
`;

const Info = styled.div`
  width: 132px;
  position: absolute;
  left: 15px;
  bottom: 15px;
  white-space: initial;
  p {
    color: #ffffff;
    /* 2줄 말줄임 ----- */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  h3 {
    color: #ffffff;
  }
`;

export default TodayPost;
