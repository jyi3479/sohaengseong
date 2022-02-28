import React from "react";
import { history } from "../redux/configureStore";
import {Grid} from "../elements/index";
import styled from "styled-components";

const Card = (props) => {
    const tagList = props.tagName;

    return(
        <>
           <Box onClick={()=>{
               history.push(`/challenge/`);
           }}>
               <p>{props.title}</p>
               {tagList.map((el,i) => {
                   return(
                    <Tag key={i}>{el}</Tag>
                   );
               })}               
               <p>{props.startDate}~{props.endDate}</p>
               <p>{props.isPrivate? "공개":"비밀"}</p>
           </Box>
        </>
    );
};

const Box = styled.div`
    display: inline-block;
    border: 1px solid #000;
    padding: 10px;
    cursor: pointer;
`;

const Tag = styled.p`
    display: inline-block;
    margin: 0;
    margin-right:5px;
`;

export default Card;