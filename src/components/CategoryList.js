import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Category from "../elements/Category";


const CategoryList = (props) => {
    const category = useSelector(state => state.challenge.category);
    return(
        <Wrap>
            {category.map((c,i)=>{
                return(
                    <Category 
                        key={c.categoryId}
                        {...c}
                    />
                );
                
            })}
        </Wrap>
    );
};

const Wrap = styled.div`
    display: flex;
`;



export default CategoryList;