import React from "react";
import { useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import Card from "./Card";

const ChallengeList = (props) => {
    const challenge_list = useSelector(state => state.challenge.list);
    return(
        <>
            {challenge_list.map((el,i)=>{
                return(
                    <Card 
                        key={el.challengeId}
                        {...el}
                        _onClick={()=>{
                            history.push(`/challenge/${el.challengeId}`);
                        }}
                    ></Card>
                );
            })}
        </>
    );
};


export default ChallengeList;