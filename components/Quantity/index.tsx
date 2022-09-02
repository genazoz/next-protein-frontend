import React from 'react';
import styled from "styled-components";

import theme from "../../styles/theme";
import PlusIco from '../../public/svg/plus.svg'
import MinusIco from '../../public/svg/minus.svg'

const QuantityEl = styled.div`
  display: flex;
  align-items: center;
`
const Button = styled.button<{ disabled?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  padding: 1px 0 0 0;

  font-size: 10px;

  cursor: pointer;
  border-radius: 50%;
  border: 1px solid ${theme.colors.green};

  &:hover {
    background: ${theme.colors.green};

    svg {
      fill: #FFFFFF;
    }
  }

  ${props => props.disabled && `
    pointer-events: none; 
    opacity: .3; 
    border: 1px solid #FFFFFF;
    
    svg {
      fill: #FFFFFF;
    }
  `}
`
const Value = styled.div`
  width: 30px;
  margin: 0 5px;
  padding: 2px 0 0 0;

  font-size: 20px;
  text-align: center;
`
const PlusIcon = styled.svg`
  width: 13px;
  height: 13px;
  fill: ${theme.colors.green};
`
const MinusIcon = styled.svg`
  width: 13px;
  height: 13px;
  fill: ${theme.colors.green};
`

type QuantityProps = {
  count: number;
  onClickPlus: () => void;
  onClickMinus: () => void;
}

export const Quantity: React.FC<QuantityProps> = ({count, onClickPlus, onClickMinus}) => {
  return (
    <QuantityEl>
      <Button onClick={onClickMinus} disabled={count === 1}>
        <MinusIcon as={MinusIco}/>
      </Button>
      <Value>{count}</Value>
      <Button onClick={onClickPlus}>
        <PlusIcon as={PlusIco}/>
      </Button>
    </QuantityEl>
  )
}
