import React from "react";
import PostWrite from "../components/PostWrite";
import { useDispatch } from "react-redux";
import { Grid } from "../elements";
import { actionCreators as baseAction } from "../redux/modules/base";

const MemberPostWrite = (props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(baseAction.setHeader(true, "마이행성"));
  }, []);
  return (
    <Grid padding="0px" margin="48px 0 0">
      <PostWrite />
    </Grid>
  );
};

export default MemberPostWrite;
