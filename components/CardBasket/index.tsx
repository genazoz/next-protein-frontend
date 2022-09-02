import React from "react";
import styled from "styled-components";

import theme from "../../styles/theme";
import {useAppDispatch} from "../../app/hooks";
import {minusItem, addItem, removeItem, CartProduct} from '../../features/cart/cartSlice'
import {Quantity} from '../'
import Link from "next/link";
import Image from "next/future/image";
import CloseIco from '../../public/svg/close.svg'

const Card = styled.div`
  position: relative;
  z-index: 1;

  overflow: hidden;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 24px 24px;

  background: linear-gradient(-45deg, #1e1d3a, #282749);
  border-radius: 12px;

  @media (max-width: ${theme.media.tab}) {
    &::before {
      content: '';

      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      background: #14122f;
      opacity: .7;
    }
  }
`;
const ImageWrapper = styled.div`
  position: absolute;
  z-index: -1;
  left: -30px;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 250px;
  
  cursor: pointer;
  pointer-events: none;
`;
const Img = styled.img`
  z-index: 1;

  width: 100%;
  height: 100%;
  object-fit: contain;

  @media (max-width: ${theme.media.tab}) {
    opacity: .4;
  }
`;
const Text = styled.span`
  display: block;

  font-family: ${theme.fonts.dinCondM};
`;
const Price = styled(Text)`
  width: 60px;
  margin: 0 10px;

  text-align: center;
  font-size: 18px;`;
const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 1px 0 0 0;

  color: #FFFFFF;
  font-size: 25px;

  opacity: .3;
  cursor: pointer;
  border: 1px solid #FFFFFF;
  border-radius: 100px;
  
  i {
    font-size: 14px;
  }

  &:hover {
    opacity: 1;
  }
`;
const Elements = styled.div`
  position: relative;
  z-index: 1;

  display: flex;
  align-items: center;
  margin-left: auto`
const CloseIcon = styled.svg`
  width: 16px;
  height: 16px;
  
  fill: #FFFFFF;
`

export const CardBasket: React.FC<CartProduct> = ({id, imageUrl, title, price, count, category}) => {
  const dispatch = useAppDispatch()

  const onClickPlus = () => {
    const goods = {id, imageUrl, title, price, count, category};
    dispatch(addItem({goods: goods}));
  };
  const onClickMinus = () => {
    dispatch(minusItem(id));
  };
  const onClickRemove = () => {
    dispatch(removeItem(id));
  };

  return (
    <Card>
      <Link href={`/card/${id}`}>
        <ImageWrapper>
          <Img as={Image} width="300" height="300" src={`/img/${imageUrl}.png`} alt=""/>
        </ImageWrapper>
      </Link>
      <Elements>
        <Quantity count={count} onClickPlus={onClickPlus} onClickMinus={onClickMinus}/>
        <Price>{price * count}р</Price>
        <Remove onClick={() => {
          onClickRemove();
        }}>
          <CloseIcon as={CloseIco}/>
        </Remove>
      </Elements>
    </Card>
  );
}
