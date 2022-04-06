import React from "react";
import "../../styles/css/modal.css";


const LoginModal = (props) => {
    const { open, close, btnClick } = props;    
    return(
        <>
        {/* 모달이 열릴때 openModal 클래스가 생성된다. dim(뒷배경) 클릭 시에도 모달 닫힘*/}
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <>
                    <div className="dim" onClick={close}></div>
                    <section>
                        <main>
                            <p>로그인이 필요한 서비스 입니다</p>                            
                        </main>
                        <footer>             
                            <button className="point_color" onClick={btnClick}>로그인 하기</button>
                        </footer>
                    </section>
                </>
            ) : null}
        </div>
        </>
    );
};

LoginModal.defaultProps = {
    _onClick: () => {},
};


export default LoginModal;