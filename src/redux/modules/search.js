import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { searchApis } from "../../shared/apis";

const GET_SEARCH = "GET_SEARCH";
const GET_RECOMMEND = "GET_RECOMMEND";

//검색 리스트 저장하는 액션
const getSearch = createAction(GET_SEARCH, (search_list, page) => ({
  search_list,
  page,
}));
//추천 검색어 액션
const getRecommend = createAction(GET_RECOMMEND, (recommend_list) => ({
  recommend_list,
}));

const initialState = {
  challengeList: [],
  next: false,
  page: 0,
  totalCnt: 0,
  recommend: [],
  is_loading: false,
};

const getSearchDB = (word, page, size) => {
  return function (dispatch) {
    searchApis
      .getSearch(word, page, size)
      .then((res) => {
        dispatch(getSearch(res.data, page + 1));
      })
      .catch((err) => {
        console.log("검색어 에러", err);
      });
  };
};

const getRecommendDB = () => {
  return function (dispatch) {
    searchApis
      .recommend()
      .then((res) => {
        dispatch(getRecommend(res.data));
      })
      .catch((err) => {
        console.log("추천 검색어 에러", err);
      });
  };
};

export default handleActions(
  {
    [GET_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.page > 1) {
          draft.challengeList.push(...action.payload.search_list.challengeList);
        } else {
          draft.challengeList = action.payload.search_list.challengeList;
        }

        draft.page = action.payload.page;
        draft.next = action.payload.search_list.next;
        draft.totalCnt = action.payload.search_list.totalCnt;
        draft.is_loading = false;
      }),
    [GET_RECOMMEND]: (state, action) =>
      produce(state, (draft) => {
        draft.recommend = action.payload.recommend_list;
      }),
  },
  initialState
);

const actionCreators = {
  //액션 생성자 내보내기
  getRecommendDB,
  getSearchDB,
};

export { actionCreators };
