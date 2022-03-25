import React from "react";
import { useDispatch } from "react-redux";
import * as baseAction from '../redux/modules/base';

import { Grid } from "../elements/index";

import NoticeList from "../components/NoticeList";


const Notice = (props) => {
    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(baseAction.setHeader("알림",false));
        dispatch(baseAction.setGnb(false));
        return()=>{
            dispatch(baseAction.setHeader(false,""));
            dispatch(baseAction.setGnb(true));            
        };
    }); 

    return(
        <>
            <Grid margin="48px 0 0" padding="9px 0 20px">
                <p className="small sub_color" style={{padding:"0 20px"}}>* 알림 내역은 최대 7일간 보관 후 자동 삭제됩니다.</p>
                <NoticeList/>                
            </Grid>
        </>
    );
};


export default Notice;