import React from "react";

const Input = ({
    width,
    height,
    margin,
    padding,
    children,
    value,
    ref,
    onClick,
    ...props
}) => {
    return(
        <div onClick={onClick} value={value} ref={ref} style={{width,height,margin,padding,}} {...props}>{children}</div>
    );
};


export default Input;