import React from "react";
import styled from "styled-components";
import profileBorder from "../image/profile_border.png";
import  defaultProfile from "../image/img_profile_defalt @2x.png";

const Image = (props) => {
  const { shape, src, size, profile, radius, align, inline_block, padding , ranking} = props;
  const styles = {
    src: src,
    size: size,
    profile: profile,
    radius: radius,
    inline_block: inline_block,
    align: align,
    padding: padding,
    ranking:ranking,
  };

  if(shape === "border" ){
    //랭킹 프로필 이미지
    return <CircleWrap {...styles}><div></div></CircleWrap>
  }

  if (shape === "circle") {
    //프로필 이미지
    return <ImageCircle {...styles}></ImageCircle>
  }
  if (shape === "rectangle") {
    //게시글 이미지
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }
  return <React.Fragment></React.Fragment>;
};

Image.defaultProps = {
  shape: "circle",
  src: "",
  size: 40,
  profile: defaultProfile,
  radius: "0",
  inline_block: false,
  is_preview: false,
  align: false,
  children: null,
  ranking:false,
  padding: "100%",
};

const AspectOutter = styled.div`
  max-width: 100%;
  max-height: 100%;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: ${(props) => (props.padding ? props.padding : "100%")};
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  border-radius: ${(props) => props.radius};
  background-color: #f2f2f2;
  overflow: ${(props) => props.className === "edit"? "hidden" : "initial"};
  
`;

const ImageCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
   --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: 9px;
  background-image: url(${profileBorder});
  background-position: center;
  background-size: contain;
  > div{
    display: block;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    background-image: url("${(props) => props.profile}");
    background-size: cover;
    background-position: center;
    border-radius: 9px;
  }
`;

const CircleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
   --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: 9px;
  background-image: url(${profileBorder});
  background-position: center;
  background-size: contain;
  > div{
    display: block;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    background-image: url("${(props) => props.profile}");
    background-size: cover;
    background-position: center;
    border-radius: 9px;
  }
`;


export default Image;
