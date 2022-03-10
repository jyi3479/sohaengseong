import React from "react";
import styled from "styled-components";

const Button = ({
  children,
  width,
  height,
  bg,
  margin,
  padding,
  font_size,
  radius,
  border_btn,
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
    border_btn
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
  height: "42px",
  margin: false,
  padding: false,
  _disabled: false,
  is_circle: false,
  border_btn:false,
  radius: "22px",
  bg: "#4149d3",
  _onClick: () => {},  
};

const Btn = styled.button`
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "12px")};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${props => props.bg};
  border: 1px solid #4149d3;
  border-radius: ${(props) => (props.radius ? props.radius : "22px")};  
  ${(props) => props.font_size ? `font-size: ${props.font_size};` : `font-size: 14px;`};
  line-height: 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  &:disabled { //disabled 스타일
    background-color: #a2aab3;
    border-color: #a2aab3;
    color: #7c8288;
    cursor: auto;
    ${(props) => (props.border_btn?`
      background-color: #fff;
    `:"")};
  }
  ${(props) => (props.border_btn? `
    color: #4149d3;
    background-color: #fff;
  ` : "")};

`;

export default Button;
