import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/index";
import { useDispatch } from "react-redux";
import * as baseAction from "../redux/modules/base";


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


//슬라이드 이미지
import slide_1_1 from "../image/guide/img_guide_01-1@2x.png"
import slide_1_2 from "../image/guide/img_guide_01-2@2x.png"
import slide_1_3 from "../image/guide/img_guide_01-3@2x.png"
import slide_2_1 from "../image/guide/img_guide_02-1@2x.png"
import slide_3_1 from "../image/guide/img_guide_03-1@2x.png"
import slide_3_2 from "../image/guide/img_guide_03-2@2x.png"
import slide_3_3 from "../image/guide/img_guide_03-3@2x.png"
import slide_3_4 from "../image/guide/img_guide_03-4@2x.png"
import slide_4_1 from "../image/guide/img_guide_04-1@2x.png"
import slide_5_1 from "../image/guide/img_guide_05-1@2x.png"
import slide_5_2 from "../image/guide/img_guide_05-2@2x.png"
import slide_5_3 from "../image/guide/img_guide_05-3@2x.png"
import slide_6_1 from "../image/guide/img_guide_06-1@2x.png"

const Guide = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(baseAction.setHeader("소행성 사용 가이드"));
    dispatch(baseAction.setGnb(false));
    return () => {
      dispatch(baseAction.setHeader(false, ""));
      dispatch(baseAction.setGnb(true));
    };
  });

  return (
    <Grid margin="88px 0 -56px">
        <Section className="t_center">
            <p className="poppins sub_color">STEP.1</p>
            <h2>변화하고 싶은 내 모습과<br/><span className="point_color">닮은 목표를 찾아봐요!</span></h2>
            <SlideBox>
              <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  pagination={true} 
                  modules={[Pagination]} 
                  className="mySwiper"
                  >                 
                    <SwiperSlide><img src={slide_1_1}></img></SwiperSlide>     
                    <SwiperSlide><img src={slide_1_2}></img></SwiperSlide>           
                    <SwiperSlide><img src={slide_1_3}></img></SwiperSlide>                      
                </Swiper>

            </SlideBox>
            <p className="sub_color">목표와 연관된 주제는 무엇인가요?<br/>전체보기를 통해 더 다양한 주제를 만나볼 수 있어요.<br/>주제를 선택했다면, 어떤 습관 행성이 있는지 볼까요?</p>
        </Section>
        <Section className="t_center">
            <h2>이제 소행성에 입주해볼까요?<br/><span className="point_color">목표에 한 걸음 가까워졌어요!</span></h2>
            <SlideBox>
              <img src={slide_2_1}></img>
            </SlideBox>            
        </Section>
        <Section className="t_center">
            <p className="poppins sub_color">STEP.2</p>
            <h2>변화하는 나를<br/><span className="point_color">인증으로 기록해요.</span></h2>
            <SlideBox>
              <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  pagination={true} 
                  modules={[Pagination]} 
                  className="mySwiper"
                  >                 
                    <SwiperSlide><img src={slide_3_1}></img></SwiperSlide>     
                    <SwiperSlide><img src={slide_3_2}></img></SwiperSlide>           
                    <SwiperSlide><img src={slide_3_3}></img></SwiperSlide>  
                    <SwiperSlide><img src={slide_3_4}></img></SwiperSlide>                     
                </Swiper>

            </SlideBox>
            <p className="sub_color">마음에 드는 행성에 참여했다면<br/>나를 위해 하루하루 기록해요.<br/>꾸준히 해내는 새로운 나를 발견할 수 있어요.</p>
        </Section>
        <Section className="t_center">
            <h2>나누는건 다 좋은거니까<br/><span className="point_color">친구랑 함께해요.</span></h2>
            <SlideBox>
              <img src={slide_4_1}></img>
            </SlideBox>            
        </Section>
        <Section className="t_center">
            <p className="poppins sub_color">STEP.3</p>
            <h2>함께 만들어나가니까<br/><span className="point_color">꾸준히 성장할 수 있어요.</span></h2>
            <SlideBox>
              <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  pagination={true} 
                  modules={[Pagination]} 
                  className="mySwiper"
                  >                 
                    <SwiperSlide><img src={slide_5_1}></img></SwiperSlide>     
                    <SwiperSlide><img src={slide_5_2}></img></SwiperSlide>           
                    <SwiperSlide><img src={slide_5_3}></img></SwiperSlide>
                </Swiper>

            </SlideBox>
            <p className="sub_color">혼자서는 힘들어도 함께하면 가능해요.<br/>다같이 만들어 나가는 위클리 리포트와<br/>실시간 소통으로 꾸준히 성장할 수 있어요.</p>
        </Section>
        <Section className="t_center">
            <p className="poppins sub_color">STEP.4</p>
            <h2>나와 함께 성장하는<br/><span className="point_color">귀염둥이 토비.</span></h2>
            <SlideBox>
              <img src={slide_6_1}></img>
            </SlideBox>
            <p className="sub_color">힘쎈 어른이 되고 싶은 토비는<br/>내 습관 행성에서 살고 있는 작은 외계인이예요.<br/>내가 습관을 실천할 때마다 성장해요.<br/>토비는 어떤 모습으로 성장하게 될까요?</p>
        </Section>
    </Grid>
  );
};

const Section = styled.div`
  margin-bottom: 56px;
  .poppins {
    font-size: 16px;
    font-weight: 500;
  }
  p+h2 {
    margin-top: 6px;
  }
  h2 {
    margin:0 0 20px;
  }
`;

const SlideBox = styled.div`
  width: 100%;
  margin-bottom: 38px;
  overflow: hidden;
  padding-bottom: 12px;
  img {
    width: 100%;
  }
  .swiper {
    overflow: initial;
    padding-bottom:12px;
    .swiper-pagination {
      background-color: transparent;
    }
    .swiper-pagination-bullet {
      width: 6px;
      height: 6px;
      background-color: #7c8288;
      opacity: 0.5;
      &.swiper-pagination-bullet-active {
        opacity: 1;
      }
    }
  }
  
`;


export default Guide;
