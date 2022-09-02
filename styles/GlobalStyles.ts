import {createGlobalStyle} from "styled-components";
import theme from "./theme";

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }

  html {
    font-size: 16px;
    font-family: ${theme.fonts.bebasB}, Impact, Serif;
    color: white;
    background: #14132d;
  }

  .flexCenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fullpage-wrapper {
    width: 100%;
  }

  a {
    text-decoration: none;
    color: white;
  }

  a, p {
    font-family: ${theme.fonts.dinCondM};
    font-size: ${theme.fontSize};

    @media (max-width: ${theme.media.mob}) {
      font-size: 15px;
    }
  }

  li {
    list-style-type: none;
  }

  input, button {
    outline: none;
    font-family: ${theme.fonts.bebasB};
  }
  
  button {
    cursor: pointer;
    background-color: transparent;
    border: unset;
  }

  #fp-nav ul li a span {
    background: #FFFFFF;
  }

  #preloader-root {
    position: fixed;
    z-index: 101 !important;
    top: 0;
    left: 0;
  }

  #modal-root {
    position: fixed;
    z-index: 100 !important;
    top: 0;
    left: 0;
  }

  \:root {
    --unit: calc((100vw - 1650px) / 2);
    @media (max-width: ${theme.media.desktop}) {
      --unit: 85px;
    }
    @media (max-width: ${theme.media.desktopMd}) {
      --unit: 64px;
    }
    @media (max-width: ${theme.media.tab}) {
      --unit: 64px;
    }
    @media (max-width: ${theme.media.tabMd}) {
      --unit: 32px;
    }
    @media (max-width: ${theme.media.mob}) {
      --unit: 24px;
    }
  }

  h1, h2, h3, h4 {
    font-weight: normal;
  }

  /* Make clicks pass-through */
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: ${theme.colors.green};

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 2px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px ${theme.colors.green}, 0 0 5px ${theme.colors.green};
    opacity: 1.0;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }

  /* Remove these to get rid of the spinner */
  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;

    border: solid 2px transparent;
    border-top-color: ${theme.colors.green};
    border-left-color: ${theme.colors.green};
    border-radius: 50%;

    -webkit-animation: nprogress-spinner 400ms linear infinite;
    animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  @-webkit-keyframes nprogress-spinner {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes nprogress-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }


  #fp-nav ul li a span,
  .fp-slidesNav ul li a span {
    display: none;

    background-color: #FFFFFF !important;
  }

`;

export default GlobalStyles;