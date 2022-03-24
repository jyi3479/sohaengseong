import React from "react";


//스크롤바 커스텀 라이브러리
import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";


const ScrollBar = ({children,width,height,direction}) => {
    return(
        <>
           <SimpleBarReact className="customs" style={{maxWidth:`${width}`,height:`${height}`, direction:`${direction}`}}>
               {children}
            </SimpleBarReact>
        </>
    );
};


export default ScrollBar;