import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    
    *, *::before, *::after {
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        line-height: 1.43;
        letter-spacing: -0.42px;
        color: #030102; /* Typo Color */
        background-repeat: no-repeat;
        outline: none;
    }

    //align -----------------------------------------------------
    .t_center {text-align:center};
    .t_left {text-align:left};
    .t_right {text-align:right};

    //말줄임
    .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;     
    };
    
    .ellipsis2 { //2줄말줄임
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    };
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
    .small { //기간 & 작은 폰트
        font-size: 12px;
        line-height: 1.33;
        letter-spacing: -0.36px;
    }

    .poppins{ //숫자 강조
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 0;
        &.bold { //랭킹 등수
            font-weight: bold;
            font-size: 12px;
        }
    }


    //color -----------------------------------------

    .point_color {
        color: #4149d3;
    }

    .sub_point_color {
        color: #17abd6;
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

    .success_color {
        color:#5a76ea;
    }

    .fail_color {
        color:#f57391;
    }




    //margin & padding ---------------------------------

    .mb4 { margin-bottom: 4px };
    .mt4 { margin-top: 4px };

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
        * {
            color: #fff;
        }
    }


`;
