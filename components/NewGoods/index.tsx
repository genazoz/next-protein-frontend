import React, {useEffect, useState} from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import {useKeenSlider} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import {CardCatalog, Footer} from "../";
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
  @media (max-height: 500px) {
    display: none;
  }
`;
const LogoWrapper = styled.h2`
  margin: 0 0 35px;

  @media (max-width: ${theme.media.mob}) {
    margin: 0 0 30px;
  }
`;
const Subtitle = styled.p`
  width: 500px;
  max-width: 100%;

  font-size: 15px;
  color: #bbb;

  @media (max-height: 600px) {
    font-size: ${theme.fontSizes.s};
  }
`;
const ButtonWrapper = styled.div`
  margin-top: 25px;
  
  i {
    background-color: ${theme.colors.green};
  }
`;
const GoodsSlider = styled.div`
  padding: 30px 0;

  @media (max-width: ${theme.media.mob}) {
    width: 100%;
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
const GoodsSlide = styled.div`
  overflow: visible !important;
`

type NewGoodsProps = {
  items: ResponseProduct[]
}

export const NewGoods: React.FC<NewGoodsProps> = ({items}) => {
  const [options,setOptions] = useState({});
  useEffect(()=>{
    setTimeout(() => setOptions({
      loop: true,
      rtl: true,
      slides: {
        perView: 5,
        spacing: 55,
        origin: "center",
      },
      breakpoints: {
        '(min-width: 0px)': {
          slides: {
            perView: 1.4,
            spacing: 20,
            origin: "center",
          }
        },
        '(min-width: 500px)': {
          slides: {
            perView: 2,
            spacing: 20,
            origin: "center",
          }
        },
        '(min-width: 600px)': {
          slides: {
            perView: 4,
            spacing: 30,
            origin: "center",
          }
        },
        '(min-width: 900px)': {
          slides: {
            perView: 5,
            spacing: 30,
            origin: "center",
          }
        },
        '(min-width: 1200px)': {
          slides: {
            perView: 6,
            spacing: 30,
            origin: "center",
          }
        },
        '(min-width: 1400px)': {
          slides: {
            perView: 7,
            spacing: 30,
            origin: "center",
          }
        },
        '(min-width: 1700px)': {
          slides: {
            perView: 6,
            spacing: 45,
            origin: "center",
          }
        },
        '(min-width: 2100px)': {
          slides: {
            perView: 7,
            spacing: 55,
            origin: "center",
          }
        },
        '(min-width: 2600px)': {
          slides: {
            perView: 10,
            spacing: 55,
            origin: "center",
          }
        },
        '(min-width: 2800px)': {
          slides: {
            perView: 14,
            spacing: 55,
            origin: "center",
          }
        }
      },
    }), 500)
  }, [])

  const [ref] = useKeenSlider<HTMLDivElement>(options)

  return (
    <Section>
      <HeaderWrapper>
        <LogoWrapper>
          <Logo text={"Новинки"} big />
        </LogoWrapper>
        <Subtitle>
          Продукция номер один в России в категории натуральные препараты для укрепления здоровья и повышения качества жизни*
          На сайте вы можете найти такую продукцию как протеин, гейнеры, аргинин, БЦА, шейкеры и многое другое!
        </Subtitle>
        <ButtonWrapper>
          <Button theme={'green'} text={"Перейти в каталог"} type={"link"} href={"/catalog"}></Button>
        </ButtonWrapper>
      </HeaderWrapper>
      <GoodsSlider ref={ref} className="keen-slider">
        {
          items.map((goods, index) => (
            <GoodsSlide key={goods.id} className={"keen-slider__slide number-slide" + index}>
              <CardCatalog {...goods} />
            </GoodsSlide>
          ))
        }
      </GoodsSlider>
      <FooterSection>
        <FooterWrapper>
          <Footer isFull={true}/>
        </FooterWrapper>
      </FooterSection>
    </Section>
  );
}
