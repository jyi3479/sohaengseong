import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import _ from "lodash"; // lodash
import { Grid , Button } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as searchActions} from "../redux/modules/search";
import SearchHeader from "../components/SearchHeader";
import notFount from "../image/ic_search_nomark@2x.png"; 
import ChallengeCard from "../components/ChallengeCard";


const Search = (props) => {
    const dispatch = useDispatch();
    const [word,setWord] = React.useState("");
    const recommend_list = useSelector(state => state.search.recommend);
    const result_list = useSelector(state => state.search.list);
    const ing_list = result_list.filter((item, index) => {
        return item.status === "모집중" || item.status === "진행중";
    }); //진행,모집중인 리스트만 필터링

    const ChangeWord = (e) => {
        console.log("누름", e.target.innerText);
        setWord(e.target.innerText);
        dispatch(searchActions.getSearchDB(e.target.innerText));
    };

    //axios 요청을 줄이기위한 debounce
    const debounce = _.debounce((word) =>{
        console.log(word);
        if(word !== ""){
            dispatch(searchActions.getSearchDB(word));     
        }
           
    }, 500);
    const keyPress = React.useCallback(debounce, []);


    const wordChange = (e) => {
        keyPress(e.target.value);
        setWord(e.target.value);
    };

    React.useEffect(() => {
        dispatch(searchActions.getRecommendDB());
        dispatch(searchActions.getSearchDB(word));
    },[]);

    
    
    return(    
        <>
            <SearchHeader value={word} _onChange={wordChange}
                _deleteBtn={()=>{
                    setWord("");
                }}
                _onClick={()=>{
                    dispatch(searchActions.getSearchDB(word));
                }}
            />
            <SearchWrap className={word? "search" : ""}>    

                {word? (
                    <Grid className="result_box" padding="0">
                        <div style={{borderBottom:"15px solid #eee", padding:"10px 20px", fontSize:"16px"}}>총 <b>{result_list.length}</b>개의 검색결과</div>
                        {result_list&&result_list.length  !== 0 ? (
                            <ResultWrap >
                                <h2 style={{fontSize:"18px", marginBottom:"20px", fontWeight:"400"}}>진행중인 소행성</h2>
                                <div>                                
                                    {ing_list.map((el,i)=>{                                        
                                        return ( <ChallengeCard className="result_card" key={i} {...el}
                                            _onClick={()=>{
                                                history.push(`/challenge/${el.challengeId}`);
                                            }}
                                        ></ChallengeCard> );                                          
                                    })}
                                </div>
                            </ResultWrap>
                        ):(
                            <NotFount>
                                <img src={notFount}/>
                                <h6>검색 결과가 없습니다.</h6>
                                <p>원하는 챌린지를 찾지 못했다면<br/>챌린지를 직접 개설해보세요.</p>
                                <Button width="250px" radius="20px" _onClick={()=>{
                                    history.push("/challengewrite");
                                }}>소행성 개설하기</Button>
                            </NotFount>
                        )}
                            
                    </Grid>   
                ):(
                    <Grid padding="40px 30px" className="recommend_box" >
                        <h1 style={{fontSize:"22px", fontWeight:"400", marginBottom:"20px"}}>실시간 추천 검색어</h1>
                        {recommend_list&&recommend_list.map((el,i) => {
                            return <Tag key={i} onClick={ChangeWord}>{el}</Tag>
                        })}
                    </Grid>
                )}                         
                
                
                             
            </SearchWrap>   
        </>    
    );
};

const SearchWrap = styled.div`
    height: calc(100vh - 70px);
    margin: 70px 0 0;
    background-color: #f9f9f9;
`;

const ResultWrap = styled.div`
    padding:20px;
    background-color: #f9f9f9;
    .result_card{
        width: calc(50% - 8px);
        height: auto;
        margin-right: 16px;
        margin-bottom:20px;
        .title {
            margin-top:0;
        }
        .tag {
            margin: 10px 3px 10px 0;
        }
        &:nth-child(2n) {
            margin-right: 0;
        }
    }
`;

const NotFount = styled.div`
    text-align: center;
    margin-top:10vh;
    img {
        width: 140px;
    }
    h6 {
        font-size: 16px;
        margin: 17px 0 10px;
        font-weight: 400;
    }
    p {
        font-size: 14px;
        color: #666;
        margin-bottom:20px;
    }
    
`;

const Tag = styled.div`
    display: inline-block;
    background-color: #fff;
    font-size: 14px;
    border: 1px solid #ddd;
    padding: 10px 16px;
    border-radius: 20px;
    margin: 0 10px 10px 0;
    cursor: pointer;
    &:nth-child(n+7) {
        display: none;
    }
`;


export default Search;