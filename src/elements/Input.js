import React from "react";
import styled from "styled-components";
import { Button } from "../elements";
const Input = ({
  label,
  subLabel,
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
  double,
  search,
  border,
  ...props
}) => {
  // if(search){
  //   return (
  //     <div>
  //       <InputField
  //           ref={ref}
  //           type={type}
  //           value={value}
  //           placeholder={placeholder}
  //           onChange={_onChange}
  //           style={{ margin, padding, width, height }}
  //           {...props}
  //         />
  //       <button></button>
  //     </div>
  //   );
  // }

  if (double) {
    return (
      <Double>
        <Label>
          <p>{label}</p>
          <p>{subLabel}</p>
        </Label>
        <div>
          <InputField
            ref={ref}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={_onChange}
            style={{ margin, padding, width, height }}
            {...props}
          />
          <Button
            _onClick={props.btnClick}
            width="40px"
            height="40px"
            bg="#ccc"
            radius="0"
            margin="0 0 0 10px"
            font_size="12px"
            style={{ color: "#fff", lineHeight: "inherit" }}
          >
            확인
          </Button>
        </div>
      </Double>
    );
  }
  if (is_submit) {
    return (
      <Label>
        <p>{label}</p>
        <p>{subLabel}</p>
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
      </Label>
    );
  } else if (textarea) {
    return (
      <Label>
        <p>{label}</p>
        <p>{subLabel}</p>
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
          style={{ margin, padding, width, height, border }}
          {...props}
        ></TextAreaField>
      </Label>
    );
  } else {
    return (
      <Label>
        <p>{label}</p>
        <p>{subLabel}</p>
        <InputField
          ref={ref}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
          style={{ margin, padding, width, height }}
          {...props}
        />
      </Label>
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
  double: false,
  border: false,
};

const InputField = styled.input`
  ${(props) => (props.width ? `width: ${props.width};` : `width: 100%;`)};
  ${(props) => (props.height ? `height: ${props.height};` : `height: 40px;`)};
  ${(props) =>
    props.padding ? `padding: ${props.padding};` : `padding: 10px;`};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  box-sizing: border-box;
  border: 1px solid #999;
  font-family: inherit; // font 상속
  &:focus {
    outline: none;
    border: 1px solid #000;
  }
  ::placeholder {
    color: #999;
  }
`;

const Label = styled.div`
  > p:first-child {
    font-size: 14px;
    color: #000;
    margin: 0;
  }
  > p:nth-child(2) {
    font-size: 12px;
    color: #808080;
    margin: 0 0 10px;
  }
  > p:last-child {
    margin: 0 0 10px !important;
  }
`;

const Double = styled.div``;

const TextAreaField = styled.textarea`
  ${(props) => (props.width ? `width: ${props.width};` : `width: 100%;`)}
  ${(props) => (props.height ? `height: ${props.height};` : `height: 100%;`)}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) =>
    props.border ? `border: ${props.border};` : `border: 1px solid #999;`}
  box-sizing: border-box;
  font-family: inherit; // font 상속
  &:focus {
    outline: none;
    border: 1px solid #000;
  }
`;

export default Input;
