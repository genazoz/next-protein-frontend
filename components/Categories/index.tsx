import React from "react";
import styled from "styled-components";

import theme from "../../styles/theme";

const CategoriesEl = styled.div`
  overflow-x: auto;
  display: flex;
  max-width: 100%;
  margin: 0 0 55px 0;

  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: ${theme.media.tab}) {
    width: 100vw;
    max-width: unset;
    margin-left: calc(-1 * var(--unit));
    padding: 0 var(--unit);
  }

  ul {
    display: flex;
  }
`;
const Category = styled.li<{ isActive: boolean }>`
  height: max-content;
  margin: 30px 10px 0 0;
  padding: 9px 21px;

  font-family: ${theme.fonts.dinCondM};
  font-size: 13px;
  color: #ffffff;

  cursor: pointer;
  border-radius: 18px;
  background: #191838;
  opacity: 0;

  transition: .5s margin, .5s opacity;

  &:nth-child(1) {
    transition-delay: .05s;
  }
  &:nth-child(2) {
    transition-delay: .1s;
  }
  &:nth-child(3) {
    transition-delay: .15s;
  }
  &:nth-child(4) {
    transition-delay: .2s;
  }
  &:nth-child(5) {
    transition-delay: .25s;
  }
  &:nth-child(6) {
    transition-delay: .3s;
  }
  &:nth-child(7) {
    transition-delay: .35s;
  }
  &:nth-child(8) {
    transition-delay: .4s;
  }
  
  .page-entering &{
    margin: 30px 10px 0 0;
    opacity: 0;
  }
  .page-entered &{
    margin: 0 10px 0 0;
    opacity: 1;
  }

  @media (max-width: ${theme.media.tab}) {
    font-size: ${theme.fontSizes.s};
  }

  ${(props) =>
          props.isActive &&
          `background: ${theme.colors.green}; color: ${theme.colors.darkBlue}`}
`;

const categoriesArray = ["Все", "Протеин", "Батончики", "Печеньки", "Креатин", "Витамины"];

type CategoriesProps = {
  activeCategories: number[];
  onClickCategory: (idx: number) => void;
}

const CategoriesWithoutMemo: React.FC<CategoriesProps> = ({activeCategories, onClickCategory}) => {
  return (
    <CategoriesEl>
      <ul>
        {categoriesArray.map((category, index) => (
          <Category
            key={index}
            onClick={() => onClickCategory(index)}
            isActive={
              activeCategories.find((category: number) => category === index) !==
              undefined || (activeCategories.length === 0 && index === 0)
            }
          >
            {category}
          </Category>
        ))}
      </ul>
    </CategoriesEl>
  );
}

export const Categories = React.memo(CategoriesWithoutMemo)