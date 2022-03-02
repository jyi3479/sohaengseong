import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import {Grid,Button} from "../elements/index";

const Complete = (props) => {
    return(
        <Grid padding="0 44px" margin="100px 0 0" height="auto">
            <div style={{width:"180px", height:"180px", backgroundColor:"#ccc" , margin:"0 auto"}}></div>
            <Content>
                <h1>회원가입 완료되었습니다!</h1>
                <p>가입하신 이메일로 확인 메일을 보냈어요.<br/>이메일 인증을 하셔야 로그인이 가능합니다.</p>
            </Content>
            <Grid is_flex padding="0">
                <Button width="calc(50% - 4px)" radius="0" bg="#eee" font_size="14px" style={{color:"#000"}} 
                _onClick={()=>{
                    history.push("/");
                }}>메인으로 가기</Button>
                <Button width="calc(50% - 4px)" radius="0" bg="#eee" font_size="14px" style={{color:"#000"}}_onClick={()=>{
                    history.push("/login");
                }}>로그인하기</Button>
            </Grid>
            
        </Grid>
    );
};

const Content = styled.div`
    text-align: center;
    margin:40px 0;
    h1 {
        font-size: 22px;
        margin-bottom: 9px;
    }
    p {
        font-size: 16px;
        line-height: 1.5;
    }
`;

export default Complete;