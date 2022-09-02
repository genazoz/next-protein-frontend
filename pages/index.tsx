import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import styled from "styled-components";
import theme from "../styles/theme";
import {NextPage} from "next";
import {Api} from "../utils/api";
import {ResponseProduct} from "../utils/api/types";
import dynamic from "next/dynamic";

const Main = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: auto;
  margin: 0 auto;

  .fp-watermark {
    display: none !important;
  }
`;
const Background = styled.span<{ isHidden: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  width: 98vw;
  height: calc(100% - 100px);
  margin: auto;

  background: ${theme.colors.green};
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;

  transition: 0.8s height, 1s width, 0.8s border-radius;
  transition-timing-function: cubic-bezier(0.85, 0.01, 0.2, 0.99);
  
  @media (max-width: ${theme.media.mob}) {
    width: calc(100% - 10px * 2);
    height: calc(100% - 80px);
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
  }

  ${(props) =>
  props.isHidden &&
  `height: 105px !important; 
    width: 1450px !important;
    @media (max-width: 1550px) {
        width: 95% !important;
    }
    @media (max-width: ${theme.media.tabMd}) {
        width: calc(100% - 64px * 2) !important;
        height: 0 !important;
    }
    @media (max-width: ${theme.media.mob}) {
        width: calc(100% - 32px * 2) !important;
    }
    @media (max-width: 380px) {
        width: 90% !important;
        height: 0 !important;
    }
    @media (max-height: 840px) {
        height: 0 !important;
    }`}
`;

interface HomeProps {
  goods: ResponseProduct[];
}

const DynamicPreview = dynamic(() => import(/*webpackChunkName: "Preview_DYNAMIC_IMPORT"*/'../components/Preview'))
const DynamicNewGoods = dynamic(() => import(/*webpackChunkName: "NewGoods_DYNAMIC_IMPORT"*/'../components/NewGoods'))

const Home: NextPage<HomeProps> = ({goods}) => {
  const [destinationIndex, setDestinationIndex] = React.useState(0);

  return (
    <Main>
      <Background isHidden={destinationIndex > 0 ? true : false}/>
      <ReactFullpage
        navigation={true}
        easingcss3={"cubic-bezier(.85,.01,.2,.99)"}
        scrollingSpeed={800}
        scrollOverflow={true}
        normalScrollElements={".js-cart-wrapper, .js-auth-wrapper"}
        onLeave={(origin, destination) => {
          setDestinationIndex(destination.index);
        }}
        render={({state, fullpageApi}) => {
          return (
            <ReactFullpage.Wrapper>
              <div className="section">
                <DynamicPreview destinationIndex={destinationIndex}/>
              </div>
              <div className="section">
                <DynamicNewGoods isShow={destinationIndex ? true : false} items={goods}/>
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </Main>
  );
}

export const getServerSideProps = async (ctx: any) => {
  try {
    const data = await Api().product.getPaginate(9, 1);

    return {
      props: {
        goods: data.items,
      },
    };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      goods: null,
    },
  };
};


export default Home;
