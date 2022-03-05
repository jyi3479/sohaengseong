import React from "react";
import styled from "styled-components";
import lock from "../image/icons/ic_lock@2x.png";
import peopleIcon from "../image/icons/ic_people@2x.png";
import { Grid } from "../elements";

const ChallengeCard = (props) => {
  return (
    <Box onClick={props._onClick}>
      <ImageBox status={props.status}>
        {(props.status === "성공" || props.status === "실패") && (
          <div
            style={{
              color: "white",
              fontWeight: "700",
              height: "24px",
            }}
          >
            {props.status}
          </div>
        )}

        <p>
          <img src={peopleIcon} />
          {props.currentMember}/{props.maxMember}명
        </p>
      </ImageBox>

      <Title>{props.title}</Title>
      <TagBox>
        {props.tagName?.map((el, i) => {
          return <Tag key={i}>{el}</Tag>;
        })}
      </TagBox>
      <Grid display="flex" padding="0px">
        <Date>
          {props.startDate} - {props.endDate}
        </Date>
        {props.isPrivate && <img src={lock} style={{ width: "20px" }} />}
      </Grid>
    </Box>
  );
};

const Box = styled.div`
  display: inline-block;
  width: 159px;
  height: 244px;
  margin-right: 8px;
  cursor: pointer;
`;

const ImageBox = styled.div`
  width: 159px;
  height: 152px;
  border-radius: 10px;

  background-image: url("https://t1.daumcdn.net/cfile/tistory/99C8CC365DBE46C613");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  ${(props) =>
    props.status === "성공" || props.status === "실패"
      ? "opacity: 0.5;"
      : "opacity: 0.9;"};

  text-align: center;
  position: relative;

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
`;

const TagBox = styled.div`
  /* margin: 8px 0; */
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
