import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import {Grid,Button} from "../elements/index";

const Sendmail = (props) => {
    return(
        <Grid padding="0 39px" margin="100px 0 0" height="auto">
            <div style={{width:"180px", height:"180px", backgroundColor:"#ccc" , margin:"0 auto"}}></div>
            <Content>
                <h1>메일함을 확인해주세요!</h1>
                <p>가입하신 이메일로 임시 비밀번호를 보냈어요.<br/>로그인 후 비밀번호를 변경하시길 바랍니다.</p>
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
        font-weight: 500;
    }
    p {
        font-size: 16px;
        line-height: 1.5;
        letter-spacing: -0.2px;
    }
`;

export default Sendmail;