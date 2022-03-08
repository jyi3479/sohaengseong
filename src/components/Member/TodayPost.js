import React, { useEffect } from "react";
import { Grid } from "../../elements";
import { history } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as memberAction } from "../../redux/modules/member";

const MemberPost = (props) => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.member.postList);
  // 인증 게시글에 사진 있는 post만 가져오기
  const postImageList = postList.filter((l) => l.postImage);

  useEffect(() => {
    dispatch(memberAction.getPostDB(props.challengeId));
  }, []);
  return (
    <Grid padding="0px" margin="39px 0 0">
      <Grid is_flex padding="0" margin="19px 0px">
        <Title>오늘의 인증</Title>
        <p
          onClick={() => {
            history.push(`/post/${props.challengeId}`); // 멤버 전용 챌린지 인증페이지로 이동
          }}
          style={{ fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}
        >
          더보기
        </p>
      </Grid>
      <Grid padding="0px" margin="13px 0 0">
        <Container>
          {postImageList.map((el, i) => {
            return <ImageBox key={el.postId} src={el.postImage} />;
          })}
        </Container>
      </Grid>
    </Grid>
  );
};

const Container = styled.div`
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-bottom: 20px;
`;

const ImageBox = styled.div`
  display: inline-block;
  width: 159px;
  height: 152px;
  border-radius: 10px;
  margin-right: 9px;
  padding: 10px;
  ${(props) => (props.src ? `background-image: url(${props.src});` : "")};

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  cursor: pointer;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  line-height: 1.22;
  letter-spacing: -0.54px;
  text-align: left;
  color: #000;
`;

export default MemberPost;
