import React from "react";

import { Grid } from "../elements/index";
import { useDispatch } from "react-redux";
import * as baseAction from "../redux/modules/base";


const Intro = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(baseAction.setHeader("소행성 사용 가이드"));
    dispatch(baseAction.setGnb(false));
    return () => {
      dispatch(baseAction.setHeader(false, ""));
      dispatch(baseAction.setGnb(true));
    };
  });

  return (
    <Grid margin="48px 0 0">
        
    </Grid>
  );
};



export default Intro;
