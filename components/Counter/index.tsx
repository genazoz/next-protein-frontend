import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";

const CounterEl = styled.div<{ theme: string }>`
  width: 200px;
  margin: 10px 0 0;

  @media (max-width: ${theme.media.tabSm}) {
    display: flex;
    width: 100%;
  }
  @media (max-width: ${theme.media.mob}) {
    width: 300px;
    margin: 10px auto;
  }
  @media (max-width: 390px) {
    width: 100%;
  }

  ${props => props.theme === 'green' ? `
    div{
      color: ${theme.colors.green};
    }` : ` div{
      color: ${theme.colors.darkBlue};
    }`};
`;
const CounterNumber = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    margin: auto;

    font-size: 16px;

    cursor: pointer;
    opacity: 0.3;

    transition: 0.3s all;

    @media (max-width: ${theme.media.mob}) {
      height: 50px;
  
      font-size: 20px;
    }
    @media (max-width: 390px) {
      font-size: 15px;
    }

    .swiper-slide-active & {
      font-size: 30px;
      opacity: 1;

      @media (max-width: ${theme.media.mob}) {
        font-size: 50px;
      }
      @media (max-width: 390px) {
        font-size: 40px;
      }
    }

    .swiper-slide-next &, .swiper-slide-prev & {
      font-size: 20px;
      opacity: .6;

      @media (max-width: ${theme.media.mob}) {
        font-size: 40px;
      }
      @media (max-width: 390px) {
        font-size: 30px;
      }
    }
  `
;


export const Counter: React.FC<{ onChangeCount: (number: number) => void; theme?: string }> = ({
                                                                                                 onChangeCount,
                                                                                                 theme = 'dark'
                                                                                               }) => {
  return (
    <CounterEl
      as={Swiper}
      slidesPerView={5}
      loop={true}
      loopAdditionalSlides={20}
      centeredSlides={true}
      onTransitionEnd={() => {
        const $slide: HTMLElement | null = document.querySelector('.swiper-slide-active [data-number]');

        if ($slide) {
          const number = $slide.getAttribute('data-number');

          if (number) {
            onChangeCount(parseInt(number));
          }
        }
      }}
      breakpoints={{
        0: {},
        500: {},
        600: {},
        900: {},
        1600: {},
      }}
      theme={theme}
    >
      <SwiperSlide><CounterNumber data-number='2'>2</CounterNumber></SwiperSlide>
      <SwiperSlide><CounterNumber data-number='1'>1</CounterNumber></SwiperSlide>
      <SwiperSlide><CounterNumber data-number='2'>2</CounterNumber></SwiperSlide>
      <SwiperSlide><CounterNumber data-number='3'>3</CounterNumber></SwiperSlide>
      <SwiperSlide><CounterNumber data-number='4'>4</CounterNumber></SwiperSlide>
      <SwiperSlide><CounterNumber data-number='5'>5</CounterNumber></SwiperSlide>
      <SwiperSlide><CounterNumber data-number='4'>4</CounterNumber></SwiperSlide>
      <SwiperSlide><CounterNumber data-number='3'>3</CounterNumber></SwiperSlide>
    </CounterEl>
  );
}
