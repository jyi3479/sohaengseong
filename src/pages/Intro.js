import React from "react";
import styled from "styled-components";

import { Grid, Button } from "../elements/index";
import { useDispatch } from "react-redux";
import * as baseAction from "../redux/modules/base";
import { history } from "../redux/configureStore";

import confirm_img from "../image/img_confirm@2x.png";

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
    <Wrap className="t_center">
        <Img src={confirm_img}/>
        <Content>
            <h2>습관 키우기<br/>시작은 소행성이 도와드릴께요</h2>
            <pre>원하는 목표나 계획이 있나요?<br/><br/>소행성에 사는 토비와 함께<br/>목표에 한 걸음 가까워지는 방법!<br/>지금부터 알려드릴게요.</pre>
        </Content>        
        <Button _onClick={()=>{history.push("/guide/main")}}>습관 키우기 시작하기</Button>      
    </Wrap>
  );
};

const Wrap = styled.div`
  height: calc(100vh - 48px);
  margin: 48px 0 -56px;
  padding: 80px 20px 0;
  position: relative;
  background-color: #fff;
  button {
    width: calc(100% - 40px);
    position: absolute;
    left: 20px;
    bottom: 44px;
  }
`;

const Img = styled.img`
    width: 160px;
    margin-bottom: 20px;
`;

const Content = styled.div`
    h2 {
        margin-bottom: 8px;
    }
    pre {
        font-size: 14px;
        line-height: 18px;
        letter-spacing: -0.42px;
        white-space: pre-wrap;
    }
`;


export default Intro;
