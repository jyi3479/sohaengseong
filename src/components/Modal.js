import React from "react";
import "../styles/css/modal.css";
import closeIcon from "../image/icons/icon_close_btn@2x.png";

const Modal = (props) => {
    const { open, close, header, double_btn, btn_text, isPrivate, _onClick } = props;
    return(
        <>
        {/* 모달이 열릴때 openModal 클래스가 생성된다., 딤처리 된 배경 눌러도 close */}
        <div className={open ? 'openModal modal' : 'modal'}> 
            {open ? (
                <section>
                <header className={header ? 'showHeader' : ''}> 
                    <button className="close" onClick={close}>
                        <img src={closeIcon}></img>
                    </button>
                </header>
                <main className={isPrivate? "is_private" : ""}>{props.children}</main>
                <footer className={double_btn? 'double_btn': ''} style={{display:isPrivate?"none":"block"}}>
                    {/* double_btn일 때만 취소버튼 노출 */}
                    {double_btn&&<button className="" onClick={close}>취소</button>}                    
                    <button className="" onClick={_onClick}>{btn_text}</button>
                </footer>
                </section>
            ) : null}
        </div>
        </>
    );
};

Modal.defaultProps = {
    _onClick: () => {},
};


export default Modal;