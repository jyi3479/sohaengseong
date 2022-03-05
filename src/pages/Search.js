import React from "react";
import { Grid, Input, Button} from "../elements";
import { useDispatch, useSelector } from "react-redux";
import * as baseAction from '../redux/modules/base';
import SearchHeader from "../components/SearchHeader";

const Search = (props) => {
    const dispatch = useDispatch();
    const [word,setWord] = React.useState("");

    //헤더&푸터 state
    React.useEffect(() => {
        dispatch(baseAction.setHeader(false,"",false));        
        return()=>{
            dispatch(baseAction.setHeader(true,"",true));
        }
    }, []);
    
    return(    
        <>
            <SearchHeader/>
            <Grid margin="67px 0">
                <Grid padding="0">
                    
                </Grid>
            </Grid>   
        </>    
    );
};

export default Search;