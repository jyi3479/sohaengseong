import styled from "styled-components";
import deleteIcon from "../image/icon/btn_delete_g@2x.png";
import deleteIconW from "../image/icon/btn_delete_s@2x.png";

export const InputContainer = styled.div`
  background-color: #ffffff;
  padding: 24px 20px;
  &:first-child {
    margin-bottom: 12px;
  }
  .label {
    font-size: 16px !important;
  }
  .label + .sub_label {
    margin-top: 2px;
    color: #7c8288;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  position: fixed;
  background-color: #fff;
  bottom: 0;
  left: 0;
  padding: 11px 20px;
  box-shadow: 0 -4px 8px 0 rgba(3, 1, 2, 0.04);
  z-index: 3;
`;

//토스트 메시지
export const Toast = styled.div`
  position: fixed;
  width: 100%;
  bottom: 64px;
  left: 0;
  height: 40px;
  padding: 11px 24px;
  background-color: rgba(3, 1, 2, 0.8);
  bottom: 24px;
  transition: 0.4s;
  z-index: 2;
  p {
    color: #fff;
  }
  &.show {
    opacity: 1;
    bottom: 64px;
  }
`;

export const Select = styled.div`
  position: relative;
  width: 100%;
  padding: 8px 0;
  border: none;
  border-bottom: 1px solid rgba(124, 130, 136, 0.5);
  outline: none;
  img {
    position: absolute;
    top: 8px;
    right: 0;
    width: 16px;
  }

  &.active {
    outline: none;
    border-bottom: 1px solid #4149d3;
    .label {
      color: rgba(124, 130, 136, 1);
    }
    img {
      transform: rotate(180deg);
    }
  }

  &.ok {
    border-bottom: 1px solid #7c8288;
    .label {
      color: #030102;
    }
  }
  .label {
    display: flex;
    align-items: center;
    width: 100%;
    height: inherit;
    border: 0 none;
    outline: 0 none;
    background: transparent;
    font-size: 14px !important;
    color: rgba(124, 130, 136, 0.5);
    cursor: pointer;
  }
  .optionList {
    transform: scaleY(0);
    transform-origin: 0px 0px;
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    height: 300px;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(3, 1, 2, 0.08);
    border-radius: 4px;
    overflow: hidden;
    transition: 0.2s ease-in;
    opacity: 0;
    padding: 6px 0;
    z-index: 2;
    > li {
      font-size: 12px;
      padding: 9px 10px;
      color: #030102;
      line-height: 14px;
      cursor: pointer;
      :hover {
        background-color: rgba(162, 170, 179, 0.2);
      }
    }
    &#active {
      transform: scaleY(1);
      opacity: 1;
    }
  }
`;

export const InputBox = styled.div`
  margin-top: 28px;
  &.private_box {
    margin-top: 0;
    .private_input {
      margin-top: 20px;
    }
  }
`;

export const DateBox = styled.div`
  width: 100%;
  padding: 8px 0px;
  border: none;
  border-bottom: solid 1px rgba(124, 130, 136, 0.5);
  background-color: transparent;

  input {
    border: none;
    width: 100%;
    cursor: pointer;
    ::placeholder {
      font-size: 14px;
      color: rgba(124, 130, 136, 0.5);
      line-height: 1.29;
    }
  }

  &.active {
    outline: none;
    border-bottom: 1px solid #4149d3;
  }

  &.ok {
    border-bottom: 1px solid #7c8288;
  }
`;

export const CountBox = styled.p`
  font-size: 12px;
  font-weight: normal;
`;

export const ImgBox = styled.div`
  display: inline-block;
  position: relative;
  padding: 0px;
  width: 72px;
  height: 72px;
  margin: 12px 8px 0 0;
  border-radius: 12px;
  overflow: hidden;
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(3, 1, 2, 0.5);
    left: 0;
    top: 0;
  }
  button {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 6px;
    right: 6px;
    cursor: pointer;
    background-image: url(${deleteIconW});
    background-size: cover;
    background-color: transparent;
    border: none;
    z-index: 2;
  }
`;

export const ImageLabel = styled.label`
  cursor: pointer;
  width: 72px;
  height: 72px;
  margin: 12px 8px 0px 0px;
  display: inline-block;
  position: relative;
  border: solid 1px #a2aab3;
  vertical-align: top; // 최상단에 정렬 맞추기
  text-align: center; //이미지 가운데
  border-radius: 12px;
`;

/* emotion css 태그 */
export const WholeBox = styled.div`
  color: rgb(52, 58, 64);
  font-size: 12px;
  display: flex;
  border-bottom: solid 1px rgba(124, 130, 136, 0.5);
  padding: 8px 0;

  input {
    width: 100vw;
    display: inline-block;
    vertical-align: top;
    outline: none;
    cursor: text;
    border: none;
    font-family: inherit;
    ::placeholder {
      font-size: 14px;
      color: rgba(124, 130, 136, 0.5);
      line-height: 1.29;
    }
  }

  &.active {
    outline: none;
    border-bottom: 1px solid #4149d3;
  }

  &.ok {
    border-bottom: 1px solid #7c8288;
  }
`;

export const TagBox = styled.div`
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
`;

export const TagItem = styled.span`
  display: inline-block;
  background: rgba(23, 171, 214, 0.1);
  color: #17abd6;
  border-radius: 10px;
  margin-right: 6px;
  padding: 2px 6px;
  span {
    color: #17abd6;
    font-size: 12px;
    text-align: center;
    vertical-align: bottom;
  }
`;

export const DeleteButton = styled.span`
  display: inline-block;
  background-image: url(${deleteIcon});
  background-size: contain;
  width: 16px;
  height: 16px;
  vertical-align: sub;
  margin-left: 4px;
  margin-bottom: 1px;
  border: none;
`;

// 추천키워드 버튼
export const HashButton = styled.button`
  background: rgba(23, 171, 214, 0.1);
  color: #17abd6;
  height: 19px;
  ${(props) =>
    props.disabled
      ? `
      background: rgba(162,170,179,0.1);
      color:#a2aab3;
    `
      : ""};
  border-radius: 10px;
  border: none;
  margin: 0 6px 6px 0;
  padding: 1px 6px;
  font-size: 12px;
  text-align: center;
`;

export const Notice = styled.div`
  padding: 24px 20px;
  ul {
    margin-top: 8px;
    li {
      font-size: 13px;
      margin-left: 13px;
      list-style: disc;
    }
  }
`;
