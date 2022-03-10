import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as memberActions } from "../redux/modules/member";
import { Grid, Button } from "../elements";
import PostCard from "./PostCard";
import { useParams } from "react-router-dom";

const PostList = (props) => {
  const challengeId = useParams().challengeId;
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.member.postList);
  console.log(post_list);
  useEffect(() => {
    dispatch(memberActions.getPostDB(challengeId));
  }, []);
  return (
    <Grid padding="0px" margin="0 0 10px" border="1px #dddddd">
      {post_list.map((el, i) => {
        return <PostCard key={i} {...el}></PostCard>;
      })}
      <Fixed>
        <Grid padding="0" is_flex>
          <Button
            width="calc(30% - 5px)"
            bg="#fff"
            style={{ color: "#666", border: "1px solid #666" }}
            _onClick={() => {
              history.push("/chatting");
              // history.push("/chatting/${roomId}");
            }}
          >
            실시간 톡
          </Button>
          <Button
            width="calc(70% - 5px)"
            _onClick={() => {
              history.push(`/post/${challengeId}`);
            }}
          >
            인증하기
          </Button>
        </Grid>
      </Fixed>
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
  button {
    border-radius: 5px;
  }
`;
export default PostList;
