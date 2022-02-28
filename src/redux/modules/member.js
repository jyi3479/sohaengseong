import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import axios from "axios";

const initialState = {
  post: [
    {
      postId: 0,
      nickname: "챌린이",
      profileImage:
        "https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png",
      content: "오늘 6시 기상 인증!!",
      postImage:
        "https://mblogthumb-phinf.pstatic.net/MjAxOTA1MjRfMyAg/MDAxNTU4Njk4NzY1Mjgx.TnYhG_pgAotagR12cQ92jf860VzfBPQKMy-bbEhSph8g.pvKOXCPBC1ShVkprSWAR2ulrLWuilRjkUJjhlqJGyB8g.JPEG.dudb850320/%EB%AA%85%EC%83%81.jpg?type=w800",
      createdAt: "2022-02-28",
      comments: [
        {
          nickname: "챌르신",
          profileImage:
            "https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png",
          commentId: 0,
          content: "오 대단해요!!!",
          createdAt: "2022-02-28",
        },
        {
          nickname: "챌르신",
          profileImage:
            "https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png",
          commentId: 1,
          content: "와와아아아~",
          createdAt: "2022-02-28",
        },
      ],
    },
    {
      postId: 1,
      nickname: "챌린이",
      profileImage:
        "https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png",
      content: "오늘 6시 기상 인증!!",
      postImage:
        "https://mblogthumb-phinf.pstatic.net/MjAxOTA1MjRfMyAg/MDAxNTU4Njk4NzY1Mjgx.TnYhG_pgAotagR12cQ92jf860VzfBPQKMy-bbEhSph8g.pvKOXCPBC1ShVkprSWAR2ulrLWuilRjkUJjhlqJGyB8g.JPEG.dudb850320/%EB%AA%85%EC%83%81.jpg?type=w800",
      createdAt: "2022-02-28",
      comments: [
        {
          nickname: "챌르신",
          profileImage:
            "https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png",
          commentId: 0,
          content: "오 대단해요!!!",
          createdAt: "2022-02-28",
        },
        {
          nickname: "챌르신",
          profileImage:
            "https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png",
          commentId: 1,
          content: "와와아아아~",
          createdAt: "2022-02-28",
        },
      ],
    },
  ],
};

export default handleActions({}, initialState);

const actionCreators = {
  //액션 생성자 내보내기
};

export { actionCreators };
