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

const CategoryTab = (props) => {
    const dispatch = useDispatch();
    const params = props.match.params.categoryId;
    const [word,setWord] = React.useState("");
    const [tab,setTab] = React.useState(parseInt(params));
    const categoryList = useSelector(state => state.challenge.category_list);
 
    React.useEffect(()=>{
        dispatch(challengeAction.categoryChallengeDB(tab));
        //dispatch(challengeAction.getCategoryDB());
    },[tab]);

    return (
      <>
        {categoryList[tab] &&
        <>
        <SearchHeader
          value={word}
          _onChange={(e) => {
            setWord(e.target.value);
          }}
          _deleteBtn={() => {
            setWord("");
          }}
          _onClick={() => {
            dispatch(searchActions.getSearchDB(word));
          }}
        />
        <Grid padding="0" margin="71px 0 0">
          <TabWrap className="tab_wrap">
            <Tab
              type="button"
              className={tab === "all" ? "active" : ""}
              onClick={() => {
                setTab("all");
              }}
            >
              전체
            </Tab>
            <Tab
              type="button"
              className={tab === 1 ? "active" : ""}
              onClick={() => {
                setTab(1);
                history.push(`/category/1`);
              }}
            >
              일상 루틴
            </Tab>
            <Tab
              type="button"
              className={tab === 2 ? "active" : ""}
              onClick={() => {
                setTab(2);
                history.push(`/category/2`);
              }}
            >
              운동
            </Tab>
            <Tab
              type="button"
              className={tab === 3 ? "active" : ""}
              onClick={() => {
                setTab(3);
                history.push(`/category/3`);
              }}
            >
              스터디
            </Tab>
            <Tab
              type="button"
              className={tab === 4 ? "active" : ""}
              onClick={() => {
                setTab(4);
                history.push(`/category/4`);
              }}
            >
              식습관
            </Tab>
            <Tab
              type="button"
              className={tab === 5 ? "active" : ""}
              onClick={() => {
                setTab(5);
                history.push(`/category/5`);
              }}
            >
              힐링
            </Tab>
            <Tab
              type="button"
              className={tab === 6 ? "active" : ""}
              onClick={() => {
                setTab(6);
                history.push(`/category/6`);
              }}
            >
              취미
            </Tab>
            <Tab
              type="button"
              className={tab === 7 ? "active" : ""}
              onClick={() => {
                setTab(7);
                history.push(`/category/7`);
              }}
            >
              셀프케어
            </Tab>
            <Tab
              type="button"
              className={tab === 8 ? "active" : ""}
              onClick={() => {
                setTab(8);
                history.push(`/category/8`);
              }}
            >
              펫
            </Tab>
            <Tab
              type="button"
              className={tab === 9 ? "active" : ""}
              onClick={() => {
                setTab(9);
                history.push(`/category/9`);
              }}
            >
              친환경
            </Tab>
          </TabWrap>
          <p style={{ fontSize: "18px",marginTop:'20px',marginLeft: "20px", marginBottom: "24px" }}>
            총 <b>{categoryList[tab].length}</b>건
          </p>
          <Grid is_flex padding="20px">
            {tab !== "all" ? (
              categoryList[tab] ? (
                categoryList[tab].map((el, i) => {
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
              <ChallengeList />
            )}
          </Grid>
        </Grid>
        </>
        }
      </>
    );
};

const TabWrap = styled.div`
  padding: 0 20px 2px;
  white-space: nowrap;
  //overflow-x: scroll;
  //border-bottom: 10px solid #eee;
  display: flex;
  overflow: auto;
  height: 45px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: #7aaee7;
    border-radius: 6px;
  }
`;
const Tab = styled.button`
    margin-right: 20px;
    font-size: 16px;
    color: #ccc;
    border:none;
    background-color: transparent;
    padding: 10px 0;
    &.active {
        color: #000;
        border-bottom: 2px solid #000;
        font-weight: bold;
    }
`;

export default CategoryTab;