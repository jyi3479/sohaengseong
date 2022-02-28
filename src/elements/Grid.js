import React from "react";
import styled from "styled-components";

const Grid = ({
  children,
  display,
  width,
  padding,
  margin,
  bg,
  _onClick,
  center,
  align,
  border,
  is_flex,
  ...props
}) => {
  const styles = {
    display,
    width,
    margin,
    padding,
    bg,
    center,
    align,
    border,
    is_flex,
  };

  return (
    <GridContainer {...styles} onClick={_onClick} {...props}>
      {children}
    </GridContainer>
  );
};

Grid.defaultProps = {
  children: null,
  display: "block",
  width: "100%",
  height: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  _onClick: () => {},
  align: null,
  border: null,
  is_flex: false,
};

const GridContainer = styled.div`
  ${(props) =>
    !props.is_flex && props.display ? `display: ${props.display};` : "block"};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  ${(props) => (props.display ? `display: ${props.display};` : "")};
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")};
  ${(props) => (props.center ? `text-align: center;` : "")}
  ${(props) => (props.border ? `border: ${props.border};` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ""};
  border-radius: 5px;
  box-sizing: border-box;
`;

export default Grid;
