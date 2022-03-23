import React, { useEffect } from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as memberAction } from "../redux/modules/member";

import { Grid, Button } from "../elements";
import PostCard from "./PostCard";
import InfinityScroll from "../shared/InfiniteScroll";

const PostList = (props) => {
  const dispatch = useDispatch();
  const challengeId = useParams().challengeId;
  const roomId = useParams().roomId;

  const postInfo = useSelector((state) => state.member);
  const post_list = postInfo.postList;
  const target = useSelector((state) => state.challenge.target);

  const getPostList = () => {
    dispatch(memberAction.getPostDB(challengeId, postInfo.page, 2));
  };

  useEffect(() => {
    if (!postInfo.page) {
      dispatch(memberAction.getPostDB(challengeId, 0, 2));
    }
  }, []);

  return (
    <Grid padding="24px 20px 32px" border="1px #dddddd">
      <InfinityScroll
        callNext={getPostList}
        paging={{ next: postInfo.has_next }}
      >
        {post_list.map((el, i) => {
          return <PostCard key={i} roomId={roomId} {...el}></PostCard>;
        })}
      </InfinityScroll>
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

const Fixed = styled.div`
  width: 100%;
  position: fixed;
  background-color: #fff;
  bottom: 0;
  left: 0;
  padding: 12px 20px;
  box-shadow: 0 -5px 6px 0 rgba(0, 0, 0, 0.04);
`;

export default PostList;
