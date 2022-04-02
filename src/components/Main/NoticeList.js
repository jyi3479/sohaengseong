import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {ActionCreators as noticeAction} from '../../redux/modules/user';

import Notfound from "../../image/icon/ic_empty_notice_l@2x.png";
import NoticeCard from "./NoticeCard";


const NoticeList = (props) => {
    const dispatch = useDispatch();
    const notice_list = useSelector(state => state.user.notice);

    React.useEffect(()=>{
        dispatch(noticeAction.getNoticeDB());
    },[]); 

    return(
        <>                
            {notice_list&&notice_list.length !== 0? (
                <List>
                    {notice_list&& notice_list.map((el,i)=>{
                        return (
                            <NoticeCard key={i} {...el}/>
                        );
                    })}
                </List>
            ):(
                <NotFound className="t_center">
                    <img src={Notfound}/>
                    <h2 className="mt16" style={{color:"#000"}}>검색 결과가 없습니다.</h2>
                </NotFound>
            )}                
        </>
    );
};

const List = styled.div`
    margin-top: 8px;
`;

const NotFound = styled.div`
    margin-top: 20vh;
    img {
        width: 100px;
    }
`;

export default NoticeList;