import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import { Grid } from "../elements";

const MemberPostDetail = (props) => {
  const postId = +useParams().postId;
  const postList = useSelector((state) => state.member.postList);
  const targetPost = postList.filter((el) => el.postId === postId)[0];
  console.log(postList, targetPost);
  return (
    <Grid margin="48px 0" padding="0">
      <PostCard {...targetPost} />
    </Grid>
  );
};

export default MemberPostDetail;
