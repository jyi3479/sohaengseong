import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Grid, Input, Button} from "../elements";
import { useDispatch, useSelector } from "react-redux";

const CategoryMain = (props) => {
    return(        
        <Grid style={{background:"linear-gradient(to bottom, #999, #585858)"}} padding="48px 0 0" height="100vh">
            <Banner>
                <h2>찾으시는 습관 행성을<br/>선택하세요.</h2>
            </Banner>
            <Grid padding="0 20px" height="100%">
                <CategoryPlanet>
                    <li onClick={()=>{history.push(`/category/0`)}}><div>일상 루틴</div></li>
                    <li onClick={()=>{history.push(`/category/1`)}}><div>운동</div></li>
                    <li onClick={()=>{history.push(`/category/2`)}}><div>스터디</div></li>
                    <li onClick={()=>{history.push(`/category/3`)}}><div>식습관</div></li>
                    <li onClick={()=>{history.push(`/category/4`)}}><div>힐링</div></li>
                    <li onClick={()=>{history.push(`/category/5`)}}><div>취미</div></li>
                    <li onClick={()=>{history.push(`/category/6`)}}><div>셀프케어</div></li>
                    <li onClick={()=>{history.push(`/category/7`)}}><div>펫</div></li>
                    <li onClick={()=>{history.push(`/category/8`)}}><div>친환경</div></li>
                </CategoryPlanet>
            </Grid>
        </Grid>
        
    );
};

const Banner = styled.div`
    width: 100%; 
    margin:14px  0 37px;
    padding: 0 20px;
    >h2 {
        margin: 0;
        font-size: 20px;
        letter-spacing: -0.6px;
        color: #fff;
        font-weight: 100;
    }
`;

const CategoryPlanet = styled.div`
    position: relative;
    height: 100%;
    overflow: initial;
    >li {
        --size: 100px;    
        display: inline-block;
        position: absolute;
        cursor: pointer;
        >div{                   
            width: var(--size);
            height: var(--size);
            text-align: center;
            font-size: 12px;
            background-color: #eee;
            border-radius: 50%; 
            line-height: var(--size);       
            
        }
        &:first-child {
            --size: 113px;
            left: 0;
            top: 0;
        }
        &:nth-child(2) {
            --size: 91px;
            left: 124px;
            top: 32px;
        }
        &:nth-child(3) {
            --size: 105px;
            right: -12px;
            top: 0;
        }
        &:nth-child(4) {
            --size: 174px;
            left: 0;
            top: 118px;
        }
        &:nth-child(5) {
            --size: 137px;
            top:118px;
            right: 13px;
        }
        &:nth-child(6) {
            --size: 105px;
            top: 303px;
            left:20px;
        }
        &:nth-child(7) {
            --size: 131px;
            right: 66px;
            top: 254px;

        }
        &:nth-child(8) {
            --size: 89px;
            top:247px;
            right: -40px;
        }
        &:nth-child(9) {
            --size: 80px;
            top: 355px;
            right: 0;
        }
    }
`;

export default CategoryMain;