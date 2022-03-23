import React from "react";
import styled from "styled-components";
import "../styles/css/modal.css";
import closeIcon from "../image/icons/icon_close_btn@2x.png";


const Modal = (props) => {
    const { open, close, header, double_btn, btn_text, full_modal, isPrivate, _onClick } = props;

    if(full_modal){
        return(
            <div className={open ? 'openModal fullmodal modal' : 'fullmodal modal'}> 
                {open ? (
                    <section>
                    <header className={header ? 'showHeader' : ''}> 
                        <button className="close" onClick={close}>
                            <img src={closeIcon}></img>
                        </button>
                    </header>
                    <main>{props.children}</main>
                    </section>
                ) : null}
            </div>
        );
    }
    return(
        <>
        {/* 모달이 열릴때 openModal 클래스가 생성된다. dim(뒷배경) 클릭 시에도 모달 닫힘*/}
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <>
                    <div className="dim" onClick={close}></div>
                    <section>
                        <header className={header ? 'showHeader' : ''}> 
                            <button className="close" onClick={close}>
                                <img src={closeIcon}></img>
                            </button>
                        </header>
                        <main className={isPrivate? "is_private" : ""}>{props.children}</main>
                        <footer className={double_btn? 'double_btn': ''} style={{display:isPrivate?"none":"block"}}>
                            {/* double_btn일 때만 취소버튼 노출 */}
                            {double_btn&&<button className="sub_color" onClick={close}>취소</button>}                    
                            <button className="point_color" onClick={_onClick}>{btn_text}</button>
                        </footer>
                    </section>
                </>
            ) : null}
        </div>
        </>
    );
};

Modal.defaultProps = {
    _onClick: () => {},
};




export default Modal;