import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";
import PostCard from "./PostCard";

const PostList = (props) => {
  const post_list = useSelector((state) => state.member.post_list);
  console.log(post_list);
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
