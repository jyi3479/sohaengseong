import React, { useMemo } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Grid, Button } from "../elements/index";
import { useSelector, useDispatch } from "react-redux";
import ChallengeCard from "../components/ChallengeCard";
import SearchHeader from "../components/SearchHeader";
import { actionCreators as challengeAction } from "../redux/modules/challenge";
import { actionCreators as searchActions } from "../redux/modules/search";
import _ from "lodash";

//스크롤바 커스텀
import ScrollBar from "../components/shared/ScrollBar";

//img import
import notfound from "../image/icon/ic_empty_l@2x.png";
import InfinityScroll from "../shared/InfiniteScroll";


const CategoryTab = () => {
  const dispatch = useDispatch();
  const location = window.location.pathname;
  const tabId = location.split("/")[2];
  // const tabId = match.params.categoryId;

  const [word, setWord] = React.useState("");
  const [search_list, setSearch_list] = React.useState("");
  const [active, setActive] = React.useState(true);
  const [focus, setFocus] = React.useState(true);

  const challengeInfo = useSelector((state) => state.challenge);
  const categoryList = challengeInfo.categoryList;
  const recommend_list = useSelector((state) => state.search.recommend); //추천검색어
  const searchInfo = useSelector((state) => state.search.list);
  const searchList = searchInfo.challengeList;
  const allList = challengeInfo.list;

  const [page, setPage] = React.useState(challengeInfo.page);
  const [totalCnt, setTotalCnt] = React.useState(challengeInfo.totalCnt);

  //검색 axios 요청을 줄이기위한 debounce
  const debounce = _.debounce((word) => {
    history.push("/category/all");
    if (word !== "" || word !== " ") {
      dispatch(searchActions.getSearchDB(word, 0, 6));
      setSearch_list(searchList);
    }
  }, 600);
  const keyPress = React.useCallback(debounce, []);

  const ChangeWord = (e) => {
    //추천 검색어 클릭 시
    setFocus(false);
    setWord(e.target.innerText);
    dispatch(searchActions.getSearchDB(e.target.innerText, 0, 6));
    setSearch_list(searchList);
  };

  const onChangeSearch = (e) => {
    //검색어 입력 시
    if (word !== "" || word !== " ") {
      setFocus(false);
      setWord(e.target.value);
      keyPress(e.target.value);
    }
    setSearch_list(searchList);
  };

  React.useEffect(() => {
    setPage(0);
    dispatch(searchActions.getRecommendDB()); //추천 검색어 가져오기
    if (!page) {
      if (tabId === "all") {
        //전체 리스트 불러오기
        dispatch(challengeAction.getChallengeDB(0, 6));
      } else {
        //전체 탭이 아닐경우 카테고리 리스트 불러오기
        dispatch(challengeAction.categoryChallengeDB(tabId, 0, 6));
        setFocus(false);
      }
    }
  }, [tabId]);

  // 무한스크롤 callNext 함수들
  const getChallengeList = () => {
    dispatch(challengeAction.getChallengeDB(challengeInfo.page, 6));
  };

  const getCategoryList = () => {
    dispatch(challengeAction.categoryChallengeDB(tabId, challengeInfo.page, 6));
  };

  const getSearchList = () => {
    dispatch(searchActions.getSearchDB(word, searchInfo.page, 6));
  };

  return (
    <>
      <SearchHeader
        id="search_header"
        value={word}
        _onChange={onChangeSearch}
        _deleteBtn={() => {
          setWord("");
        }}
        _onFocus={(e) => {
          setFocus(true);
        }}
        _onClick={() => {
          dispatch(searchActions.getSearchDB(word, 0, 6));
          history.push("/category/all");
          setSearch_list(searchList);
        }}
      />

      <Grid padding="0">
        <Wrap>                 
          <TabWrap className="tab_wrap">
          <ScrollBar width="500px" direction="ltr">
          <div style={{ display: "flex", whiteSpace: "nowrap"}}>     
            <Tab
              type="button"
              className={tabId === "all" ? "active" : ""}
              onClick={() => {
                setSearch_list("");
                history.push(`/category/all`);
              }}
            >
              전체
            </Tab>
            <Tab
              type="button"
              className={tabId === "1" ? "active" : ""}
              onClick={() => {
                history.push(`/category/1`);
              }}
            >
              일상 루틴
            </Tab>
            <Tab
              type="button"
              className={tabId === "2" ? "active" : ""}
              onClick={() => {
                history.push(`/category/2`);
              }}
            >
              운동
            </Tab>
            <Tab
              type="button"
              className={tabId === "3" ? "active" : ""}
              onClick={() => {
                history.push(`/category/3`);
              }}
            >
              스터디
            </Tab>
            <Tab
              type="button"
              className={tabId === "4" ? "active" : ""}
              onClick={() => {
                history.push(`/category/4`);
              }}
            >
              식습관
            </Tab>
            <Tab
              type="button"
              className={tabId === "5" ? "active" : ""}
              onClick={() => {
                history.push(`/category/5`);
              }}
            >
              힐링
            </Tab>
            <Tab
              type="button"
              className={tabId === "6" ? "active" : ""}
              onClick={() => {
                history.push(`/category/6`);
              }}
            >
              취미
            </Tab>
            <Tab
              type="button"
              className={tabId === "7" ? "active" : ""}
              onClick={() => {
                history.push(`/category/7`);
              }}
            >
              셀프케어
            </Tab>
            <Tab
              type="button"
              className={tabId === "8" ? "active" : ""}
              onClick={() => {
                history.push(`/category/8`);
              }}
            >
              펫
            </Tab>
            <Tab
              type="button"
              className={tabId === "9" ? "active" : ""}
              onClick={() => {
                history.push(`/category/9`);
              }}
            >
              친환경
            </Tab>
            </div>
            </ScrollBar>
          </TabWrap>
          
          
          <Grid padding="0" margin="87px 0 0">
            <p className="count poppins">
              총
              <b className="poppins">
                {tabId !== "all"
                  ? categoryList
                    ? challengeInfo.totalCnt
                    : 0
                  : word
                  ? searchInfo.totalCnt
                  : challengeInfo.totalCnt}
              </b>
              건
            </p>
            <Grid is_flex padding="0">
              {tabId !== "all" ? (
                categoryList && challengeInfo.totalCnt !== 0 ? (
                  <InfinityScroll
                    callNext={getCategoryList}
                    paging={{ next: challengeInfo.has_next }}
                  >
                    {categoryList.map((el, i) => {
                      return (
                        <ChallengeCard
                          key={el.challengeId}
                          {...el}
                          _onClick={() => {
                            history.push(`/challenge/${el.challengeId}`);
                          }}
                        ></ChallengeCard>
                      );
                    })}
                  </InfinityScroll>
                ) : (
                  <NotFound className="t_center">
                    <img src={notfound} />
                    <h2>검색 결과가 없습니다.</h2>
                    <p className="sub_color mt12">
                      원하는 챌린지를 찾지 못했다면
                      <br />
                      챌린지를 직접 개설해보세요.
                    </p>
                    <Button
                      border_btn
                      margin="27px 0 0"
                      bg="transparent !important"
                      _onClick={() => {
                        history.push("/challengewrite");
                      }}
                    >
                      행성 개설하기
                    </Button>
                  </NotFound>
                )
              ) : (
                <>
                  {word ? (
                    searchInfo.totalCnt > 0 ? (
                      <InfinityScroll
                        callNext={getSearchList}
                        paging={{ next: searchInfo.next }}
                      >
                        {searchList.map((el, i) => {
                          return (
                            <ChallengeCard
                              key={i}
                              {...el}
                              _onClick={() => {
                                history.push(`/challenge/${el.challengeId}`);
                              }}
                            ></ChallengeCard>
                          );
                        })}
                      </InfinityScroll>
                    ) : (
                      <NotFound className="t_center">
                        <img src={notfound} />
                        <h2>검색 결과가 없습니다.</h2>
                        <p className="sub_color mt12">
                          원하는 챌린지를 찾지 못했다면
                          <br />
                          챌린지를 직접 개설해보세요.
                        </p>
                        <Button
                          border_btn
                          margin="27px 0 0"
                          bg="transparent !important"
                          _onClick={() => {
                            history.push("/challengewrite");
                          }}
                        >
                          행성 개설하기
                        </Button>
                      </NotFound>
                    )
                  ) : (
                    <InfinityScroll
                      callNext={getChallengeList}
                      paging={{ next: challengeInfo.has_next }}
                    >
                      {allList.map((el, i) => {
                        return (
                          <ChallengeCard
                            key={i}
                            {...el}
                            _onClick={() => {
                              history.push(`/challenge/${el.challengeId}`);
                            }}
                          ></ChallengeCard>
                        );
                      })}
                    </InfinityScroll>
                  )}
                </>
              )}
            </Grid>
          </Grid>
          <Grid
            padding="30px 20px"
            margin="48px 0 0"
            className={focus ? "recommend_box show" : "recommend_box"}
          >
            <h3>실시간 추천 검색어</h3>
            <div className="mt12">
              {recommend_list &&
                recommend_list.map((el, i) => {
                  return (
                    <Tag key={i} onClick={ChangeWord}>
                      {el}
                    </Tag>
                  );
                })}
            </div>
          </Grid>
        </Wrap>
      </Grid>
    </>
  );
};

