import React from "react";
import styled from "styled-components";

const Tag = (props) => {
    return(
        <Item className="point_color small">{props.tag}</Item>
    );
};

const Item = styled.p`
  display: inline-block;
  margin: 0;
  margin-right: 5px;
  border-radius: 10px;
  padding: 2px 6px;
  background-color: rgba(65,73,211,0.1);
  &:nth-child(n+3) {
    display: none;
  } 
`;

export default Tag;