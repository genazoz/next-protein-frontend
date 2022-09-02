import React, {useRef} from "react";
import styled from "styled-components";

import theme from "../../styles/theme";
import Link from "next/link";
import {useDispatch, useSelector} from 'react-redux';
import {addItem, cartSelector} from '../../features/cart/cartSlice'
import {ResponseProduct} from "../../utils/api/types";

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
const Card = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;
  width: 100%;
  padding: 63% 0;

  border-radius: 10px;
  //background: linear-gradient(-45deg, #1e1d3a, #282749);
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
`;
const Background = styled.div`
  position: absolute;
  top: -43px;
  left: 0px;

  width: 145%;
  height: 145%;
  margin: auto;

  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  pointer-events: none;

  transition: transform 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
`;
const AddToCartButton = styled.button<{ isActive: boolean }>`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;

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
    color: ${theme.colors.darkBlue};

    background: ${theme.colors.green};
  }

  .fa-shopping-bag {
    position: relative;

    opacity: 1;

    transition: .6s font-size cubic-bezier(0.85, 0.01, 0.2, 0.99);
  }

  span {
    position: absolute;

    margin-top: 4px;

    font-size: 0px;

    transition: .6s font-size cubic-bezier(0.85, 0.01, 0.2, 0.99);
    transition-delay: .1s;
  }

  &:active {
    transform: scale(1.1)
  }
  
  @media (max-width: ${theme.media.mobSm}) {
    right: unset;
    left: 20px;

    margin: 0;
  }

  ${(props) => {
    if (props.isActive) {
      return `
        margin-left: 15px;
        padding: 20px;
        
        color: ${theme.colors.green};
        
        border-radius: 100px;
        background: #FFFFFF;
        transition: .2s all;
        
        &:hover {
          color: ${theme.colors.green};
        
          background: #FFFFFF;
        }
        .fa-shopping-bag {
          position: absolute;
          
          margin-top: -1px;
          
          font-size: 18px;
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

export const CardCatalog: React.FC<ResponseProduct> = ({id, imageUrl, title, price, category}) => {
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
      <Card className={"card"} ref={cardRef}>
        <Link href={`/card/${id}`}>
          <LinkElement></LinkElement>
        </Link>
        <AddToCartButton
          onClick={() => onClickAddToCartButton()}
          isActive={itemInCart ? true : false}
        >
          <span>{itemInCart && itemInCart.count}</span>
          <i className="fal fa-shopping-bag"></i>
        </AddToCartButton>
        <Background
          ref={bgRef}
          className={"card-bg"}
          style={{backgroundImage: `url('/img/${imageUrl}.png`}}
        ></Background>
        <Name>{title}</Name>
        <Price>{price}</Price>
      </Card>
    </Wrapper>
  );
}
