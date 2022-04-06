import React from "react";
import styled from "styled-components";
import { Image } from "../../elements/index";

import down from "../../image/icon/ic_down@2x.png";
import up from "../../image/icon/ic_up@2x.png";
import same from "../../image/icon/ic_same@2x.png";
import defaultImg from "../../image/img_profile_defalt @2x.png";

const RankingCard = (props) => {
  return (
    <>
      <Box className={props.className}>
        <RankWrap>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Rank
              className={
                props.className.includes("is_me")
                  ? "poppins bold is_me"
                  : "poppins bold"
              }
            >
              {props.rank}
            </Rank>
            <State>
              {props.status !== "유지" ? (
                props.status === "상승" ? (
                  <img src={up} alt="랭킹 상승 아이콘"/>
                ) : (
                  <img src={down} alt="랭킹 하락 아이콘"/>
                )
              ) : (
                <img src={same} alt="랭킹 유지 아이콘"/>
              )}
            </State>
            <Image
              shape="border"
              size="42"
              level={props.level}
              profile={
                props.profileImage !== null ? props.profileImage : defaultImg
              }
            />
          </div>
          <Info>
            <p>
              {props.nickname}{" "}
              <span
                className="sub_point_color small t_center"
                style={{
                  display: props.className.includes("is_me")
                    ? "inline-block"
                    : "none",
                }}
              >
                Me
              </span>
            </p>
            <p className="small caption_color">{props.level}</p>
          </Info>
        </RankWrap>
        <Point className="poppins">{props.rankingPoint}</Point>
      </Box>
    </>
  );
};

const Box = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eff0f2;
  :last-child {
    border: none;
  }
`;

const RankWrap = styled.div`
  width: calc(100% - 30px);
  display: flex;
  align-items: center;
  padding: 12px 0;
`;
const Rank = styled.p`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: rgba(14, 32, 49, 0.7);
  color: #fff;
  text-align: center;
  line-height: 23px;
  &.is_me {
    background-color: transparent;
    color: #50566d;
  }
`;
const State = styled.div`
  width: 16px;
  height: 16px;
  margin: 0 12px 0 8px;
  > img {
    width: 100%;
  }
`;
const Info = styled.div`
  margin: 0 8px;
  span {
    width: 40px;
    display: inline-block;
    border-radius: 10px;
    padding: 1px 6px 2px;
    background-color: rgba(23, 171, 214, 0.1);
  }
`;

const Point = styled.p`
  width: 30px;
  text-align: right;
`;

export default RankingCard;
