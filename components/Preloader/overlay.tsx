import React from "react";
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
const textObject = {
  overlayClass: "js-preloader-overlay",
};

export const Overlay: React.FC = () => {
  return (
    <OverlayEl
      className={`${textObject.overlayClass}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <Path />
      <Path />
      <Path />
      <Path />
    </OverlayEl>
  );
}