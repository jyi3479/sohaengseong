import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import axios from "axios";

// 인증 게시글
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (postId, post) => ({ postId, post }));
const deletePost = createAction(DELETE_POST, (postId) => ({ postId }));

//댓글
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

const addComment = createAction(ADD_COMMENT, (postId, comment) => ({
  postId,
  comment,
}));
const deleteComment = createAction(DELETE_COMMENT, (postId, commentId) => ({
  postId,
  commentId,
}));

const initialState = {
  post_list: [
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
          nickname: "홍길동",
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
      nickname: "챌르신",
      profileImage:
        "https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png",
      content: "오늘 6시 기상 했습니다!!",
      postImage:
        "https://mblogthumb-phinf.pstatic.net/MjAxOTA1MjRfMyAg/MDAxNTU4Njk4NzY1Mjgx.TnYhG_pgAotagR12cQ92jf860VzfBPQKMy-bbEhSph8g.pvKOXCPBC1ShVkprSWAR2ulrLWuilRjkUJjhlqJGyB8g.JPEG.dudb850320/%EB%AA%85%EC%83%81.jpg?type=w800",
      createdAt: "2022-02-28",
      comments: [
        {
          nickname: "김영희",
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

export default handleActions(
  {
    //인증 게시글
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list.unshift(action.payload.post);
      }),

    // 댓글
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.post_list.findIndex(
          (p) => p.postId === action.payload.postId
        );
        draft.post_list[idx].comments.unshift(action.payload.comment);
      }),
  },
  initialState
);

const actionCreators = {
  //액션 생성자 내보내기
  addComment,
  addPost,
};

export { actionCreators };
