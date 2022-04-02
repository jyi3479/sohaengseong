import React from "react";

import { Grid } from "../elements/index";
import { useDispatch } from "react-redux";
import * as baseAction from "../redux/modules/base";
import DailyChallengeList from "../components/Main/DailyChallengeList";


const DailyCertify = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(baseAction.setHeader("인증 가능한 행성"));
    dispatch(baseAction.setGnb(false));
    return () => {
      dispatch(baseAction.setHeader(false, ""));
      dispatch(baseAction.setGnb(true));
    };
  });

  return (
    <Grid margin="48px 0 0">
      <DailyChallengeList/>
    </Grid>
  );
};



export default DailyCertify;
