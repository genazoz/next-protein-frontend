import React from "react";

import styled from "styled-components";
import theme from "../../styles/theme";
import {Sceleton} from "../Sceleton";

const GoodsListEl = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 50px;

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
  @media (max-width: 380px) {
    grid-gap: 20px;
  }

`;

export const SceletonList: React.FC = () => {
  return (
    <GoodsListEl>
      {[...Array(15)].map((index) => (
        <Sceleton key={index} />
      ))}
    </GoodsListEl>
  );
}

