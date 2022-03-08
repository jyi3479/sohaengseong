import React from "react"
import styled from "styled-components";
import {Grid, Input, Button} from "../elements"
import {useDispatch, useSelector} from 'react-redux'
import * as baseAction from '../redux/modules/base';
import { history } from "../redux/configureStore";

const MyProfile = (props) => {
    const dispatch = useDispatch();

    //헤더&푸터 state
    React.useEffect(() => {
    dispatch(baseAction.setHeader("프로필 편집"));
    dispatch(baseAction.setGnb(false));
        return()=>{
            dispatch(baseAction.setHeader("",false));
            dispatch(baseAction.setGnb(true));
        }
    }, [])
    return(
        <></>
    );
};

export default MyProfile;