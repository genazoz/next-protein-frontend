import React from "react";
import styled from "styled-components";

const LoaderEl = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  
  #still-cloud {
    position: absolute;
    font-size: 2em;
    color: #1abc9c;
    opacity: 0;
    animation: loading2 .6s alternate infinite;
  }

  #pulsating-cloud {
    position: absolute;
    font-size: 3em;
    color: #1abc9c;
    opacity: 0;
    animation: loading .6s alternate infinite;
  }

  @keyframes loading {
    0% {
      font-size: 3em;
      transform: scale(1.7);
    }
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
  }
  @keyframes loading2 {
    0% {
      font-size: 2em;
      transform: scale(1.7);
    }
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
  }
`

export const Loader: React.FC = () => {
  return (
    <LoaderEl>
      <div className="fa fa-cloud" aria-hidden="true" id="pulsating-cloud"></div>
      <div className="fa fa-cloud" aria-hidden="true" id="still-cloud"></div>
    </LoaderEl>
  );
}
