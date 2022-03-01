import React from "react";
import styled from "styled-components";

const Input = ({
  label,
  type,
  placeholder,
  value,
  ref,
  _onChange,
  is_submit,
  _onSubmit,
  textarea,
  margin,
  padding,
  width,
  height,
  ...props
}) => {
  if (is_submit) {
    return (
      <label>
        <p margin="5px 0">{label}</p>
        <InputField
          ref={ref}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              _onSubmit(e);
            }
          }}
          style={{ margin, padding, width, height }}
          {...props}
        />
      </label>
    );
  } else if (textarea) {
    return (
      <label>
        <p margin="5px 0">{label}</p>
        <TextAreaField
          rows={10}
          ref={ref}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              _onSubmit(e);
            }
          }}
          style={{ margin, padding, width, height }}
          {...props}
        ></TextAreaField>
      </label>
    );
  } else {
    return (
      <label>
        <p margin="5px 0">{label}</p>
        <InputField
          ref={ref}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
          style={{ margin, padding, width, height }}
          {...props}
        />
      </label>
    );
  }
};

Input.defaultProps = {
  label: false,
  type: "text",
  placeholder: "입력해주세요",
  value: "",
  is_submit: false,
  _onChange: () => {},
  _onSubmit: () => {},
  margin: false,
  padding: false,
  width: false,
  height: false,
};

const InputField = styled.input`
  ${(props) => (props.width ? `width: ${props.width};` : `width: 100%;`)}
  ${(props) => (props.height ? `height: ${props.height};` : `height: 100%;`)}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  box-sizing: border-box;
  border: 2px solid #acacac;
  border-radius: 5px;
  font-family: inherit; // font 상속

  &:focus {
    outline: none;
    border: 2px solid #61b165;
  }
`;

const TextAreaField = styled.textarea`
  ${(props) => (props.width ? `width: ${props.width};` : `width: 100%;`)}
  ${(props) => (props.height ? `height: ${props.height};` : `height: 100%;`)}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  box-sizing: border-box;
  border: 2px solid #acacac;
  border-radius: 5px;
  font-family: inherit; // font 상속
  &:focus {
    outline: none;
    border: 2px solid #61b165;
  }
`;

export default Input;
