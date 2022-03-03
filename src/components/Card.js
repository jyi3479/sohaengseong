import React from "react";
import { history } from "../redux/configureStore";
import { Grid , Image} from "../elements/index";
import styled from "styled-components";
import peopleIcon from "../image/icons/ic_people@2x.png";
import lock from "../image/icons/ic_lock@2x.png";
const Card = (props) => {
  const tagList = props.tagName;

  return (    
    <Box onClick={props._onClick}>
      <ImageBox>
        <Image shape="rectangle"></Image>
        <p><img src={peopleIcon}/>{props.currentMember}/{props.maxMember}명</p>
      </ImageBox>      
      <Grid padding="0"  style={{display:"inline-block", position:"relative", width:"calc(100% - 128px)",height: "116px"}}>
        <TitleBox padding="0">
          <p>{props.title}</p>
          <p>{props.category}</p>
        </TitleBox>
        <div style={{position:"absolute" ,bottom:"0",left:"0"}}>       
          {tagList.map((el, i) => {
            return <Tag key={i}>{el}</Tag>;
          })}      
          <Grid is_flex  padding="0" margin="4px 0 0">
            <Date>{props.startDate} - {props.endDate}</Date>
            <img src={props.isPrivate?lock:null} style={{width:"20px"}}></img>
          </Grid>
        </div>
      </Grid>
    </Box>    
  );
};

const Box = styled.div`
  width: 100%;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.05);
  padding: 20px 16px;
  margin-bottom:10px;
  &:last-child {
    margin-bottom:0;
  }
  cursor: pointer;
`;

const ImageBox = styled.div`
  display: inline-block;
  width: 116px;
  position:relative;
  margin-right:12px;
  > p {
    display: inline-block;    
    font-size: 12px;
    color: #fff;
    background-color: #b7b7b7;
    padding: 0 4px;
    border-radius: 3px;
    position: absolute;
    right: 8px;
    bottom: 8px;
    >img {
      width: 12px;
    }
  }
`;

const TitleBox = styled.div`
  p:first-child {
    font-size:15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  p:last-child {
    font-size:12px;
    color:#575757;
    margin-top:4px;
  }
`;

const Tag = styled.p`
  display: inline-block;
  margin: 0;
  margin-right: 6px;
  font-size:12px;
  color: #7b7b7b;
  border-radius: 5px;
  padding: 2px 4px;
  background-color: #ededed;
  &:nth-child(n+3) {
    display: none;
  } 

`;

const Date = styled.p`
  font-size:12px;
  color: #7b7b7b;
`;

export default Card;
