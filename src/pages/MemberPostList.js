import React from "react";

import { useDispatch } from "react-redux";
import { actionCreators as baseAction } from "../redux/modules/base";

import PostList from "../components/Member/PostList";
import { Grid } from "../elements";

const MemberPostList = (props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(baseAction.setHeader("실시간 인증", false));
    dispatch(baseAction.setGnb(false));
    return () => {
      dispatch(baseAction.setHeader(""));
      dispatch(baseAction.setGnb(true));
    };
  }, []);

  return (
    <Grid padding="0px" margin="48px 0 0">
      <PostList />
    </Grid>
  );
};

export default MemberPostList;
