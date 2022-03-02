import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import * as baseAction from '../redux/modules/base';
import {Grid,Button,Input} from "../elements/index";

const Find = (props) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(baseAction.setHeader(true,"비밀번호 찾기"));
        dispatch(baseAction.setGnb(false));
        return()=>{
            dispatch(baseAction.setHeader(false,""));
            dispatch(baseAction.setGnb(true));
        }
    }, [])

    const [email,setEmail] = React.useState("");
    return(
        <Grid padding="0 40px" margin="120px 0 0" height="auto">
            <Content>
                <h1>가입 시 등록한<br/>이메일을 입력해주세요.</h1>
                <p>입력하신 이메일로 임시 비밀번호가 발송됩니다.</p>
            </Content>
            <Grid padding="0">
                <Input
                    value={email}
                    label="이메일"
                    placeholder="이메일을 입력해 주세요."
                    is_submit
                    _onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />                
                <Button margin="50px 0 0" _onClick={()=>{
                   console.log("이메일 인증하기 누름");
                }}>이메일 인증하기</Button>
            </Grid>
            
        </Grid>
    );
};

const Content = styled.div`
    margin-bottom:30px;
    h1 {
        font-size: 20px;
        margin-bottom: 10px;
        line-height: 1.45;
    }
    p {
        font-size: 14px;
    }
`;

export default Find;