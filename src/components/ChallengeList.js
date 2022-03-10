import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import {actionCreators as challengeAction} from "../redux/modules/challenge";
import ChallengeCard from "./ChallengeCard";
import {Grid} from "../elements/index";

const ChallengeList = (props) => {
    const dispatch = useDispatch();
    const challenge_list = useSelector(state => state.challenge.list);
    
    React.useEffect(()=>{
        dispatch(challengeAction.getChallengeDB());
    },[]);

    return(
        <Grid padding="0">
            {challenge_list.map((el,i)=>{
                return(
                    <ChallengeCard 
                        key={el.challengeId}
                        {...el}
                        _onClick={()=>{
                            history.push(`/challenge/${el.challengeId}`);                            
                        }}
                    ></ChallengeCard>
                );
            })}
        </Grid>
    );
};


export default ChallengeList;