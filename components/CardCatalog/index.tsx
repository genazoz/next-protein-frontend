import React, {useRef} from "react";
import styled from "styled-components";

import theme from "../../styles/theme";
import Link from "next/link";
import {useDispatch, useSelector} from 'react-redux';
import {addItem, cartSelector} from '../../features/cart/cartSlice'
import {ResponseProduct} from "../../utils/api/types";
import Image from "next/future/image";
import Indicator, {IndicatorSide} from "../Indicator";

const Wrapper = styled.div`
  width: 100%;
  max-width: 100%;
  transform: perspective(800px);
  transform-style: preserve-3d;
  cursor: pointer;

  &:hover {
    .card-bg {
      transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1),
      opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1);
      //opacity: 0.8;
    }

    .card {
      transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1),
      box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1),
      background 0.3s cubic-bezier(0.23, 1, 0.32, 1),
      border 0.6s cubic-bezier(0.23, 1, 0.32, 1);

      border: 1px solid ${theme.colors.green};
      box-shadow: rgba(0, 0, 0, 0.11) 0 30px 60px 0;
    }
  }
}`;
const Card = styled.div<{ isActive: boolean }>`
  position: relative;

  overflow: hidden;
  display: flex;
  width: 100%;
  padding: 63% 0;

  border-radius: 10px;
  border: 1px solid transparent;
  background: linear-gradient(-45deg, #1e1d3a, #282749);

  transition: 3s transform cubic-bezier(0.23, 1, 0.32, 1);

  &::before {
    content: "";

    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;

    display: none;
    width: 100%;
    height: 55%;

    opacity: 0;
    background: linear-gradient(to top, #1a1a37, transparent);

    transition: 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);

    .card-wrapper:hover & {
      opacity: 1;
    }
  }
  &::after {
    content: "";

    position: absolute;
    z-index: 0;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 100%;

    pointer-events: none;
    opacity: 0;
    background: rgba(7, 59, 49, .4);

    transition: 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }

  @media (max-width: ${theme.media.mob}) {
    height: 220px;
    padding: 0;
  }
  @media (max-width: 400px) {
    height: 180px;
  }
  @media (max-width: ${theme.media.mobSm}) {
    height: 140px;
  }

  a {
    font-family: ${theme.fonts.bebasB};
  }

  ${(props) => props.isActive && `
      border-color: ${theme.colors.green};
      
      &::after{
        opacity: 1;
      }
    `
  }
`;
const ImgWrapper = styled.span`
  position: absolute;
  top: 8px;
  left: 0;
  z-index: 1;

  width: 145%;
  height: auto;
  margin: auto;

  pointer-events: none;

  transition: transform 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
`
const Img = styled.img`
  width: 100%;
  height: auto;
`;
const AddToCartButton = styled.button<{ isActive: boolean }>`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 15px;
  margin: auto;
  padding: 20px;

  color: #ffffff;

  cursor: pointer;
  border: unset;
  border-radius: 100px;
  background: ${theme.colors.darkBlue};

  transition: 0.2s all;

  &:hover {
    svg {
      fill: ${theme.colors.darkBlue};
    }

    background: ${theme.colors.green};
  }

  svg {
    position: absolute;

    fill: #FFFFFF;
    opacity: 1;

    transition: 0.2s all;
  }

  &:active {
    transform: scale(1.1)
  }

  ${(props) => {
    if (props.isActive) {
      return `
        margin-left: 15px;
        padding: 20px;
        
        border-radius: 100px;
        background: ${theme.colors.green};
        transition: .2s all;
        
        &:hover {
          color: ${theme.colors.green};
          
          svg {
            fill: ${theme.colors.darkBlue};
          }
        
          background: ${theme.colors.green};
        }
        svg {
          position: absolute;
          
            fill: ${theme.colors.darkBlue};
        }
        span {
          font-size: 10px;
        }`;
    }
  }}

`;
const Name = styled.p`
  position: absolute;
  z-index: 2;
  bottom: 60px;
  left: 0;
  right: 0;

  display: none;
  width: max-content;
  margin: auto;
  padding: 2px 7px;

  color: #ffffff;
  font-size: ${theme.fontSize} * 1.4;

  opacity: 0;
  background: ${theme.colors.green};

  transition: 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);

  .card-wrapper:hover & {
    opacity: 1;
  }
`;
const Price = styled.p`
  position: absolute;
  z-index: 2;
  bottom: 30px;
  left: 0;
  right: 0;

  display: none;
  width: max-content;
  margin: 5px auto 0 auto;

  color: #ffffff;

  opacity: 0;

  transition: 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);

  .card-wrapper:hover & {
    opacity: 1;
  }
`;
const LinkElement = styled.a`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  width: 100%;
  height: 100%;
`;
const IndicatorWrapper = styled.div`
  position: absolute;
  left: -25px;
  top: 13px;
  
  @media (max-width: ${theme.media.tabSm}) and (min-width: ${theme.media.mobSm}) {
    left: -29px;
  }
`

