import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";
import MainHeader from "../components/MainHeader";

//카테고리이미지
import category_01 from "../image/icon/category/ic_category_daily_l@2x.png";
import category_02 from "../image/icon/category/ic_category_health_l@2x.png";
import category_03 from "../image/icon/category/ic_category_study_l@2x.png";
import category_04 from "../image/icon/category/ic_category_diet@2x.png";
import category_05 from "../image/icon/category/ic_category_healing@2x.png";
import category_06 from "../image/icon/category/ic_category_hobby@2x.png";
import category_07 from "../image/icon/category/ic_category_self@2x.png";
import category_08 from "../image/icon/category/ic_category_pet@2x.png";
import category_09 from "../image/icon/category/ic_category_eco@2x.png";


const CategoryMain = (props) => {

    return(        
        <>
        <MainHeader className="category"/>
        <Grid style={{background:"linear-gradient(133deg, #221F63, #0F0D29)"}} padding="48px 0 64px" height="100vh">
            <Banner>
                <h1>찾으시는 습관 주제의 행성을<br/>선택하세요.</h1>
            </Banner>
            <Grid padding="0 20px" height="100%">
                <CategoryPlanet>
                    <li onClick={()=>{history.push(`/category/1`)}}><img src={category_01}/><p>일상 루틴</p></li>
                    <li onClick={()=>{history.push(`/category/2`)}}><img src={category_02}/><p>운동</p></li>
                    <li onClick={()=>{history.push(`/category/3`)}}><img src={category_03}/><p>스터디</p></li>
                    <li onClick={()=>{history.push(`/category/4`)}}><img src={category_04}/><p>식습관</p></li>
                    <li onClick={()=>{history.push(`/category/5`)}}><img src={category_05}/><p>힐링</p></li>
                    <li onClick={()=>{history.push(`/category/6`)}}><img src={category_06}/><p>취미</p></li>
                    <li onClick={()=>{history.push(`/category/7`)}}><img src={category_07}/><p>셀프케어</p></li>
                    <li onClick={()=>{history.push(`/category/8`)}}><img src={category_08}/><p>펫</p></li>
                    <li onClick={()=>{history.push(`/category/9`)}}><img src={category_09}/><p>친환경</p></li>
                </CategoryPlanet>
            </Grid>
        </Grid>
        </>
        
    );
};

const Banner = styled.div`
    width: 100%; 
    margin:48px  0 28px;
    padding: 0 20px;
    >h1 {
        color: #fff;
    }
`;

const CategoryPlanet = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    >li {
        width : 101px;
        display: inline-block;
        cursor: pointer;
        text-align: center;
        margin-bottom: 20px;
        img {
            width: 100%;
        }
        p {
            color: #fff;
        }
    }
`;

export default CategoryMain;