import React from "react";
import {Grid} from "../elements/index";
import ChallengeList from "../components/ChallengeList";
import CategoryList from "../components/CategoryList";

const Main = (props) => {
    
    
    return(
        <>
            <div>
                <h3>랭킹</h3>
                <div style={{border:"1px solid #000", padding:"20px"}}>
                    랭킹들어갈자리
                </div>
            </div>
            <div>
                <CategoryList/>
            </div>
            <div>
                <Grid is_flex>
                    <p>전체 챌린지</p>
                    <a href="">더보기</a>
                </Grid>
                <Grid is_flex flexWrap>
                    <ChallengeList/>
                </Grid>
                
            </div>
            
        </>
    );
};

export default Main;