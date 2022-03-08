import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import {Grid} from "../elements/index";
import { useSelector , useDispatch} from "react-redux";
import Card from "../components/Card";
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


    console.log("카테고리", params,tab);

    React.useEffect(()=>{
        dispatch(challengeAction.categoryChallengeDB(tab));
        //dispatch(challengeAction.getCategoryDB());
    },[tab]);

    return(
        <>
            <SearchHeader value={word} _onChange={(e)=>{
                setWord(e.target.value);
            }}
                _deleteBtn={()=>{
                    setWord("");
                }}
                _onClick={()=>{
                    dispatch(searchActions.getSearchDB(word));
                }}
            />
            <Grid padding="0" margin="71px 0 0">
                <TabWrap className="tab_wrap">
                    <Tab type="button" className={tab === "all"? "active" : ""} onClick={()=>{ 
                        setTab("all") }}>전체</Tab>
                    <Tab type="button" className={tab === 1 ? "active" : ""} onClick={()=>{ 
                        setTab(1)}}>일상 루틴</Tab>
                    <Tab type="button" className={tab === 2 ? "active" : ""} onClick={()=>{ 
                        setTab(2)}}>운동</Tab>
                    <Tab type="button" className={tab === 3 ? "active" : ""} onClick={()=>{ 
                        setTab(3)}}>스터디</Tab>
                    <Tab type="button" className={tab === 4 ? "active" : ""} onClick={()=>{ 
                        setTab(4)}}>식습관</Tab>
                    <Tab type="button" className={tab === 5 ? "active" : ""} onClick={()=>{ 
                        setTab(5)}}>힐링</Tab>
                    <Tab type="button" className={tab === 6 ? "active" : ""} onClick={()=>{ 
                        setTab(6)}}>취미</Tab>
                    <Tab type="button" className={tab === 7 ? "active" : ""} onClick={()=>{
                        setTab(7)}}>셀프케어</Tab>
                    <Tab type="button" className={tab === 8 ? "active" : ""} onClick={()=>{ 
                        setTab(8)}}>펫</Tab>
                    <Tab type="button" className={tab === 9 ? "active" : ""} onClick={()=>{ 
                        setTab(9)}}>친환경</Tab>
                </TabWrap>
                <Grid is_flex flexWrap padding="20px">
                    <p style={{fontSize:"18px", marginBottom:"24px"}}>총 <b>63</b>건</p>
                {/* {tab !== "all"? categoryList[tab]?categoryList[tab].map((el,i)=>{
                    return(
                            <Card 
                                key={el.challengeId}
                                {...el}
                                _onClick={()=>{
                                    history.push(`/challenge/${el.challengeId}`);
                                }}
                            ></Card>
                    );
                    
                }):(
                    <h1>앗 게시글이 없어요 !</h1>
                ): (
                        <ChallengeList/>
                )} */}
                </Grid>
            </Grid>
        </>
    );
};

const TabWrap = styled.div`
    padding: 0 20px;
    white-space: nowrap;
    overflow-x: scroll;
    border-bottom: 10px solid #eee;
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