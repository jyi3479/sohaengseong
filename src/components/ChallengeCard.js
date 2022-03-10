import React from "react";
import styled from "styled-components";
import lock from "../image/icons/ic_lock@2x.png";
import peopleIcon from "../image/icons/ic_people@2x.png";
import { Grid } from "../elements";

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
        <p>
          <img src={peopleIcon} />
          {props.currentMember}/{props.maxMember}명
        </p>
      </ImageBox>      
      <p className="category" style={{margin:"8px 0 4px", fontSize:"12px",color:"#666"}}>{props.category}</p>          
      <Title className="title">{props.title}</Title>
      <TagBox>
        {props.tagName?.map((el, i) => {
          return <Tag className="tag" key={i}>{el}</Tag>;
        })}
      </TagBox>
      <Grid display="flex" padding="0px" style={{alignItems: "flex-end"}}>
        <Date>
          {startDate} - {endDate}
        </Date>
        {props.isPrivate && <img src={lock} style={{ width: "20px" }} />}
      </Grid>
    </Box>
  );
};

const Box = styled.div`
  display: inline-block;
  width: calc(50% - 4px);
  height: auto;
  margin: 0 8px 24px 0;
  background-color: #fff;
  cursor: pointer;
  :nth-child(2n) {
    margin-right: 0;
  }
`;

const ImageBox = styled.div`
  width: 100%;
  height: 152px;
  border-radius: 10px;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;  
  text-align: center;

  p {
    display: inline-block;
    font-size: 14px;
    letter-spacing: -0.45px;
    color: #fff;
    background-color: #6c6c6c;
    padding: 1px 6px 2px;
    border-radius: 3px;
    position: absolute;
    right: 8px;
    bottom: 8px;
    img {
      width: 15px;
    }
  }
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.57;
  letter-spacing: -0.42px;
  text-align: left;
  color: #000;
  margin-top: 8px;
  //밑에 말줄임 ------
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 
`;

const TagBox = styled.div`
  height: 46px;
  overflow: hidden;
`;

const Tag = styled.p`
  display: inline-block;
  /* width: 30px;
  height: 22px; */
  margin: 8px 5px 10px 0px;
  padding: 2px 4px;
  opacity: 0.5;
  border-radius: 5px;
  background-color: #ededed;
  font-size: 12px;
  line-height: 1.83;
  letter-spacing: -0.36px;
`;

const Date = styled.p`
  font-size: 10px;
  line-height: 1.8;
  letter-spacing: -0.3px;
  text-align: left;
  color: #575757;
`;

export default ChallengeCard;