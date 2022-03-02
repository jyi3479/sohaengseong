import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const Select = ({
    children,
    ...props
}) => {
    return(
        <SelectItem>
            {children}
        </SelectItem>
    );
};

const SelectItem = styled.div`
    width: 100%;
    height: 40px;
    border: solid 1px #999;
`;

export default Select;