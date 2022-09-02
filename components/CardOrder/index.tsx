import React from "react";
import styled from "styled-components";

import theme from "../../styles/theme";
import Link from "next/link";
import {ResponseOrderProduct} from "../../utils/api/types";
import Image from "next/future/image";

const Card = styled.div`
  position: relative;
  z-index: 1;

  overflow: hidden;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 100px 24px;

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
      opacity: 0;
    }
  }
`;
const ImageWrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 0px;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 250px;
  
  cursor: pointer;
`;
const Img = styled.img`
  z-index: 1;

  width: 100%;
  height: 100%;
  object-fit: contain;
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
const Elements = styled.div`
  position: relative;
  z-index: 1;

  display: flex;
  align-items: center;
  margin-left: auto`

export const CardOrder: React.FC<ResponseOrderProduct> = ({prodId, imageUrl}) => {
  return (
    <Card>
      <Link href={`/card/${prodId}`}>
        <ImageWrapper>
          <Img as={Image} width="300" height="300" src={`/img/${imageUrl}.png`} alt=""/>
        </ImageWrapper>
      </Link>
      <Elements>
      </Elements>
    </Card>
  );
}
