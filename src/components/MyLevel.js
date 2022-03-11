import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

import { Button, Grid, Image } from "../elements";

import { challengeApis, mypageApis } from "../shared/apis";
import { actionCreators as mypageAction } from "../redux/modules/mypage";

import defaultImg from "../image/img_profile_defalt @2x.png";
import bg from "../image/my_bg.png";

const MyLevel = (props) => {
  const dispatch = useDispatch();
  const my_level = useSelector((state) => state.mypage.myInfo);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(mypageAction.getMyInfoDB(userId));
  }, []);

  return (
    <>
    {my_level&&   
    <Wrap>
      <MyContainer>
        <Grid is_flex padding="0px">
          <div style={{ display: "flex", alignItems:"center" , width:"calc(100% - 70px)"}}>            
            <Image shape="border" size="42" profile={my_level.profileUrl !== null? my_level.profileUrl : defaultImg}/>            
            <Grid padding="0px 0px 0px 9px" width="calc(100% - 54px)">
              <p>{my_level.nickname}</p>
              <p className="sub_color caption caption_color">{my_level.levelName}</p>
            </Grid>
          </div>
          <Button small_btn
            onClick={() => {
              history.push("/mypage/profile");
            }}
          >
            편집
          </Button>
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
     }      
     </>
  );
};

const Wrap = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(${bg});
  background-position: center;
  background-size: cover;
`;

const MyContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
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

  return (
    <>
      <ProgressBar>
        {/* <HighLight width={(count / bucket_list.length) * 100 + "%"}></HighLight> */}
        <HighLight
          width={(my_level.rankingPoint / my_level.experiencePoint) * 100 + "%"}
        ></HighLight>
      </ProgressBar>
      <p className="sub_color caption t_right">{my_level.rankingPoint}/{my_level.experiencePoint}</p>
    </>
  );
};

const ProgressBar = styled.div`
  background: #f4f6fa;
  width: calc(100% - 54px);
  height: 8px;
  border-radius: 10px;
  display: flex; // HighLight와 Circle이 한 줄에 붙어있게 하도록.
  align-items: center; //세로로 중앙 정렬
  margin: 16px 20px 2px 54px;
`;

const HighLight = styled.div`
  background: #95c8d7;
  transition: 1s;
  width: ${(props) => props.width};
  height: 100%;
  border-radius: 10px;
`;
