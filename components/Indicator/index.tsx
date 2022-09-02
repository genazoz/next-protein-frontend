import React, {ReactElement} from "react";
import styled from "styled-components";

import theme from "../../styles/theme";

export enum IndicatorSide {
  TOLEFT='toleft',
  TORIGHT='toright',
  TOTOP='totop',
  TOBOTTOM='tobottom',
}

const IndicatorEl = styled.span<{side: IndicatorSide}>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 19px;
  height: 14px;
  padding-top: 1px;

  font-family: ${theme.fonts.bebasB};
  font-size: 11px;
  color: ${theme.colors.darkBlue};

  cursor: pointer;
  background: ${theme.colors.green};
  border-radius: 3px;

  &::before {
    content: '';

    position: absolute;
    top: 0;
    bottom: 0;

    width: 0;
    height: 0;
    margin: auto;

    border: 3px solid transparent;

    ${props => props.side === IndicatorSide.TORIGHT && `
      right: -6px;
      border-left-color: ${theme.colors.green};
      
      @media (max-width: ${theme.media.tabSm}) {
        right: -6px;
      }
    `}
    ${props => props.side === IndicatorSide.TOLEFT && `
      left: -6px;
      border-right-color: ${theme.colors.green};
    `}
  }

  @media (max-width: ${theme.media.tabSm}) and (min-width: ${theme.media.mobSm}) {
    min-width: 22px;
    height: 16px;
    padding-top: 2px;
    
    font-size: 12px;
  }
`;

type IndicatorProps = {
  count: number;
  side?: IndicatorSide
}

const Indicator: React.FC<IndicatorProps> = ({count, side}) => {
  return (
    <IndicatorEl side={side || IndicatorSide.TOLEFT}>{count}</IndicatorEl>
  );
}

export default Indicator;
