import React from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { CSSTransition } from 'react-transition-group';

import theme from "../../styles/theme";
import {Footer} from "../";
import Button from "../Button";
import Logo from "../Logo";
import {ResponseProduct} from "../../utils/api/types";

const Section = styled.section`
  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 0 0 40px 0;

  @media (max-width: ${theme.media.desktopSm}) {
    padding: 0;
  }
`;
const HeaderWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  padding: 0 24px;
  margin: 0 0 25px;

  text-align: center;

  @media (max-height: 600px) {
    margin: 0;
  }
  @media (max-height: 700px) {
    display: none;
  }
`;
const LogoWrapper = styled.h2`
  margin: 30px 0 35px;

  opacity: 0;

  transition: .5s margin, .5s opacity;

  .new-goods-enter & {
    margin: 30px 0 35px;
    
    opacity: 0;
    
    transition-delay: .5s;
  }
  .new-goods-enter-active & {
    margin: 0 0 35px;
    opacity: 1;
  }
  .new-goods-enter-done & {
    margin: 0 0 35px;
    opacity: 1;
  }
  .new-goods-exit-active & {
    margin: 30px 0 35px;
    opacity: 0;
    transition: .5s margin, .5s opacity;
  }
  
  @media (max-width: ${theme.media.mob}) {
    margin: 0 0 30px;
  }
`;
const Subtitle = styled.p`
  width: 500px;
  max-width: 100%;
  margin: 30px 0 0;

  font-size: 16px;
  color: #bbb;

  opacity: 0;

  transition: .5s margin, .5s opacity;

  .new-goods-enter & {
    margin: 30px 0 0;
    
    opacity: 0;

    transition-delay: .5s;
  }
  .new-goods-enter-active & {
    margin: 0;
    opacity: 1;
  }
  .new-goods-enter-done & {
    margin: 0;
    opacity: 1;
  }
  .new-goods-exit & {
    margin: 0;
    opacity: 1;
  }
  .new-goods-exit-active & {
    margin: 30px 0 0;
    opacity: 0;
    transition: .5s margin, .5s opacity;
  }

  @media (max-height: ${theme.media.mobSm}) {
    font-size: ${theme.fontSizes.s};
  }
`;
const ButtonWrapper = styled.div`
  margin: 55px 0 0;

  opacity: 0;

  transition: .5s margin, .5s opacity;

  .new-goods-enter & {
    margin: 55px 0 0;
    
    opacity: 0;
    
    transition-delay: .5s;
  }
  .new-goods-enter-active & {
    margin: 25px 0 0;
    opacity: 1;
  }
  .new-goods-enter-done & {
    margin: 25px 0 0;
    opacity: 1;
  }
  .new-goods-exit & {
    margin: 25px 0 0;
    opacity: 1;
  }
  .new-goods-exit-active & {
    margin: 55px 0 0;
    opacity: 0;
    transition: .5s margin, .5s opacity;
  }

  i {
    background-color: ${theme.colors.green};
  }
`;
const FooterSection = styled(Section)`
  position: absolute;
  bottom: 0;

  height: max-content;
  padding: 0 calc((100% - 1320px) / 2);

  @media (max-height: 840px) {
    display: none;
  }
  @media (max-width: ${theme.media.tabMd}) {
    display: none;
  }
`;
const FooterWrapper = styled.div`
  display: flex;
  width: 100%;
  height: max-content;

  @media (max-width: ${theme.media.tab}) {
    width: 85%;
  }
  @media (max-width: ${theme.media.tabMd}) {
    display: none;
    width: calc(100% - 64px * 2);
  }
  @media (max-width: ${theme.media.mob}) {
    width: calc(100% - 24px * 2);
  }
  @media (max-width: ${theme.media.mobSm}) {
    display: none;
  }
`;
const CardsWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 30px 0 0;
  padding: 30px 0 0;
  
  gap: 30px;

  opacity: 0;

  transition: .5s margin, .5s opacity;

  .new-goods-enter & {
    margin: 30px 0 0;
    
    opacity: 0;
    
    transition-delay: .5s;
  }
  .new-goods-enter-active & {
    margin: 0;
    opacity: 1;
  }
  .new-goods-enter-done & {
    margin: 0;
    opacity: 1;
  }
  .new-goods-exit & {
    margin: 0;
    opacity: 1;
  }
  .new-goods-exit-active & {
    margin: 30px 0 0;
    opacity: 0;
    transition: .5s margin, .5s opacity;
  }


  @media (max-width: ${theme.media.desktop}) {
    gap: 45px;
  }
  @media (max-width: ${theme.media.tab}) {
    gap: 30px;
  }
  
  & > div {
    width: 250px;
    flex-shrink: 0;

    @media (max-width: ${theme.media.mob}) {
      width: 200px;

      & > div {
        height: 250px;
      }
    }
    @media (max-width: ${theme.media.mobSm}) {
      width: 160px;
      
      & > div {
        height: 200px;
      }
    }
  }
`

type NewGoodsProps = {
  items: ResponseProduct[],
  isShow: boolean
}

const DynamicCardCatalog = dynamic(() => import(/*webpackChunkName: "CardCatalog_DYNAMIC_IMPORT"*/'../CardCatalog'))

const NewGoods: React.FC<NewGoodsProps> = ({items, isShow}) => {
  return (
    <CSSTransition in={isShow} classNames={'new-goods'} timeout={400} unmountOnExit>
      <Section>
      <HeaderWrapper>
        <LogoWrapper>
          <Logo text={"Новинки"} big/>
        </LogoWrapper>
        <Subtitle>
          Продукция номер один в России в категории натуральные препараты для укрепления здоровья и повышения качества
          жизни*
          На сайте вы можете найти такую продукцию как протеин, гейнеры, аргинин, БЦА, шейкеры и многое другое!
        </Subtitle>
        <ButtonWrapper>
          <Button theme={'green'} text={"Перейти в каталог"} type={"link"} href={"/catalog"}></Button>
        </ButtonWrapper>
      </HeaderWrapper>
      <CardsWrapper>
        {
          items.map(goods =>
            <DynamicCardCatalog key={goods.id} {...goods} />
          )
        }
      </CardsWrapper>
      <FooterSection>
        <FooterWrapper>
          <Footer isFull={true}/>
        </FooterWrapper>
      </FooterSection>
    </Section>
    </CSSTransition>
  );
}

export default NewGoods;