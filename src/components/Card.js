import React from "react";
import { history } from "../redux/configureStore";
import { Grid } from "../elements/index";
import styled from "styled-components";

const Card = (props) => {
  const tagList = props.tagName;

  return (
    <>
      <Box onClick={props._onClick} bg={props.bg}>
        <p>{props.title}</p>
        {tagList.map((el, i) => {
          return <Tag key={i}>{el}</Tag>;
        })}
        <p>
          {props.startDate}~{props.endDate}
        </p>
        <p>{props.isPrivate ? "비밀" : "공개"}</p>
      </Box>
    </>
  );
};

const Box = styled.div`
  display: inline-block;
  width: calc(50% - 30px);
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")};
  border: 1px solid #000;
  padding: 10px;
  cursor: pointer;  
`;

const Tag = styled.p`
  display: inline-block;
  margin: 0;
  margin-right: 5px;
`;

export default Card;