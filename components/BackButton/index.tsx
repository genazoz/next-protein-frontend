import React from "react";
import styled from "styled-components";

import theme from "../../styles/theme";
import { useRouter } from 'next/router'
import ArrowLeftIco from '../../public/svg/arrow-left.svg'

const Button = styled.div`
  position: absolute;
  z-index: 110;

  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  margin-left: 80px;
  padding: 7px 20px 7px 15px;

  font-family: ${theme.fonts.dinCondM};
  font-size: ${theme.fontSizes.s};
  color: ${theme.colors.green};

  border: 1px solid ${theme.colors.green};
  border-radius: 20px;
  cursor: pointer;

  svg {
    width: 11px;
    margin: 0 7px 1px 0;
  }
`;
const ArrowLeftIcon = styled.svg`
  width: 16px;
  height: 16px;
  
  fill: ${theme.colors.green};
`

export const BackButton:React.FC = () => {
  const router = useRouter()

  return (
    <>
      <Button onClick={() => router.back()}>
        <ArrowLeftIcon as={ArrowLeftIco}/>
        Назад
      </Button>
    </>
  );
}
