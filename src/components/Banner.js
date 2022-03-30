import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

//이미지 슬라이더(Swiper) import 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css/bundle';
import 'swiper/css/pagination';


//배너이미지
import banner1 from "../image/banner/banner_01.png";
import banner2 from "../image/banner/banner_02.png";
import banner3 from "../image/banner/banner_03.png";

const Banner = () => {
    return(
        <BannerBox>            
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                loop={true}
                pagination={{
                    type : 'fraction', //페이지네이션 타입
                }}
                modules={[Autoplay,Pagination]}
                className="mySwiper"
                >
                
                <SwiperSlide onClick={()=>{history.push("/guide/intro")}}><img src={banner1}/></SwiperSlide>
                <SwiperSlide onClick={() => window.open('https://forms.gle/5gkoWJ2Xb8HU1gsb8', '_blank')}><img src={banner2}/></SwiperSlide>
                <SwiperSlide><img src={banner3}/></SwiperSlide>
            </Swiper>            
        </BannerBox>
    );
};


const BannerBox = styled.div`
    width: 100%;
    height: 185px;
    margin: 40px 0;
    border-radius: 10px;
    overflow: hidden;
    .mySwiper {
        height: 100%;
        .swiper-slide:nth-child(-n+2) {
            cursor: pointer;
        }
    }
    .swiper-pagination {
        width: 35px;
        right: 15px;
        bottom: 15px;
    }
    img {
        width: 100%;
    }
`;

export default Banner;