const TabWrap = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  top: 48px;
  padding: 12px 20px 0;
  overflow: auto;
  background-color: #fff;
  border-bottom: 1px solid #e4e5e6;
  z-index: 5;
`;

const Tab = styled.button`
  margin-right: 16px;
  font-size: 15px;
  color: rgba(3, 1, 2, 0.5);
  padding-bottom: 6px;
  border: none;
  background-color: #fff;
  border-bottom: 2px solid transparent;
  opacity: 0.5;
  &.active {
    color: #4149d3;
    border-bottom: 2px solid #4149d3;
    font-weight: bold;
    opacity: 1;
  }
`;

const Wrap = styled.div`
  padding: 24px 20px;
  .count {
    margin-bottom: 16px;
    font-size: 15px;
    b {
      margin-left: 4px;
    }
  }
  .recommend_box {
    display: none;
    position: fixed;
    width: 100%;
    height: calc(100vh - 48px);
    background-color: #f4f6fa;
    left: 0;
    top: 0;
    z-index: 5;
    &.show {
      display: block;
    }
  }
`;

const Tag = styled.div`
  display: inline-block;
  background-color: rgba(162, 170, 179, 0.1);
  font-size: 14px;
  border: 1px solid rgba(162, 170, 179, 0.5);
  padding: 4px 12px;
  border-radius: 20px;
  margin: 0 6px 6px 0;
  cursor: pointer;
  &:nth-child(n + 6) {
    display: none;
  }
`;

const NotFound = styled.div`
  width: 100%;
  margin-top: 80px;
  padding: 0 20px;
  img {
    width: 100px;
  }
`;

export default CategoryTab;
