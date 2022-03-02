import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import {Grid} from "../elements/index";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import ChallengeList from "../components/ChallengeList";

const CategoryTab = (props) => {
    const params = props.match.params.categoryId;
    const [tab,setTab] = React.useState(params);
    const categoryList = useSelector(state => state.challenge.category_list);
    console.log(categoryList);
    return(
        <>
            <TabWrap>
                <Tab type="button" onClick={()=>{setTab("all")}}>전체</Tab>
                <Tab type="button" onClick={()=>{setTab(0)}}>일상</Tab>
                <Tab type="button" onClick={()=>{setTab(1)}}>루틴</Tab>
                <Tab type="button" onClick={()=>{setTab(2)}}>운동</Tab>
                <Tab type="button" onClick={()=>{setTab(3)}}>스터디</Tab>
                <Tab type="button" onClick={()=>{setTab(4)}}>식습관</Tab>
                <Tab type="button" onClick={()=>{setTab(5)}}>힐링</Tab>
                <Tab type="button" onClick={()=>{setTab(6)}}>취미</Tab>
                <Tab type="button" onClick={()=>{setTab(7)}}>셀프케어</Tab>
                <Tab type="button" onClick={()=>{setTab(8)}}>펫</Tab>
                <Tab type="button" onClick={()=>{setTab(9)}}>친환경</Tab>
            </TabWrap>
            <Grid is_flex flexWrap>
               {tab !== "all"? categoryList[tab]?categoryList[tab].map((el,i)=>{
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
               )}
            </Grid>
        </>
    );
};

const TabWrap = styled.div`
    white-space: nowrap;
    overflow-x: scroll;
`;
const Tab = styled.button`
    width: 70px;
    padding: 10px;
`;

export default CategoryTab;