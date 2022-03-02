import React from "react";
import { history } from "../redux/configureStore";
import { Grid } from "../elements/index";
import styled from "styled-components";

const Card = (props) => {
  const tagList = props.tagName;

  return (    
    <Box onClick={props._onClick}>


      <p>{props.title}</p>
      {tagList.map((el, i) => {
        return <Tag key={i}>{el}</Tag>;
      })}
      <p>
        {props.startDate}~{props.endDate}
      </p>
      <p>{props.isPrivate ? "비밀" : "공개"}</p>
    </Box>    
  );
};

const Box = styled.div`
  width: 100%;
  border: inset 1px solid #eaeaea;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.05);
  padding: 20px 16px;
  cursor: pointer;
`;

const Tag = styled.p`
  display: inline-block;
  margin: 0;
  margin-right: 5px;
`;

export default Card;
