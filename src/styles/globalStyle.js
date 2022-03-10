import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'); //roboto => 디폴트 폰트
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap'); //poppins => 포인트 폰트
    *, *::before, *::after {
        box-sizing: border-box;
    }

    body {
        font-family: 'Roboto', sans-serif;
        line-height: 1.43;
        letter-spacing: -0.42px;
        color: #030102; /* Typo Color */
    }

    //font ---------------------------------------------------------

    h1 { //Hero title
        font-weight: bold;
        font-size: 22px;
        line-height: 30px;
    }
    h2 { //Section title
        font-weight: bold;
        font-size: 18px;
        line-height: 24px;
    }
    h3 { //Content title
        font-weight: bold;
        font-size: 15px;
        line-height: 18px;
    }

    p {//Sub title
        font-size: 14px;
        line-height: 18px;
        letter-spacing: -0.42px;
    }
    p.caption { //Caption
        font-size: 12px;
        line-height: 16px;
        letter-spacing: -0.36px;
    }
    p.date { //기간
        font-size: 12px;
        line-height: 1.33;
        letter-spacing: -0.36px;
    }

    .poppins{ //숫자 강조
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 0;
        .bold { //랭킹 등수
            font-weight: bold;
            font-size: 12px;
        }
    }

    //color -----------------------------------------

    .point_color {
        color: #7C8288;
    }

    .sub_color {
        color: #7C8288;
    }

    .caption_color {
        color: #A2AAB3;
    }

    .bg_color {
        background-color: #f4f6fa;
    }

    .line_color {
        border-color:#eff0f2
    }

    //swiper -------------------------------------------
    .swiper-pagination {
        width: 40px;
        height: 20px;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.4);
        bottom: 10px;
        right: 10px;
        left:auto;
        color: #eee;
        font-size: 12px;
        line-height: 1.8;
    }


`;