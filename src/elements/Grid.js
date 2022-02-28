import React from "react";

const Grid = ({
    display,
    width,
    height,
    margin,
    padding,
    children,
    onClick,
    ...props
}) => {
    return(
        <div onClick={onClick} style={{display,width,height,margin,padding,}} {...props}>{children}</div>
    );
};


export default Grid;