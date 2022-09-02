import React from "react";
import styled from "styled-components";
import {CardCatalog} from "../";
import theme from "../../styles/theme";
import {ResponseProduct} from "../../utils/api/types";

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

export const Related: React.FC<NewGoodsProps> = ({items}) => {
  return (
    <RelatedEl>
      {items.map((goods) => (
        <CardCatalog key={goods.id} {...goods} />
      ))}
    </RelatedEl>
  );
}
