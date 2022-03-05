import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import axios from "axios";
import { memberApis } from "../../shared/apis";

// 인증 게시글
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

const getPost = createAction(GET_POST, (postList) => ({ postList }));
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
  postList: [
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
      postImage: null,
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
    {
      postId: 2,
      nickname: "챌로",
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
  ],
};

const getPostDB = (challengeId) => {
  return function (dispatch, getState, { history }) {
    console.log(+challengeId);
    memberApis
      .getPost(+challengeId)
      .then((res) => {
        console.log("인증게시글 전체 조회 성공", res);
        dispatch(getPost(res.data));
      })
      .catch((err) => {
        console.log("인증게시글 전체 조회 오류", err);
      });
  };
};

const addPostDB = (challengeId, post) => {
  return function (dispatch, getState, { history }) {
    // console.log(+challengeId);
    // memberApis
    //   .addPost(+challengeId, post)
    //   .then((res) => {
    //     console.log("인증 게시글 작성", res);
    //   })
    //   .catch((err) => {
    //     console.log("인증 게시글 작성 오류", err);
    //   });
  };
};

const deletePostDB = (postId) => {
  return function (dispatch, getState, { history }) {
    console.log(+postId);
    memberApis
      .deletePost(+postId)
      .then((res) => {
        console.log("인증 게시글 삭제", res);
        dispatch(deletePost(+postId));
      })
      .catch((err) => {
        console.log("인증 게시글 삭제 오류", err);
      });
  };
};

const addCommentDB = (postId, content) => {
  return function (dispatch, getState, { history }) {
    const userInfo = getState().user.user;

    memberApis
      .addComment(+postId, {
        content: content,
      })
      .then((res) => {
        console.log("댓글 작성", res);
        const comment = {
          nickname: userInfo.nickname,
          profileImage: "",
          commentId: res.data.commentId,
          content: content,
          createdAt: "",
        };
        dispatch(addComment(postId, comment));
      })
      .catch((err) => {
        console.log("댓글 작성 오류", err);
      });
  };
};

const deleteCommentDB = (postId, commentId) => {
  return function (dispatch, getState, { history }) {
    memberApis
      .deleteComment(+commentId)
      .then((res) => {
        console.log("댓글 삭제", res);
        dispatch(deleteComment(postId, commentId));
      })
      .catch((err) => {
        console.log("댓글 삭제 오류", err);
      });
  };
};

export default handleActions(
  {
    //인증 게시글
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.postList = action.payload.postList;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.postList.unshift(action.payload.post);
      }),

    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.postList.findIndex(
          (p) => p.postId === action.payload.postId
        );
        draft.postList.splice(idx, 1);
      }),

    // 댓글
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.postList.findIndex(
          (p) => p.postId === action.payload.postId
        );
        draft.postList[idx].comments.unshift(action.payload.comment);
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let postIdx = draft.postList.findIndex(
          (p) => p.postId === action.payload.postId
        );

        let commentIdx = draft.postList[postIdx].comments.findIndex(
          (p) => p.commentId === action.payload.commentId
        );
        draft.postList[postIdx].comments.splice(commentIdx, 1);
      }),
  },
  initialState
);

const actionCreators = {
  //액션 생성자 내보내기
  addComment,
  addPost,
  addCommentDB,
  addPostDB,
  getPostDB,
  deletePostDB,
  deleteCommentDB,
};

export { actionCreators };
