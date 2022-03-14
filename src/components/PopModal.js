import React from "react";
import styled from "styled-components";
import "../styles/css/modal.css";
import closeIcon from "../image/icons/icon_close_btn@2x.png";
import { history } from "../redux/configureStore";
import {Grid,Button} from "../elements/index";
import confirm_img from "../image/img_confirm@2x.png";

const PopModal = (props) => {
    const { open, close, btn_click , h2, p, mail} = props;
    
    return(
        <div className={open ? 'openModal fullmodal modal' : 'fullmodal modal'}> 
            {open ? (
                <section>
                    <header> 
                        <button className="close" onClick={close}>
                            <img src={closeIcon}></img>
                        </button>
                    </header>
                    <main>
                        <Img src={confirm_img}/>
                        <Content className="popup">
                            <h2>{h2}</h2>
                            <pre>{p}</pre>
                        </Content>
                        <EmailBox className="t_center">
                            <p style={{fontSize:"14px"}}>{mail}</p>
                        </EmailBox>
                        <Grid className="t_center" padding="0">
                            <p className="small sub_color">메일을 받지 못하셨나요?</p>
                            <Button className="send_btn" width="200px" margin="7px 0 0" line_btn
                            _onClick={btn_click}>이메일 재발송</Button>
                        </Grid>
                        <Fixed>
                            <Button _onClick={()=>{history.push("/login")}}>로그인 하기</Button>
                        </Fixed>
                    </main>
                </section>
            ) : null}
        </div>
    );    
   
};

PopModal.defaultProps = {
    _onClick: () => {},
};

const Img = styled.img`
    width: 160px;
    margin-bottom: 28px;
`;

const Content = styled.div`
    h2 {
        margin-bottom: 8px;
    }
    pre {
        font-size: 14px;
        line-height: 18px;
        letter-spacing: -0.42px;
    }
`;

const EmailBox = styled.div`
    border-radius: 8px;
    background-color: rgba(162, 170, 179, 0.1);
    padding:11px 16px;
    margin:16px 0 56px;
`;

const Fixed = styled.div`
    width: 100%;
    position: fixed;
    background-color: #fff;
    bottom:0;
    left:0;
    padding:11px 20px;
`;



export default PopModal;