import React from "react";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import * as baseAction from '../redux/modules/base';
import {Grid} from "../elements/index";
import ChatRoomItem from "../components/Chat/ChatRoomItem";


const ChatList = (props) => {
    const  dispatch = useDispatch();

    //헤더&푸터 state
    React.useEffect(() => {
        dispatch(baseAction.setHeader(true,"채팅",true));
        return()=>{
            dispatch(baseAction.setHeader(false,"",true));
        }
    }, []);
    
    return(
        <>
            <Grid padding="28px 20px" margin="48px 0 0">
                {/* 채팅방 -------- */}
                <ChatRoomItem/>
            </Grid>
        </>
    );
};

export default ChatList;