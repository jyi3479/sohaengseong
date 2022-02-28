import React from "react";
import { useSelector } from "react-redux";
import {Grid} from "../elements/index";
import Card from "./Card";

const ChallengeList = (props) => {
    const challenge_list = useSelector(state => state.challenge.list);
    console.log(challenge_list);
    return(
        <Grid>
            {challenge_list.map((el,i)=>{
                return(
                    <Card 
                        key={el.challengeId}
                        {...el}
                    ></Card>
                );
            })}
        </Grid>
    );
};


export default ChallengeList;