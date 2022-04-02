import React from "react";
import styled from "styled-components";
import { Grid , Image, Tag} from "../../elements/index";

import peopleIcon from "../../image/icon/ic_people@2x.png";
import lock from "../../image/icon/ic_lock@2x.png";
import defaultImg from "../../image/ic_empty_s@2x.png";
import fail from "../../image/icon/ic_fail@2x.png";
import success from "../../image/icon/ic_success@2x.png";


const Card = (props) => {
  const tagList = props.tagName;
  const startDate = `${props.startDate.split(" ")[0].split("-")[0]}`;
  const endDate = `${props.endDate.split(" ")[0].split("-")[0]}`;
  
  return (    
    <Box onClick={props._onClick} className="card">
      <ImageBox>
        {props.status === "성공" || props.status === "실패" ?(
          <div className={props.status === "성공"? "status": "status fail" }></div>
        ):null}
        <Image shape="rectangle" src={props.challengeImage[0]?props.challengeImage[0]:defaultImg}></Image>
        <p className="small "><img src={peopleIcon}/>{props.currentMember?props.currentMember:"0"}/{props.maxMember}명</p>
      </ImageBox>
      <Grid padding="0" style={{display:"inline-block", position:"relative", width:"calc(100% - 110px)",height: "102px", top:"5px"}}>
        <TitleBox>
          <h3>{props.title}</h3>
          <p className="caption caption_color">{props.category}</p>
        </TitleBox>
        <div style={{width:"100%",position:"absolute" ,bottom:"0",left:"0"}}>       
          {tagList.map((el, i) => {
            return <Tag key={i} tag={el}></Tag>;
          })}      
          <Grid is_flex  padding="0" margin="6px 0 0" style={{}}>
            <p className="small caption_color">{startDate} - {endDate}</p>
            <img src={props.isPrivate?lock:null} style={{width:"16px"}}></img>
          </Grid>
        </div>
      </Grid>
    </Box>    
  );
};

const Box = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: #fff;
  padding: 16px;
  margin-bottom:8px;
  &:last-child {
    margin-bottom:0;
  }
  cursor: pointer;
`;

const ImageBox = styled.div`
  display: inline-block;
  width: 98px;
  position:relative;
  margin-right:12px;
  border-radius: 12px;  
  overflow: hidden;
  > p {
    display: inline-block;   
    color: #fff;
    background-color: rgba(3,1,2,0.5);
    padding: 3px 4px;
    border-radius: 4px;
    position: absolute;
    right: 6px;
    bottom: 6px;
    >img {
      width: 16px;
      vertical-align: sub;
    }
  }
  div.status {  
    position: absolute;
    left:0;
    color:#fff;
    font-weight: bold;
    width: 100%;
    height: 100%;
    background-color:rgba(0,0,0,0.6);
    background-image: url(${success});
    background-size: 48px;
    background-position: center;
    z-index: 1;
    &.fail {
      background-image: url(${fail});
    }
  }
`;


const TitleBox = styled.div`
  h3{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.2;
  }
  p {    
    margin:2px 0 8px;
  }
`;

export default Card;
