import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import axios from "axios";
import { mypageApis } from "../../shared/apis";

const GET_MYINFO = "GET_MYINFO";

const getMyInfo = createAction(GET_MYINFO, (myInfo) => ({ myInfo }));

const initialState = {
  myInfo: {
    userId: 0,
    nickname: "주영주영",
    profileUrl:
      "https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png",
    rankingPoint: 110,
    levelName: "Level.2",
    levelIcon:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlwiGD-SGQ1o7a3LV6bv845DCONAKTsd7yw&usqp=CAU",
    experiencePoint: 150,
  },
  list: [
    {
      challengeId: 0,
      title: "미라클 모닝(모집중)",
      content: "매일 아침 6시에 기상 후 명상하기",
      category: "루틴",
      challengeImage:
        "https://mblogthumb-phinf.pstatic.net/MjAxOTA1MjRfMyAg/MDAxNTU4Njk4NzY1Mjgx.TnYhG_pgAotagR12cQ92jf860VzfBPQKMy-bbEhSph8g.pvKOXCPBC1ShVkprSWAR2ulrLWuilRjkUJjhlqJGyB8g.JPEG.dudb850320/%EB%AA%85%EC%83%81.jpg?type=w800",
      maxMember: 20,
      currentMember: 0,
      startDate: "2022.02.28",
      endDate: "2022.03.10",
      isPrivate: true,
      tagName: ["새벽기상", "명상"],
      status: "모집중",
    },
    {
      challengeId: 1,
      title: "미라클 모닝(모집중)",
      content: "매일 아침 6시에 기상 후 명상하기",
      category: "루틴",
      challengeImage:
        "https://mblogthumb-phinf.pstatic.net/MjAxOTA1MjRfMyAg/MDAxNTU4Njk4NzY1Mjgx.TnYhG_pgAotagR12cQ92jf860VzfBPQKMy-bbEhSph8g.pvKOXCPBC1ShVkprSWAR2ulrLWuilRjkUJjhlqJGyB8g.JPEG.dudb850320/%EB%AA%85%EC%83%81.jpg?type=w800",
      maxMember: 15,
      currentMember: 3,
      startDate: "2022.02.28",
      endDate: "2022.03.10",
      isPrivate: false,
      tagName: ["새벽기상", "명상"],
      status: "모집중",
    },
    {
      challengeId: 2,
      title: "미라클 모닝(진행중)",
      content: "매일 아침 6시에 기상 후 명상하기",
      category: "루틴",
      challengeImage:
        "https://mblogthumb-phinf.pstatic.net/MjAxOTA1MjRfMyAg/MDAxNTU4Njk4NzY1Mjgx.TnYhG_pgAotagR12cQ92jf860VzfBPQKMy-bbEhSph8g.pvKOXCPBC1ShVkprSWAR2ulrLWuilRjkUJjhlqJGyB8g.JPEG.dudb850320/%EB%AA%85%EC%83%81.jpg?type=w800",
      maxMember: 13,
      currentMember: 0,
      startDate: "2022.02.28",
      endDate: "2022.03.10",
      isPrivate: true,
      tagName: ["새벽기상", "명상"],
      status: "진행중",
    },
    {
      challengeId: 3,
      title: "미라클 모닝(성공)",
      content: "매일 아침 6시에 기상 후 명상하기",
      category: "루틴",
      challengeImage:
        "https://mblogthumb-phinf.pstatic.net/MjAxOTA1MjRfMyAg/MDAxNTU4Njk4NzY1Mjgx.TnYhG_pgAotagR12cQ92jf860VzfBPQKMy-bbEhSph8g.pvKOXCPBC1ShVkprSWAR2ulrLWuilRjkUJjhlqJGyB8g.JPEG.dudb850320/%EB%AA%85%EC%83%81.jpg?type=w800",
      maxMember: 10,
      currentMember: 0,
      startDate: "2022.02.28",
      endDate: "2022.03.10",
      isPrivate: false,
      tagName: ["새벽기상", "명상"],
      status: "성공",
    },
    {
      challengeId: 4,
      title: "미라클 모닝(실패)",
      content: "매일 아침 6시에 기상 후 명상하기",
      category: "루틴",
      challengeImage:
        "https://mblogthumb-phinf.pstatic.net/MjAxOTA1MjRfMyAg/MDAxNTU4Njk4NzY1Mjgx.TnYhG_pgAotagR12cQ92jf860VzfBPQKMy-bbEhSph8g.pvKOXCPBC1ShVkprSWAR2ulrLWuilRjkUJjhlqJGyB8g.JPEG.dudb850320/%EB%AA%85%EC%83%81.jpg?type=w800",
      maxMember: 16,
      currentMember: 0,
      startDate: "2022.02.28",
      endDate: "2022.03.10",
      isPrivate: true,
      tagName: ["새벽기상", "명상"],
      status: "실패",
    },
    {
      challengeId: 5,
      title: "미라클 모닝(진행중)",
      content: "매일 아침 6시에 기상 후 명상하기",
      category: "루틴",
      challengeImage:
        "https://mblogthumb-phinf.pstatic.net/MjAxOTA1MjRfMyAg/MDAxNTU4Njk4NzY1Mjgx.TnYhG_pgAotagR12cQ92jf860VzfBPQKMy-bbEhSph8g.pvKOXCPBC1ShVkprSWAR2ulrLWuilRjkUJjhlqJGyB8g.JPEG.dudb850320/%EB%AA%85%EC%83%81.jpg?type=w800",
      maxMember: 10,
      currentMember: 0,
      startDate: "2022.02.28",
      endDate: "2022.03.10",
      isPrivate: false,
      tagName: ["새벽기상", "명상"],
      status: "진행중",
    },
    {
      challengeId: 6,
      title: "미라클 모닝(진행중)",
      content: "매일 아침 6시에 기상 후 명상하기",
      category: "루틴",
      challengeImage:
        "https://mblogthumb-phinf.pstatic.net/MjAxOTA1MjRfMyAg/MDAxNTU4Njk4NzY1Mjgx.TnYhG_pgAotagR12cQ92jf860VzfBPQKMy-bbEhSph8g.pvKOXCPBC1ShVkprSWAR2ulrLWuilRjkUJjhlqJGyB8g.JPEG.dudb850320/%EB%AA%85%EC%83%81.jpg?type=w800",
      maxMember: 5,
      currentMember: 0,
      startDate: "2022.02.28",
      endDate: "2022.03.10",
      isPrivate: true,
      tagName: ["새벽기상", "명상"],
      status: "진행중",
    },
  ],
};

const getMyInfoDB = (userId) => {
  return function (dispatch, getState, { history }) {
    mypageApis
      .getMyInfo(userId)
      .then((res) => {
        console.log("마이페이지 유저 정보 조회 성공", res);
        dispatch(getMyInfo(res.data));
      })
      .catch((err) => {
        console.log("마이페이지 유저 정보 조회 실패", err);
      });
  };
};

export default handleActions(
  {
    [GET_MYINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.myInfo = action.payload.myInfo;
      }),
  },
  initialState
);

const actionCreators = {
  //액션 생성자 내보내기
  getMyInfoDB,
};

export { actionCreators };
