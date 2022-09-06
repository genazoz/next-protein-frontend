import React, {FC, useRef} from "react";

import ShapeOverlays from "../../libs/shapeOverlays";
import {ClientOnlyPortal} from "../ClientOnlyPortal";
import styled from "styled-components";
import theme from "../../styles/theme";

const OverlayEl = styled.svg`
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background: white;
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
  const overlayRef = useRef<SVGSVGElement>(null);

  const loadPreloader = () => {
    if (!overlayRef.current) return;

    new ShapeOverlays(overlayRef.current).toggle();
    overlayRef.current.style.background = "transparent";
  }

  React.useEffect(() => {
    setTimeout(() => loadPreloader())
  }, []);

  return (
    <ClientOnlyPortal selector={selector}>
      <OverlayEl viewBox="0 0 100 100" preserveAspectRatio="none" ref={overlayRef} >
        {[...Array(4)].map((index) => <Path key={index} />)}
      </OverlayEl>
    </ClientOnlyPortal>
  );
}

export default Preloader;