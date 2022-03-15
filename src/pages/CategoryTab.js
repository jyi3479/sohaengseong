import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import {Grid} from "../elements/index";
import { useSelector , useDispatch} from "react-redux";
import ChallengeCard from "../components/ChallengeCard";
import ChallengeList from "../components/ChallengeList";
import SearchHeader from "../components/SearchHeader";
import { actionCreators as challengeAction } from "../redux/modules/challenge";
import { actionCreators as searchActions} from "../redux/modules/search";
import { StaticRouter } from "react-router-dom";
import { Category } from "@material-ui/icons";
import _ from 'lodash'

const CategoryTab = (props) => {
    const dispatch = useDispatch();
    const params = props.match.params.categoryId;
    const [word,setWord] = React.useState("");
    const [search_list,setSearch_list] = React.useState('');
    const categoryList = useSelector((state) => state.challenge.category_list);
    const searchList = useSelector((state) => state.search.list)
    const allList = useSelector((state) => state.challenge.list);
    const location = window.location.pathname;
    const tabId = location.split("/")[2];
    const throttle = _.throttle((e)=>
      console.log('throttle :::', e.target.value)
    , 1000)
    const keyPress = React.useCallback(throttle, []);
    console.log("카테고리", params,location,tabId);

    React.useEffect(()=>{
      if (tabId !== 'all'){
        dispatch(challengeAction.categoryChallengeDB(tabId));
      }else {
        dispatch(challengeAction.getChallengeDB());
      }
    },[tabId]);
   
    const onChangeSearch = (e) => {
        setWord(e.target.value);
            keyPress(e)
            dispatch(searchActions.getSearchDB(word))
            setSearch_list(searchList);
    }
    return (
      <>
        <SearchHeader
          value={word}
          _onChange={onChangeSearch}
          _deleteBtn={() => {
            setWord("");
          }}
          _onClick={() => {
            dispatch(searchActions.getSearchDB(word));
            history.push("/category/all");
            setSearch_list(searchList)
          }}
        />
        <Grid padding="0" margin="71px 0 0">
          <TabWrap className="tab_wrap">
            <Tab
              type="button"
              className={tabId === "all" ? "active" : ""}
              onClick={() => {
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
          </TabWrap>
          <p
            style={{
              fontSize: "18px",
              marginTop: "20px",
              marginLeft: "20px",
              marginBottom: "24px",
            }}
          >
            총
            <b>
              {tabId !== "all"
                ? categoryList[tabId]
                  ? categoryList[tabId].length
                  : 0
                : search_list? searchList.length : allList.length}
            </b>
            건
          </p>
          <Grid is_flex padding="20px">
            {tabId !== "all" ? (
              categoryList[tabId] ? (
                categoryList[tabId].map((el, i) => {
                  return (
                    <ChallengeCard
                      key={el.challengeId}
                      {...el}
                      _onClick={() => {
                        history.push(`/challenge/${el.challengeId}`);
                      }}
                    ></ChallengeCard>
                  );
                })
              ) : (
                <h1>앗 게시글이 없어요 !</h1>
              )
            ) : (
              <>
                {search_list
                  ? searchList.map((el, i) => {
                      return (
                        <ChallengeCard
                          key={i}
                          {...el}
                          _onClick={() => {
                            history.push(`/challenge/${el.challengeId}`);
                          }}
                        ></ChallengeCard>
                      );
                    })
                  : allList.map((el, i) => {
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
              </>
            )}
          </Grid>
        </Grid>
      </>
    );
};

const TabWrap = styled.div`
  padding: 0 20px;
  white-space: nowrap;
  //overflow-x: scroll;
  //border-bottom: 10px solid #eee;
  display: flex;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: #030102;
    border-radius: 6px;
  }
`;
const Tab = styled.button`
    margin-right: 16px;
    font-size: 18px;
    color: #030102;
    border:none;
    background-color: transparent;
    padding: 6px 0;
    opacity: 0.5;
    &.active {
        border-bottom: 2px solid #030102;
        font-weight: bold;
        opacity: 1;
    }
`;

export default CategoryTab;