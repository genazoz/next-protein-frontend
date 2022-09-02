import React from "react";

import styled from "styled-components";
import theme from "../../styles/theme";
import {CardCatalog} from "../";
import {ResponseProduct} from "../../utils/api/types";

const GoodsListEl = styled.div<{loading: boolean}>`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 50px;

  transform: translateY(60px);
  opacity: 0;
  
  transition: .5s opacity, .4s transform;
  transition-delay: .2s;

  .page-entering &{
    transform: translateY(60px);
    opacity: 0;
  }
  .page-entered &{
    transform: translateY(0px);
    opacity: 1;
  }
  
  @media (max-width: ${theme.media.tab}) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 40px;
  }
  @media (max-width: ${theme.media.tabMd}) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 40px;
  }
  @media (max-width: ${theme.media.tabSm}) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
  }
  @media (max-width: ${theme.media.mobSm}) {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 380px) {
    grid-gap: 20px;
  }

`;

type GoodsListProps = {
  items: ResponseProduct[],
  loading?: boolean
}

export const GoodsList: React.FC<GoodsListProps> = ({items, loading = false}) => {
  return (
    <GoodsListEl loading={loading}>
      {items.map((goods, index) => <CardCatalog {...goods} key={index} />)}
    </GoodsListEl>
  );
}

