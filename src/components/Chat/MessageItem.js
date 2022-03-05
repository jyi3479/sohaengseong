import React from "react";
import styled from "styled-components";
import { Image } from "../../elements";

function MessageItem(props) {
  return (
    <>
        {/* 다른 사용자가 보낸 메세지 */}
        <Item>    
            <Image></Image>
            <Bubble>
                <p>닉네임</p>
                <div>
                    <Text>
                        안녕하세요. 오늘 인증하기 딱 좋은 날씨네요!            
                    </Text>
                    <p className="time">오후 12:00</p>
                </div>
            </Bubble>
        </Item>
        {/* 내가 보낸 메세지 */}
        <Item className="is_me">    
            <Image></Image>
            <Bubble className="is_me">
                <p>닉네임</p> 
                <div>
                    <Text className="is_me">
                        안녕하세요. 오늘 인증하기 딱 좋은 날씨네요!            
                    </Text>
                    <p className="time">오후 12:00</p>
                </div>                       
            </Bubble>
        </Item>
    </>
  );
}

const Item = styled.div`
    display: flex;
    &.is_me {
        flex-direction: row-reverse;
    }
`;

const Bubble = styled.div`
    margin-left: 8px;
    margin-bottom:16px;
    > p {
        text-align: left;
        color:#939393;
        font-size: 14px;
        margin-bottom: 6px;
    }
    > div {
        display: flex;
        align-items: end;
        .time {
            font-size: 12px;            
            color:#a8a8a8;
        }     
    }
    &.is_me {
        margin-right: 8px;
        > p {
            text-align: right;
            margin-right: 6px;
        }
        > div {
            flex-direction: row-reverse;
            .time {
                font-size: 12px;            
                color:#a8a8a8;
            }     
        }        
        
    }

`;

const Text = styled.p`
    display: block;
    box-sizing: border-box;
    width: 220px;
    background-color: #fff;
    padding: 12px 16px;
    border-radius: 0 5px 5px 5px;
    margin-right: 4px;
    word-break: break-all;
    white-space: pre-wrap;
    font-size: 14px;    
    color: #000;
    &.is_me {
        border-radius: 5px 0 5px 5px;
        margin-right: 0;
        margin-left: 4px;
    }
`;

export default React.memo(MessageItem);