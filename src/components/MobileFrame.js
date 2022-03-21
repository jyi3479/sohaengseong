import React from "react";
import "../styles/css/MobileFrame.css";

const MobileFrame = ({ children,_ref }) => {
  const scroll = React.useRef(null);
  const scroll2 = React.useRef(null);
  const pathname = window.location;
  

  const scrollRef = React.useRef();
  React.useEffect(() => {
    // 페이지 입장 후와 메세지가 추가될 때마다 스크롤 이동 (behavior는 전환 에니메이션 정의)
    scroll2.current.scrollIntoView({ behavior: "smooth" });
    document.getElementById("scroll").scrollIntoView()
  }, []);

  return (
    <>
      <div className="WebFullFrame" ref={scroll2} >
        <div className="MobileFullFrame" ref={scroll} >
          <div id="scroll" className="Container" >{children}</div>
        </div>
      </div>
      <div ref={scrollRef} />
    </>
  );
};

export default MobileFrame;
