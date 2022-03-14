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
  line_btn,
  small_btn,
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
    border_btn,
    line_btn,
  };

  if (small_btn) {
    return (
      <SmallBtn {...styles} disabled={_disabled} onClick={_onClick} {...props}>
        {children}
      </SmallBtn>
    );
  }

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
  border_btn: false,
  line_btn: false,
  small_btn: false,
  radius: "22px",
  bg: "#4149d3",
  _onClick: () => {},
};

const Btn = styled.button`
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "12px")};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.bg};
  border: 1px solid #4149d3;
  border-radius: ${(props) => (props.radius ? props.radius : "22px")};
  ${(props) =>
    props.font_size ? `font-size: ${props.font_size};` : `font-size: 14px;`};
  line-height: 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  &:disabled {
    //disabled 스타일
    background-color: #a2aab3;
    border-color: #a2aab3;
    color: #7c8288;
    opacity: 0.5;
    cursor: auto;
    ${(props) =>
      props.border_btn
        ? `
      background-color: #fff;
    `
        : ""};
    ${(props) =>
      props.line_btn
        ? `
      opacity: 0.2;      
    `
        : ""};
  }
  ${(props) =>
    props.border_btn
      ? `
    color: #4149d3;
    background-color: #fff;
  `
      : ""};
  ${(props) =>
    props.line_btn
      ? `
    color: #030102;
    background-color: transparent;
    border-color: #a2aab3;
    font-weight: normal;
  `
      : ""};
`;

const SmallBtn = styled.button`
  min-width: 60px;
  height: 28px;
  border: 1px solid #a2aab3;
  font-size: 12px;
  padding: 5px 0;
  border-radius: 22px;
  background-color: #fff;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  &:disabled {
    //disabled 스타일
    background-color: #a2aab3;
    border-color: #a2aab3;
    color: #7c8288;
    cursor: auto;
  }
`;

export default Button;
