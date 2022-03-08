import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Image } from "../elements";
import { challengeApis, mypageApis } from "../shared/apis";
import { actionCreators as mypageAction } from "../redux/modules/mypage";

const MyLevel = (props) => {
  const dispatch = useDispatch();
  const my_level = useSelector((state) => state.mypage.myInfo);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(mypageAction.getMyInfoDB(userId));
  }, []);

  return (
    <Wrap>
      <MyContainer>
        <Grid is_flex padding="0px">
          <div style={{ display: "flex" }}>
            <div>
              <Image shape="circle" size={40} src={my_level.profileUrl} />
            </div>
            <Grid padding="0px 0px 0px 9px">
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.57",
                  letterSpacing: "-0.42px",
                }}
              >
                {my_level.nickname}
              </p>
              <p style={{ fontSize: "12px", color: "#999999" }}>
                {my_level.levelName}
              </p>
            </Grid>
          </div>

          <ProfileBtn onClick={() => console.log("프로필 수정 페이지로 이동")}>
            편집
          </ProfileBtn>
        </Grid>
        <Progress my_level={my_level} />
      </MyContainer>
      <MyPlanet>
        {/* <TooltipBox>
          <Tooltip>오늘 인증을 하면 레벨업!</Tooltip>
        </TooltipBox> */}
        <Icon
          size={92}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlwiGD-SGQ1o7a3LV6bv845DCONAKTsd7yw&usqp=CAU"
        />
        {/* <Icon size={92} src={my_level.levelIcon} /> */}
      </MyPlanet>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MyContainer = styled.div`
  background-color: #ffffff;
  width: 335px;
  border-radius: 10px;
  padding: 14px;
`;

const ProfileBtn = styled.button`
  width: 43px;
  height: 29px;
  margin: 0px 0px 16px;
  border-radius: 6px;
  border: solid 1px #ccc;
  background-color: #fff;
  color: #cccccc;
  font-size: 12px;
  font-family: inherit;
`;

const MyPlanet = styled.div`
  padding: 110px 0px 50px 0px;
  position: relative;
`;

const TooltipBox = styled.div`
  position: absolute;
  top: 30px;
`;

const Tooltip = styled.div`
  background-color: #eef3fd;
  border: #7689fd solid 1px;
  border-radius: 5px;
  color: #505bf0;
  font-size: 12px;
  font-weight: 500;
  height: auto;
  letter-spacing: -0.25px;
  margin-top: 6.8px;
  padding: 5px 11px;
  position: relative;
  width: fit-content;
  z-index: 100;

  ::after {
    border-color: #eef3fd transparent;
    border-style: solid;
    border-width: 0 6px 8px 6.5px;
    content: "";
    display: block;
    left: 75px;
    position: absolute;
    top: -7px;
    width: 0;
    z-index: 1;
  }

  ::before {
    border-color: #7689fd transparent;
    border-style: solid;
    border-width: 0 6px 8px 6.5px;
    content: "";
    display: block;
    left: 75px;
    position: absolute;
    top: -8px;
    width: 0;
    z-index: 0;
  }
`;

//나의 레벨에 해당하는 아이콘 이미지
const Icon = styled.img`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  min-width: var(--size);
  min-height: var(--size);
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;

export default MyLevel;

const Progress = (props) => {
  const my_level = props.my_level;
  //   const bucket_list = useSelector((state) => state.bucket.list);
  //   console.log(bucket_list);

  //   let count = 0;
  //   bucket_list.map((b, idx) => {
  //     if (b.completed) {
  //       count++;
  //     }
  //   });
  return (
    <>
      <ProgressBar>
        {/* <HighLight width={(count / bucket_list.length) * 100 + "%"}></HighLight> */}
        <HighLight
          width={(my_level.rankingPoint / my_level.experiencePoint) * 100 + "%"}
        ></HighLight>
      </ProgressBar>
      <Point>
        {my_level.rankingPoint}/{my_level.experiencePoint}
      </Point>
    </>
  );
};

const ProgressBar = styled.div`
  background: #eee;
  width: 251px;
  height: 9px;
  border-radius: 10px;
  display: flex; // HighLight와 Circle이 한 줄에 붙어있게 하도록.
  align-items: center; //세로로 중앙 정렬
  margin: 5px 20px 4px 48px;
`;

const HighLight = styled.div`
  background: #c6c6c6;
  transition: 1s;
  width: ${(props) => props.width};
  height: 9px;
  border-radius: 10px;
`;

const Point = styled.p`
  margin: 4px 10px 0 0;
  font-size: 12px;
  text-align: right;
  color: #999;
`;
