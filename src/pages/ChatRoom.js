import React from "react";
import * as baseAction from '../redux/modules/base';
import { useSelector, useDispatch } from "react-redux";
import {Grid} from "../elements/index";
import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";

const ChatRoom = (props) => {
    const dispatch = useDispatch();

    //헤더&푸터 state
    React.useEffect(() => {
        dispatch(baseAction.setHeader(true,true,"채팅방이름이름"));
        dispatch(baseAction.setGnb(false));
        return()=>{
            dispatch(baseAction.setHeader(false,""));
            dispatch(baseAction.setGnb(true));
        }
    }, []);

    return(
        <Grid padding="24px 20px" margin="48px 0 0" bg="#f7f7f7" height="calc(100vh - 48px)">
            <Grid padding="0" margin="0 0 76px">
                <MessageList/>
            </Grid>            
            <MessageForm/>
        </Grid>
    );
};

export default ChatRoom;