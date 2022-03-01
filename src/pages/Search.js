import React from "react";
import { Grid, Input, Button} from "../elements";
import { useDispatch, useSelector } from "react-redux";
const Search = (props) => {
    const dispatch = useDispatch();
    const [word,setWord] = React.useState("");

    return(
        <>
            <Grid>
                안녕하세요
            </Grid>
        </>
    );
};

export default Search;