import React from "react";
import styled from "styled-components";
import lock from "../image/icon/ic_lock@2x.png";
import peopleIcon from "../image/icon/ic_people@2x.png";
import { Grid , Tag } from "../elements";

const ChallengeCard = (props) => {
  const startDate = `${props.startDate.split(" ")[0].split("-")[0]}`;
  const endDate = `${props.endDate.split(" ")[0].split("-")[0]}`;

  return (
    <Box onClick={props._onClick} className={props.className}>
      <ImageBox status={props.status} style={{backgroundImage:`url(${props.challengeImage?props.challengeImage[0]:""})`}}>
        {props.dailyAuth && props.dailyAuth === "true" ?(
          <div
            style={{
              color: "white",
              fontWeight: "700",
              height: "100%",
              backgroundColor:"rgba(0,0,0,0.5)"
            }}
          >
            {props.dailyAuth !== "false"? "내가해냄": ""}
          </div>
        ):null}
        <p className="small">
          <img src={peopleIcon} />
          {props.currentMember}/{props.maxMember}명
        </p>
      </ImageBox>      
      <ContentBox>
        <div style={{height:"58px"}}>
          <h3 className="ellipsis2">{props.title}</h3>
          <p className="caption caption_color" style={{margin:"2px 0 6px"}}>{props.category}</p>
        </div>        
        <div className="contents">          
          <div>
            {props.tagName?.map((el, i) => {
              return <Tag key={i} tag={el}></Tag>;
            })}  
          </div>
          <div className="date">
            <p className="small caption_color" style={{marginRight:"6px"}}>{startDate} - {endDate}</p>
            <img src={props.isPrivate?lock:null} style={{width:"16px", verticalAlign: "sub"}}></img>
          </div>
        </div>
      </ContentBox>      
    </Box>
  );
};

const Box = styled.div`
  display: inline-block;
  width: calc(50% - 6px);
  height: auto;
  margin: 0 12px 16px 0;
  vertical-align: top;
  cursor: pointer;
  :nth-child(2n) {
    margin-right: 0;
  }
`;

const ImageBox = styled.div`
  width: 100%;
  height: 162px;
  border-radius: 12px;
  position: relative;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  margin-bottom: 12px;
  background-color: #fff;
  p {
    color: #fff;
    background-color: rgba(3,1,2,0.5);
    padding: 4px;
    border-radius: 4px;
    position: absolute;
    right: 10px;
    bottom: 10px;
    img {
      width: 16px;
      vertical-align: sub;
    }
  }
`;

const ContentBox = styled.div`  
  height: 105px;
  position: relative;
  .contents {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    .date {
      * {
        display: inline-block;
      }
    }
  }
`;

export default ChallengeCard;