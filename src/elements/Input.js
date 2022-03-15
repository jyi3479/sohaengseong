import React from "react";
import styled from "styled-components";
import { Button } from "../elements";
const Input = ({
  label,
  subLabel,
  checkbox,
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

  if(checkbox){

  }
  
  if (double) {
    return (
      <Double>
        <Label>
          <p className="label">{label}</p>
          <p className="sub_label">{subLabel}</p>
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
            className="button"
            border_btn
            _onClick={props.btnClick}            
            _disabled={props.btn_disabled}
          >
            중복확인
          </Button>
        </div>
      </Double>
    );
  }
  if (is_submit) {
    return (
      <Label>
        <p className="label">{label}</p>
        <p className="sub_label">{subLabel}</p>
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
        <p className="label">{label}</p>
        <p className="sub_label">{subLabel}</p>
        <TextAreaField
          rows={8}
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
        <p className="label">{label}</p>
        <p className="sub_label">{subLabel}</p>
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
  ${(props) => (props.height ? `height: ${props.height};` : `height: 28px;`)};
  ${(props) =>
    props.padding ? `padding: ${props.padding};` : `padding: 0 0 8px 0;`};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  box-sizing: border-box;
  line-height: 1.29;
  border:none;
  border-bottom: 1px solid #7c8288;
  background-color: transparent;
  opacity: 0.5;
  &.red {
    border-bottom: 1px solid #f57391;
    &:focus {
      border-bottom: 1px solid #f57391;
    }
  }
  &.green {
    opacity:1;
  }
  &:focus {
    outline: none;
    opacity: 1;
    border-bottom: 1px solid #4149d3;
  }
  ::placeholder {
    font-size: 14px;
    color: #7c8288;
    line-height: 1.29;
  }
  &:disabled {
    color: #a2aab3;
  }
`;

const Label = styled.div`
  > p:first-child {
    font-size: 12px;
    line-height: 18px;
    color: #000;
    margin: 0;
  }
  > p:nth-child(2) {
    font-size: 12px;
    color: #808080;
    margin-bottom: 7px;
  }
`;

const Double = styled.div`
   input {width: calc(100% - 80px);}
   .button {
      width: 72px;
      height: 28px;
      background-color: transparent;
      border-radius: 20px;
      margin: 0 0 0 8px;
      font-size: 12px;
      color: #4149d3;
      line-height: inherit;
      font-weight: normal;
      :disabled {
        border: solid 1px rgba(162, 170, 179, 0.5);
        color: #a2aab3;
        opacity: 1;
      }
   }
`;

const TextAreaField = styled.textarea`
  ${(props) => (props.width ? `width: ${props.width};` : `width: 100%;`)}
  ${(props) => (props.height ? `height: ${props.height};` : `height: 100%;`)}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  border:none;
  ${(props) =>
    props.border ? `border: ${props.border};` : `border-bottom: 1px solid rgba(124, 130, 136, 0.5);`}
  box-sizing: border-box;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
    border-bottom: 1px solid #4149d3;
  }
  &::placeholder{ 
    color:rgba(124, 130, 136, 0.5);
  }
  
`;

export default Input;
