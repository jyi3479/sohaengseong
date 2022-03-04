import React from "react";
import { Grid, Input, Button} from "../elements";
import { useDispatch, useSelector } from "react-redux";
import * as baseAction from '../redux/modules/base';

const Search = (props) => {
    const dispatch = useDispatch();
    const [word,setWord] = React.useState("");

    //헤더&푸터 state
    React.useEffect(() => {
        dispatch(baseAction.setHeader(true,true,"채팅방이름이름"));        
        return()=>{
            dispatch(baseAction.setHeader(false,""));
        }
    }, []);

    return(
        <>
            <Grid>
                안녕하세요
            </Grid>
        </>
    );
};

export default Search;