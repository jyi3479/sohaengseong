import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as memberActions } from "../redux/modules/member";
import { Grid } from "../elements";
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
    <Wrap>
      <Grid>
        {post_list.map((el, i) => {
          return <PostCard key={i} {...el}></PostCard>;
        })}
      </Grid>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default PostList;
