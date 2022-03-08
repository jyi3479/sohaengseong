import React from "react";
import styled from "styled-components";
import "../styles/css/modal.css";
import closeIcon from "../image/icons/icon_close_btn@2x.png";
import { history } from "../redux/configureStore";
import {Grid,Button} from "../elements/index";

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

const Content = styled.div`
    text-align: center;
    margin:40px 0 8px;
    h1 {
        font-size: 18px;
        margin-bottom: 10px;
        font-weight: 400;
    }
    p {
        font-size: 14px;
        line-height: 1.36;
        letter-spacing: -0.2px;
    }
`;

const Fixed = styled.div`
    width: 100%;
    position: fixed;
    background-color: #fff;
    bottom:0;
    left:0;
    padding:12px 20px;
    box-shadow: 0 -5px 6px 0 rgba(0, 0, 0, 0.04);
    button {
        border-radius: 5px;
        font-weight: 400;
    }
`;



export default Modal;