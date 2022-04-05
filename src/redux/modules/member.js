import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { memberApis } from "../../shared/apis";
import moment from "moment";

// 인증 게시글
const GET_POST = "GET_POST";
const TARGET_POST = "TARGET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

const getPost = createAction(GET_POST, (postData) => ({ postData }));
const targetPost = createAction(TARGET_POST, (targetPost, commentData) => ({
  targetPost,
  commentData,
}));
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

//리포트
const GET_REPORT = "GET_REPORT";
const getReport = createAction(GET_REPORT, (report) => ({ report }));

const initialState = {
  postList: [],
  target: null,
  page: 0,
  has_next: false,
  is_loading: false,
  report: [],
};

const getOnePostDB = (challengeId, postId, page, size) => {
  return function (dispatch, getState, { history }) {
    memberApis
      .getOnePost(+challengeId, postId, page, size)
      .then((res) => {
        let is_next = null;
        if (res.data.next) {
          is_next = true;
        } else {
          is_next = false;
        }
        const commentData = {
          commentList: res.data.comments,
          page: page + 1,
          next: is_next,
          commentCnt: res.data.commentCnt,
        };
        dispatch(targetPost(res.data, commentData));
      })
      .catch((err) => {
        console.log("인증게시글 전체 조회 오류", err);
      });
  };
};

const getPostDB = (challengeId, page, size) => {
  return function (dispatch, getState, { history }) {
    memberApis
      .getPost(+challengeId, page, size)
      .then((res) => {
        let is_next = null;
        if (res.data.next) {
          is_next = true;
        } else {
          is_next = false;
        }
        const postData = {
          postList: res.data.postList,
          page: page + 1,
          next: is_next,
        };
        dispatch(getPost(postData));
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
  return function (dispatch) {
    memberApis
      .deletePost(+postId)
      .then((res) => {
        dispatch(deletePost(+postId));
      })
      .catch((err) => {
        console.log("인증 게시글 삭제 오류", err);
        window.alert("인증 게시글 삭제 오류")
      });
  };
};

const addCommentDB = (postId, content) => {
  return function (dispatch, getState) {
    const userInfo = getState().user.user;

    memberApis
      .addComment(+postId, {
        content: content,
      })
      .then((res) => {
        const comment = {
          levelName: userInfo.level,
          nickname: userInfo.nickname,
          profileImage: userInfo.profileUrl,
          commentId: res.data.commentId,
          content: content,
          createdAt: moment().startOf("seconds"), // 오늘 날짜의 초의 시작이 언제였는지
        };
        dispatch(addComment(postId, comment));
      })
      .catch((err) => {
        console.log("댓글 작성 오류", err);
        window.alert("댓글 작성 오류")
      });
  };
};

const deleteCommentDB = (postId, commentId) => {
  return function (dispatch) {
    memberApis
      .deleteComment(+commentId)
      .then((res) => {
        dispatch(deleteComment(postId, commentId));
      })
      .catch((err) => {
        console.log("댓글 삭제 오류", err);
        window.alert("댓글 삭제 오류")
      });
  };
};

const exitChallengeDB = (challengeId) => {
  return function ({ history }) {
    memberApis
      .exitChallenge(challengeId)
      .then((res) => {
        history.replace("/");
      })
      .catch((err) => {
      console.log("챌린지 나가기 오류", err);
      window.alert("챌린지 나가기 오류")
    });
  };
};

const getReportDB = (challengeId, startDate) => {
  return function (dispatch) {
    memberApis
      .getReport(challengeId, startDate)
      .then((res) => {
        dispatch(getReport(res.data));
      })
      .catch((err) => {
        console.log("리포트 조회 오류", err);
      });
  };
};

export default handleActions(
  {
    //인증 게시글
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.postData.page > 1) {
          draft.postList.push(...action.payload.postData.postList);
        } else {
          draft.postList = action.payload.postData.postList;
        }
        draft.page = action.payload.postData.page;
        draft.has_next = action.payload.postData.next;
        draft.is_loading = false;
      }),

    [TARGET_POST]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.commentData.page > 1) {
          draft.target.comments.push(...action.payload.targetPost.comments);
        } else {
          draft.target = action.payload.targetPost;
        }

        draft.target.page = action.payload.commentData.page;
        draft.target.has_next = action.payload.commentData.next;
        draft.is_loading = false;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        // 서버에서 새롭게 페이징 처리된 첫 페이지 데이터 받아오기 위해
        draft.page = 0;
      }),

    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.postList.findIndex(
          (p) => p.postId === action.payload.postId
        );
        draft.postList.splice(idx, 1);
        // 서버에서 새롭게 페이징 처리된 첫 페이지 데이터 받아오기 위해
        draft.page = 0;
      }),

    // 댓글
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.target.comments.unshift(action.payload.comment);
        draft.target.commentCnt++;
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let commentIdx = draft.target.comments.findIndex(
          (p) => p.commentId === action.payload.commentId
        );
        draft.target.comments.splice(commentIdx, 1);
        draft.target.commentCnt--;
      }),
    [GET_REPORT]: (state, action) =>
      produce(state, (draft) => {
        draft.report = action.payload.report;
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
  exitChallengeDB,
  getReportDB,
  getOnePostDB,
};

export { actionCreators };
