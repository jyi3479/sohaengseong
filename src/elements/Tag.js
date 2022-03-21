import React from "react";
import styled from "styled-components";

const Tag = (props) => {
    return(
        <Item className={`${props.className} sub_point_color small`}>{props.tag}</Item>
    );
};

const Item = styled.p`
  display: inline-block;
  height: 20px;
  margin: 0;
  margin-right: 5px;
  border-radius: 10px;
  padding: 1px 6px;
  background-color: rgba(23,171,214,0.1);
  &:nth-child(n+3) {
    display: none;
  } 
  &.detailPage {
    &:nth-child(n+3) {
      display: inline-block;
    }
  }
`;

export default Tag;