import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

const CounterEl = styled.div<{ theme: string }>`
  display: flex;
  width: 200px;
  margin: 10px 0 0;

  @media (max-width: ${theme.media.tabSm}) {
    display: flex;
    width: 100%;
  }
  @media (max-width: ${theme.media.mob}) {
    width: 300px;
    margin: 10px auto;
  }
  @media (max-width: 390px) {
    width: 100%;
  }

  ${props => props.theme === 'green' ? `
    div{
      color: ${theme.colors.green};
    }` : ` div{
      color: ${theme.colors.darkBlue};
    }`};
`;
const Number = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: auto;

  font-size: 16px;

  cursor: pointer;
  opacity: 0.3;

  transition: 0.1s all;

  @media (max-width: ${theme.media.mob}) {
    height: 50px;

    font-size: 20px;
  }
  @media (max-width: 390px) {
    font-size: 15px;
  }

  &:nth-child(3) {
    font-size: 30px;
    opacity: 1;

    @media (max-width: ${theme.media.mob}) {
      font-size: 50px;
    }
    @media (max-width: 390px) {
      font-size: 40px;
    }
  }

  &:nth-child(2), &:nth-child(4) {
    font-size: 20px;
    opacity: .6;

    @media (max-width: ${theme.media.mob}) {
      font-size: 40px;
    }
    @media (max-width: 390px) {
      font-size: 30px;
    }
  }

  &:active {
    transform: scale(1.4);
  }
  `
;


export const Counter: React.FC<{ onChangeCount: (number: number) => void; theme?: string }> = ({
                                                                                                 onChangeCount,
                                                                                                 theme = 'dark'
                                                                                               }) => {

  const onClickNumber = (e: any) => {
    const number = e.target.dataset.number;
    onChangeCount(parseInt(number));
  }

  return (
    <CounterEl>
      {
        [3, 2, 1, 2, 3].map(
          (num, index) => <Number key={index} data-number={num} onClick={(e) => onClickNumber(e)}>{num}</Number>
        )
      }
    </CounterEl>
  );
}
