import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Grid, Input, Button} from "../elements";
import { useDispatch, useSelector } from "react-redux";

const CategoryMain = (props) => {
    return(        
        <Grid style={{background:"linear-gradient(to bottom, #999, #585858)"}} padding="48px 20px 0" height="100%">
            <Banner>
                <h2>찾으시는 습관 행성을<br/>선택하세요.</h2>
            </Banner>
            <Grid>
                <div></div>
            </Grid>
        </Grid>
        
    );
};

const Banner = styled.div`
    width: 100%; 
    margin:14px  0 37px;
    >h2 {
        margin: 0;
        font-size: 20px;
        letter-spacing: -0.6px;
        color: #fff;
        font-weight: 100;
    }
`;

export default CategoryMain;