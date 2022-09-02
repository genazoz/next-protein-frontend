import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import {ResponseProduct} from "../../utils/api/types";
import dynamic from "next/dynamic";

const RelatedEl = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  height: auto;
  padding: 17px;

  background: #1f1d3b;

  @media (max-width: ${theme.media.tab}) {
    display: none;
  }
`;

type NewGoodsProps = {
  items: ResponseProduct[]
}

const DynamicCardCatalog = dynamic(() => import(/*webpackChunkName: "CardCatalog_DYNAMIC_IMPORT"*/'../CardCatalog'))

export const Related: React.FC<NewGoodsProps> = ({items}) => {
  return (
    <RelatedEl>
      {items.map((goods) => (
        <DynamicCardCatalog key={goods.id} {...goods} />
      ))}
    </RelatedEl>
  );
}
