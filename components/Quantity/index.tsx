import React from 'react';
import styled from "styled-components";
import theme from "../../styles/theme";

const QuantityEl = styled.div`
  display: flex;
  align-items: center;
`
const Button = styled.div<{ disabled?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  padding: 1px 0 0 0;

  font-size: 10px;
  color: ${theme.colors.green};

  cursor: pointer;
  border-radius: 50%;
  border: 1px solid ${theme.colors.green};

  &:hover {
    color: #FFFFFF;

    background: ${theme.colors.green};
  }

  ${props => props.disabled && 'color: #FFFFFF;' +
          'pointer-events: none; opacity: .3; border: 1px solid #FFFFFF;'}
`
const Value = styled.div`
  width: 30px;
  margin: 0 5px;
  padding: 2px 0 0 0;

  font-size: 20px;
  text-align: center;
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
        <i className="fal fa-minus"></i>
      </Button>
      <Value>{count}</Value>
      <Button onClick={onClickPlus}>
        <i className="fal fa-plus"></i>
      </Button>
    </QuantityEl>
  )
}
