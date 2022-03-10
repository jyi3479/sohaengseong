import React from "react";
import styled from "styled-components";

const Button = ({
  children,
  width,
  height,
  bg,
  color,
  border,
  margin,
  padding,
  font_size,
  radius,
  _disabled,
  _onClick,
  ...props
}) => {
  const styles = {
    width,
    bg,
    margin,
    padding,
    font_size,
    height,
    radius,
    color,
    border,
  };

  return (
    <Btn {...styles} disabled={_disabled} onClick={_onClick} {...props}>
      {children}
    </Btn>
  );
};

Button.defaultProps = {
  children: null,
  width: "100%",
  height: "40px",
  margin: false,
  padding: false,
  _disabled: false,
  is_circle: false,
  radius: "7px",
  _onClick: () => {},
  bg: "#666",
  color: "white",
  border: "none",
};

const Btn = styled.button`
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => (props.disabled ? "#acacac" : props.bg)};
  border: ${(props) => (props.disabled ? "none" : props.border)};
  border-radius: ${(props) => (props.radius ? props.radius : "7px")};
  font-family: inherit; // font 상속
  color: ${(props) => (props.disabled ? "white" : props.color)};
  ${(props) =>
    props.font_size ? `font-size: ${props.font_size};` : `font-size: 16px;`};
  cursor: pointer;
  box-sizing: border-box;
  line-height: 19px;
`;

export default Button;
