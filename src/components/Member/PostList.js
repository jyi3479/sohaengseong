import React, { useEffect } from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import { history } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as memberAction } from "../../redux/modules/member";
import { actionCreators as chatAction } from "../../redux/modules/chat";

import { Grid, Button } from "../../elements";
import PostCard from "./PostCard";
import InfinityScroll from "../../shared/InfiniteScroll";

import Notfound from "../../image/icon/ic_empty_l@2x.png";

const PostList = (props) => {
  const dispatch = useDispatch();
  const challengeId = useParams().challengeId;
  const roomId = useParams().roomId;

  const postInfo = useSelector((state) => state.member);
  const post_list = postInfo.postList;
  const target = useSelector((state) => state.challenge.target);

  const getPostList = () => {
    dispatch(memberAction.getPostDB(challengeId, postInfo.page, 3));
  };

  useEffect(() => {
    dispatch(memberAction.getPostDB(challengeId, 0, 3));
  }, []);

  return (
    <Grid padding="24px 20px 32px" border="1px #dddddd">
      {post_list && post_list.length !== 0 ? (
        <InfinityScroll callNext={getPostList} paging={{ next: postInfo.next }}>
          {post_list.map((el, i) => {
            return <PostCard key={i} roomId={roomId} {...el}></PostCard>;
          })}
        </InfinityScroll>
      ) : (
        <NotFound className="t_center">
          <img src={Notfound} />
          <h2 className="mt16" style={{ color: "#000" }}>
            게시글이 없습니다.
          </h2>
        </NotFound>
      )}

      {target?.status === "진행중" && (
        <Fixed>
          <Grid padding="0" is_flex>
            <Button
              width="calc(30% - 4px)"
              line_btn
              _onClick={() => {
                history.push(`/chatting/${roomId}`);
              }}
            >
              실시간 톡
            </Button>
            <Button
              width="calc(70% - 4px)"
              _onClick={() => {
                history.push(`/postwrite/${challengeId}/${roomId}`);
              }}
            >
              인증하기
            </Button>
          </Grid>
        </Fixed>
      )}
    </Grid>
  );
};

const NotFound = styled.div`
  margin-top: 20vh;
  img {
    width: 100px;
  }
`;

const Fixed = styled.div`
  width: 100%;
  position: fixed;
  background-color: #fff;
  bottom: 0;
  left: 0;
  padding: 12px 20px;
  box-shadow: 0 -5px 6px 0 rgba(0, 0, 0, 0.04);
  z-index: 5;
`;

export default PostList;
