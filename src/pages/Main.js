import React from "react";
import {Grid} from "../elements/index";
import ChallengeList from "../components/ChallengeList";

const Main = (props) => {
    
    
    return(
        <>
            <div>
                <h3>랭킹</h3>
                <div>
                    랭킹들어갈자리
                </div>
            </div>
            <div>
                
            </div>
            <div>
                <Grid is_flex>
                    <p>전체 챌린지</p>
                    <a href="">더보기</a>
                </Grid>                          
                <ChallengeList/>                
            </div>
            
        </>
    );
};

export default Main;