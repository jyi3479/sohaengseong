import React from "react";
import styled from "styled-components";

import { Tag } from "../elements";

import lock from "../image/icon/ic_lock@2x.png";
import peopleIcon from "../image/icon/ic_people@2x.png";
import defaultImg from "../image/ic_empty_s@2x.png";
import stamp from "../image/icon/ic_stamp@2x.png";

const ChallengeCard = (props) => {
  const startDate = `${props.startDate.split(" ")[0].split("-")[0]}`;
  const endDate = `${props.endDate.split(" ")[0].split("-")[0]}`;

  return (
    <Box onClick={props._onClick} className={props.className}>
      <ImageBox
        status={props.status}
        style={{
          backgroundImage: `url(${
            props.challengeImage[0] ? props.challengeImage[0] : defaultImg
          })`,
        }}
      >
        <p className="small">
          <img src={peopleIcon} />
          {props.currentMember}/{props.maxMember}명
        </p>
        {props.dailyAuth && props.dailyAuth === "true" ? <Done></Done> : null}
      </ImageBox>
      <ContentBox>
        <div style={{ height: "58px" }}>
          <h3 className="ellipsis2">{props.title}</h3>
          <p className="caption caption_color" style={{ margin: "2px 0 6px" }}>
            {props.category}
          </p>
        </div>
        <div className="contents">
          <div>
            {props.tagName?.map((el, i) => {
              return <Tag key={i} tag={el}></Tag>;
            })}
          </div>
          <div className="date">
            <p className="small caption_color" style={{ marginRight: "6px" }}>
              {startDate} - {endDate}
            </p>
            <img
              src={props.isPrivate ? lock : null}
              style={{ width: "16px", verticalAlign: "sub" }}
            ></img>
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
  ${(props) =>
    props.className
      ? ``
      : `:nth-child(2n) {
    margin-right: 0;
  }`}
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
  background-image: url(${defaultImg});
  p {
    color: #fff;
    background-color: rgba(3, 1, 2, 0.5);
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

const Done = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  background-size: 82px;
  background-image: url(${stamp});
  background-position: center;
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
