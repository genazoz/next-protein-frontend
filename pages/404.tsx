import styled from "styled-components";
import React from "react";
import theme from "../styles/theme";

const Wrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  pointer-events: none;
`;
const Logo = styled.a`
  position: absolute;
  z-index: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  width: max-content;

  font-family: ${theme.fonts.bebasB};
  font-size: calc(16px + 12px);


  @media (max-width: ${theme.media.tabMd}) {
    position: relative;

    order: 0;
    margin: 20px auto;
  }

  span {
    display: block;
    width: auto;
    padding: 0 70px;

    font-size: 200px;
    color: white;

    background: ${theme.colors.darkBlue};
    border: 20px solid ${theme.colors.green};
    box-shadow: 0 0 0 30px white;
    transform: skew(-10deg) rotate(-10deg);

    @media (max-width: ${theme.media.mob}) {
      padding: 8px 8px 2px 8px;
    }
  }
`;

function NotFound() {
  return (
    <Wrapper>
      <Logo>
        <span>404</span>
      </Logo>
    </Wrapper>
  );
}

export default NotFound;
