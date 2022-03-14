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
        <Title>실시간 인증</Title>
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
            return (
              <>
                <ImageBox
                  key={el.postId}
                  src={el.postImage}
                  onClick={() => {
                    history.push(
                      `/post/${props.challengeId}/detail/${el.postId}`
                    );
                  }}
                >
                  <Info>
                    <p className="content">{el.content}</p>{" "}
                    <p className="nickname">{el.nickname}</p>
                  </Info>
                </ImageBox>
              </>
            );
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
    border-radius: 10px;
  }
`;

const Info = styled.div`
  width: 132px;
  position: absolute;
  left: 15px;
  bottom: 15px;
  white-space: initial;
  p {
    font-size: 14px;
    text-align: left;
    color: #ffffff;
    /* 2줄 말줄임 ----- */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
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
