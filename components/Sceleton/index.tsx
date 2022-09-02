import React from "react";
import styled from "styled-components";

import theme from "../../styles/theme";
import {Loader} from "../Loader";

const Wrapper = styled.div`
  width: 100%;
  max-width: 100%;
  transform: perspective(800px);
  transform-style: preserve-3d;
  cursor: pointer;

  &:hover {
    .card-bg {
      transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1),
      opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1);
      //opacity: 0.8;
    }

    .card {
      transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1),
      box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1),
      background 0.3s cubic-bezier(0.23, 1, 0.32, 1),
      border 0.6s cubic-bezier(0.23, 1, 0.32, 1);

      border: 1px solid ${theme.colors.green};
      box-shadow: rgba(0, 0, 0, 0.11) 0 30px 60px 0;
    }
  }
}`;
const Card = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;
  width: 100%;
  padding: 63% 0;

  border-radius: 10px;
  //background: linear-gradient(-45deg, #1e1d3a, #282749);
  border: 1px solid transparent;
  background: linear-gradient(-45deg, #1e1d3a, #282749);

  transition: 3s transform cubic-bezier(0.23, 1, 0.32, 1);

  &::before {
    content: "";

    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;

    display: none;
    width: 100%;
    height: 55%;

    opacity: 0;
    background: linear-gradient(to top, #1a1a37, transparent);

    transition: 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);

    .card-wrapper:hover & {
      opacity: 1;
    }
  }


  @media (max-width: ${theme.media.mob}) {
    height: 220px;
    padding: 0;
  }
  @media (max-width: 400px) {
    height: 180px;
  }
  @media (max-width: ${theme.media.mobSm}) {
    height: 140px;
  }

  a {
    font-family: ${theme.fonts.bebasB};
  }
`;

export const Sceleton: React.FC = () => {
  return (
    <Wrapper
      className={"card-wrapper"}
    >
      <Card className={"card"}>
        <Loader/>
      </Card>
    </Wrapper>
  );
}
