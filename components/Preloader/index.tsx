import React, {FC, useRef, useState} from "react";
import { CSSTransition } from 'react-transition-group';

import ShapeOverlays from "../../libs/shapeOverlays";
import {ClientOnlyPortal} from "../ClientOnlyPortal";
import styled from "styled-components";
import theme from "../../styles/theme";

const OverlayWrapper = styled.div<{isHidden: boolean}>`
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
  
  background-color: #FFF;

  ${props => props.isHidden && `
    background-color: transparent;
  `}
`
const OverlayEl = styled.svg`
  width: 100%;
  height: 100%;
  
  pointer-events: none;
`;
const Path = styled.path`
  &:nth-child(1),
  &:nth-child(4) {
    fill: white;
  }
  &:nth-child(2) {
    fill: ${theme.colors.green};
  }
  &:nth-child(3) {
    fill: ${theme.colors.darkBlue};
  }
`;

interface PreloaderProps {
  selector: string
}

const Preloader: FC<PreloaderProps> = ({selector}) => {
  const [showPreloader, setShowPreloader] = useState(true);
  const overlayWrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    setTimeout(() => {
      if (overlayRef.current) {
        setShowPreloader(false);
        new ShapeOverlays(overlayRef.current).toggle();
      }
    }, 100)
  }, []);

  return (
    <ClientOnlyPortal selector={selector}>
        <CSSTransition in={showPreloader} classNames={'preloader'} timeout={1000} unmountOnExit>
          <OverlayWrapper isHidden={!showPreloader} ref={overlayWrapperRef}>
            <OverlayEl viewBox="0 0 100 100" preserveAspectRatio="none" ref={overlayRef} >
              <Path />
              <Path />
              <Path />
              <Path />
            </OverlayEl>
          </OverlayWrapper>
        </CSSTransition>
    </ClientOnlyPortal>
  );
}

export default Preloader;