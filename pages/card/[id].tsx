import React from "react";
import styled from "styled-components";
import {GetServerSideProps, NextPage} from "next";

import theme from "../../styles/theme";
import {ResponseProduct} from "../../utils/api/types";
import {useAppDispatch} from '../../app/hooks';
import {Related, Counter} from "../../components";
import {addItem} from "../../features/cart/cartSlice";
import {Loader} from "../../components/Loader";
import {Api} from "../../utils/api";
import Image from "next/future/image";
import TruckIco from '../../public/svg/truck.svg'
import LocationIco from '../../public/svg/location.svg'

const Id = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;

  @media (max-width: ${theme.media.tab}) {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
}
`;
const Preview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: ${theme.media.tab}) {
    width: 100%;
    height: auto;
    margin-top: 130px;
  }
  @media (max-width: ${theme.media.tabSm}) {
    width: 100%;
    height: auto;
    margin-top: 100px;
  }
  @media (max-width: ${theme.media.mobSm}) {
    margin-top: 80px;
  }

  .flexRow {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 13px;
  }
`;
const ImageWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  pointer-events: none;
  background-size: 550px;
  background-position: 51% 48%;

  @media (max-width: ${theme.media.tab}) {
  }
`;
const Img = styled.img`
  position: absolute;

  width: 530px;
  height: auto;

  @media (max-width: ${theme.media.tab}) {
    width: 400px;
  }
  @media (max-width: ${theme.media.tabSm}) {
    width: 240px;
  }
  @media (max-width: 390px) {
    width: 140px;
  }
`;
const Circle = styled.div`
  width: 450px;
  height: 450px;

  background: ${theme.colors.green};
  border-radius: 50%;

  @media (max-width: ${theme.media.tab}) {
    width: 384px;
    height: 384px;
    margin-bottom: 100px;
  }
  @media (max-width: ${theme.media.tabSm}) {
    width: 224px;
    height: 224px;
    margin-bottom: 45px;
  }
  @media (max-width: 390px) {
    width: 140px;
    height: 140px;
    margin-bottom: 30px;
  }
`;
const PreviewPrice = styled.div`
  display: flex;
  align-items: center;

  color: ${theme.colors.darkBlue};
  font-family: ${theme.fonts.dinCondM};
  font-size: 28px;

  @media (max-width: ${theme.media.tab}) {
    display: none;
  }
`;
const PreviewButton = styled.button<{count: number}>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 150px;
  height: 35px;
  padding: 0px 32px 1px 32px;

  font-family: ${theme.fonts.dinCondM};
  font-size: ${theme.fontSizes.s};
  margin: 20px 0 0 0;

  color: #FFF;

  cursor: pointer;
  background: ${theme.colors.darkBlue};
  border: 0px;
  border-radius: 5px;
  transition: 0.2s all;

  &:active {
    transform: scale(1.1)
  }

  @media (max-width: ${theme.media.tab}) {
    display: none;
  }

  &::before {
    content: "В корзину";
  }

  &:hover {
    cursor: pointer;
    background: #FFF;

    color: ${theme.colors.darkBlue};

    &::before {
      content: "+";

      display: block;

      transform: scale(1.4);
    }
    &:after {
      display: none;
    }
  }
  
  ${props => props.count && `
    &::after{
      content: '${props.count}';
      
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15.5px;
      height: 14.5px;
      margin: 1px 0 0 7px;
      padding: 1px 0 0;
      
      font-size: 10px;
      color:  ${theme.colors.darkBlue};
  
      border-radius: 50%;
      background: ${theme.colors.green};
    }
  `}
`;
const Footer = styled.div`
  overflow: hidden;
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${theme.media.tab}) {
    width: 100%;
    height: max-content;
    margin: auto auto 0;

    border-radius: unset;
  }

`;
const Infos = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: ${theme.media.tab}) {
    flex-direction: column;
  }
`
const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-top: 10px;

  font-family: ${theme.fonts.dinCondM};
  font-size: 16px;
  color: ${theme.colors.darkBlue};

  @media (max-width: 390px) {
    font-size: 14px;
  }
`
const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  flex: 1;
  padding: 30px 12%;

  background: ${theme.colors.green};

  @media (max-width: ${theme.media.tab}) {
    top: 0;

    overflow-y: scroll;
    display: block;
    height: 100%;
    padding: 30px;

    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
  }
  @media (max-width: 390px) {
    padding: 10px 30px 25px;
  }
