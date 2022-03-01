import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
const Category = (props) => {
    return(
        <Item onClick={()=>{
            history.push(`/category/${props.categoryId}`);
        }}>
            <img src={props.categoryIcon}/>
            <p>{props.categoryLabel}</p>
        </Item>
    );
};

const Item = styled.div`
    display: flex;
    width: 50px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    >img{
        width: 80%;
    }
    >p {
        margin: 5px 0 0;
        font-size: 12px;
    }
`;

export default Category;