import React from "react";
import PostList from "../components/PostList";
import PostWrite from "../components/PostWrite";
import { Grid } from "../elements";

const MemberPost = (props) => {
  return (
    <Grid>
      <PostWrite />
      <PostList />
    </Grid>
  );
};

export default MemberPost;