const CardCatalog: React.FC<ResponseProduct> = ({id, imageUrl, title, price, category}) => {
  const {items} = useSelector(cartSelector);
  const itemInCart = items.find((item) => item.id === id);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  let mouseX;
  let mouseY;
  let mousePX;
  let mousePY;
  let width = 0;
  let height = 0;
  let mouseLeaveDelay: null | ReturnType<typeof setTimeout> = null;
  const dispatch = useDispatch();

  const setSizeOfCard = () => {
    if (!cardRef.current)
      return;

    width = cardRef.current.offsetWidth;
    height = cardRef.current.offsetHeight;
  }

  React.useEffect(() => setSizeOfCard());

  const handleMouseMove = (e: any) => {
    if (document.body.clientWidth < 1240 || !cardRef.current || !bgRef.current)
      return 0;

    mouseX = e.pageX - cardRef.current.getBoundingClientRect().left - width / 2;
    mouseY = e.pageY - cardRef.current.getBoundingClientRect().top - height / 2;

    mousePX = mouseX / width;
    mousePY = mouseY / height;

    const rX = mousePX * 30;
    const rY = mousePY * -30;

    const tX = mousePX * -40;
    const tY = mousePY * -40;

    bgRef.current.style.transform = `translateX(${tX}px) translateY(${tY}px)`;
    cardRef.current.style.transform = `rotateY(${rX}deg) rotateX(${rY}deg)`;
  };
  const handleMouseEnter = () => {
    setSizeOfCard();

    if (mouseLeaveDelay)
      clearTimeout(mouseLeaveDelay);
  };
  const handleMouseLeave = () => {
    mouseLeaveDelay = setTimeout(() => {
      if (!cardRef.current || !bgRef.current)
        return 0;

      cardRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
      bgRef.current.style.transform = `translateX(0px) translateY(0px)`;
    }, 100);
  };
  const onClickAddToCartButton = () => {
    const goods: ResponseProduct = {id, imageUrl, title, price, category};

    dispatch(addItem({goods: goods}));
  };

  return (
    <Wrapper
      className={"card-wrapper"}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      <Card className={"card"} isActive={itemInCart ? true : false} ref={cardRef}>
        <Link href={`/card/${id}`}>
          <LinkElement></LinkElement>
        </Link>
        <AddToCartButton
          onClick={() => onClickAddToCartButton()}
          isActive={itemInCart ? true : false}
        >
          {itemInCart &&
            <IndicatorWrapper>
              <Indicator side={IndicatorSide.TORIGHT} count={itemInCart.count}/>
            </IndicatorWrapper>
          }
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" stroke={'none'} data-name="Layer 1"
               viewBox="0 0 200 200">
            <path
              d="M75 71.09v-10c0-14.28 11.15-25.93 25-25.93s25 11.65 25 25.93v10h17.28A3.13 3.13 0 0 1 145.4 74l5.94 87.5a3.14 3.14 0 0 1-2.91 3.33H51.78a3.12 3.12 0 0 1-3.12-3.12v-.21L54.6 74a3.13 3.13 0 0 1 3.12-2.92Zm9.38 0h31.25v-10c0-9.19-7-16.56-15.63-16.56S84.38 51.9 84.38 61.09Zm-25.91 84.38h83.06l-5.08-75H63.56Z"
              className="color000 svgShape"></path>
          </svg>
        </AddToCartButton>
        <ImgWrapper className={"card-bg"} ref={bgRef}>
          <Img
            as={Image}
            src={`/img/${imageUrl}.png`}
            alt={'goods'}
            width={1200}
            height={1200}
          ></Img>
        </ImgWrapper>
        <Name>{title}</Name>
        <Price>{price}</Price>
      </Card>
    </Wrapper>
  );
}

export default CardCatalog;