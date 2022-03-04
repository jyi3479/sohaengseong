import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Grid } from "../elements";
import { challengeApis } from "../shared/apis";

const MyLevel = (props) => {
  const my_level = useSelector((state) => state.mypage.user);
  console.log(my_level);

  return (
    <Wrap>
      <Icon size={130} src={my_level.levelIcon} />
      <p>
        {my_level.nickname}
        <span onClick={() => console.log("프로필 수정 페이지로 이동")}>⚙️</span>
      </p>
      <Grid is_flex>
        <p>{my_level.levelName}/5</p>
      </Grid>
      <Progress my_level={my_level} />
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  border: 1px solid red;
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
    <ProgressBar>
      {/* <HighLight width={(count / bucket_list.length) * 100 + "%"}></HighLight> */}
      <HighLight
        width={(my_level.point / my_level.experiencePoint) * 100 + "%"}
      ></HighLight>
      <Circle></Circle>
    </ProgressBar>
  );
};

const ProgressBar = styled.div`
  background: #eee;
  width: 100%;
  height: 20px;
  border-radius: 10px;
  display: flex; // HighLight와 Circle이 한 줄에 붙어있게 하도록.
  align-items: center; //세로로 중앙 정렬
`;

const HighLight = styled.div`
  background: slateblue;
  transition: 1s;
  width: ${(props) => props.width};
  height: 20px;
  border-radius: 10px;
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  background: white;
  border: 5px solid slateblue;
  border-radius: 40px;
  margin: 0px 0px 0px -30px; //margin 마이너스 값을 줘서 왼쪽으로 들어가게 한다.
`;