`;
const DescriptionText = styled.p`
  width: 100%;

  color: ${theme.colors.darkBlue};
`;
const Name = styled(DescriptionText)`
  font-size: 70px;
  font-family: ${theme.fonts.bebasB};

  @media (max-width: ${theme.media.tab}) {
    display: none;
  }
`;
const AboutText = styled(DescriptionText)`
  width: 60%;
  margin: 5px 0 0 0;

  font-family: ${theme.fonts.dinCondM};
  font-size: 16px;

  @media (max-width: ${theme.media.mob}) {
    display: flex;
    width: 100%;
  }
  @media (max-width: 390px) {
    font-size: 14px;
  }
`;
const Category = styled(DescriptionText)`
  margin: 20px 0 5px 0;

  font-family: ${theme.fonts.bebasB};
  font-size: 20px;

  @media (max-width: ${theme.media.mob}) {
    display: flex;
  }
  @media (max-width: 390px) {
    font-size: 18px;
  }
`;
const Amount = styled(Category)`
`;
const Button = styled.button<{count: number}>`
  display: none;
  justify-content: center;
  align-items: center;
  width: max-content;
  height: 45px;
  margin-top: 30px;
  padding: 2px 40px 0;

  font-size: 14px;
  color: white;

  background: #14132d;
  border-radius: 5px;
  border: 0;

  &::before {
    content: "Добавить в корзину";
  }

  @media (max-width: ${theme.media.tab}) {
    display: flex;
  }
  @media (max-width: ${theme.media.mobSm}) {
    margin-top: 20px;
  }

  ${props => props.count && `
    &::after{
      content: '${props.count}';
      
      display: flex;
      align-items: center;
      justify-content: center;
      width: 17px;
      height: 17px;
      margin: -2px 0 0 7px;
      padding: 1px 0 0;
      
      font-size: 12px;
      color:  ${theme.colors.darkBlue};
  
      border-radius: 50%;
      
      background: ${theme.colors.green};
      
      @media (max-width: ${theme.media.mobSm}) {
        width: 14.5px;
        height: 14.5px;
        font-size: 10.5px;
      }
    }
  `}
`;
const TruckIcon = styled.svg`
  width: 22px;
  height: 22px;
  
  fill: ${theme.colors.darkBlue};
`
const LocationIcon = styled.svg`
  width: 17px;
  height: 17px;

  fill: ${theme.colors.darkBlue};
`

interface CardProps {
  products: ResponseProduct[],
  goods: ResponseProduct,
}

const Card:NextPage<CardProps> = ({ products, goods}) => {
  const dispatch = useAppDispatch();
  const [count, setCount] = React.useState<number>(1);

  const onClickAddToCartButton = () => {
    if (!goods)
      return;

    const goodsData: ResponseProduct = goods;

    dispatch(addItem({goods: goodsData, count: count}));
  };

  const onChangeCount = (number: number) => {
    setCount(number);
  };

  if (!goods) {
    return <Loader/>;
  }

  return (
    <Id>
      <Preview>
          <ImageWrapper>
          <Circle/>
          <Img as={Image} src={`/img/${goods.imageUrl}.png`} alt="item" width={800} height={800}/>
        </ImageWrapper>
      </Preview>
      <Footer>
        <Description>
          <PreviewPrice>{goods.price}Р</PreviewPrice>
          <Name>{goods.title}</Name>
          <Category>Описание</Category>
          <AboutText>
            Have A Rest – это прежде всего комфорт, красота, стиль и
            технологичность.Мы хотим, чтобы каждая твоя поездка была просто
            незабываемой, а наши аксессуары не переставали
          </AboutText>
          <Amount>Количество</Amount>
          <Counter onChangeCount={onChangeCount}/>
          <Infos>
            <Info>
              <TruckIcon as={TruckIco}/> Бесплатная доставка от 3000р
            </Info>
            <Info>
              <LocationIcon as={LocationIco}/>  Есть в наличии
            </Info>
          </Infos>
          <Button count={count} onClick={onClickAddToCartButton}/>
          <PreviewButton count={count} onClick={onClickAddToCartButton}/>
        </Description>
        <Related items={products}/>
      </Footer>
    </Id>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const resultId = parseInt(ctx.query.id as string)
    const goods = await Api().product.getOne(resultId);
    const products = await Api().product.getPaginate(4, 1);

    return {
      props: {
        products: products.items,
        goods,
      },
    };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      products: null,
      goods: null,
    },
  };
};


export default Card;
