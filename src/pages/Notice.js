import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import * as baseAction from '../redux/modules/base';
import {ActionCreators as noticeAction} from '../redux/modules/user';

import { Grid } from "../elements/index";

import Notfound from "../image/icon/ic_empty_notice_l@2x.png";
import NoticeCard from "../components/NoticeCard";


const Notice = (props) => {
    const dispatch = useDispatch();
    const notice_list = useSelector(state => state.user.notice);
    

    console.log("알림리스트",notice_list);

    React.useEffect(()=>{
        dispatch(noticeAction.getNoticeDB());

        dispatch(baseAction.setHeader("알림",false));
        dispatch(baseAction.setGnb(false));
        return()=>{
            dispatch(baseAction.setHeader(false,""));
            dispatch(baseAction.setGnb(true));            
        };
    },[]); 

    return(
        <>
            <Grid margin="48px 0 0" padding="9px 0 20px">
                <p className="small sub_color" style={{padding:"0 20px"}}>* 알림 내역은 최대 7일간 보관 후 자동 삭제됩니다.</p>
                <NoticeList>
                    <NoticeCard/>
                </NoticeList>
                <NotFound className="t_center">
                    <img src={Notfound}/>
                    <h2 className="mt16" style={{color:"#000"}}>검색 결과가 없습니다.</h2>
                </NotFound>
            </Grid>
        </>
    );
};

const NoticeList = styled.div`
    margin-top: 8px;
`;

const NotFound = styled.div`
    margin-top: 20vh;
    img {
        width: 100px;
    }
`;

export default Notice;