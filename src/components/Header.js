import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { Button} from "../elements";

const Header = (props) => {
    return(        
        <Wrap id="Header">
            <Button _onClick={()=>{
                history.push("/search");
            }} width="50px">검색</Button>        
        </Wrap>
    );
};

const Wrap = styled.div`
    display: block;
    width: 100%;
    height: 60px;
    background-color: green;
    position: fixed;
    top: 0;
    left: 0;
`;


export default Header;



