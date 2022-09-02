import React, {ReactElement} from "react";
import styled from "styled-components";

import theme from "../../styles/theme";
import Link from "next/link";

const Logo = styled.div<{big: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  margin: 0;

  font-family: ${theme.fonts.bebasB};
  font-size: calc(16px + 12px);
  
  cursor: pointer;

  span {
    display: block;
    width: auto;
    padding: 2px 8px 0 8px;
    margin-left: -2px;

    color: #14132d;

    background: #ffffff;
    transform: skew(-10deg) rotate(-10deg);

    @media (max-width: ${theme.media.mob}) {
      padding: 7px 8px 1px 8px;
    }

    ${(props) =>
      props.theme === "dark" && "background: #14132d; color: #FFFFFF;"}
    ${(props) =>
      props.big &&
      `font-size: 36px;
      
        @media (max-width: ${theme.media.mob}) {
          font-size: 30px;
        }`}
  }

  ${(props) =>
    props.theme === "lined-dark" &&
    `font-size: 21px;
    
        transform: skew(10deg) rotate(10deg);
       border: 1px solid #ffffff;
    
       span {
         display: block;
         width: auto;
         padding: 2px 8px;
    
         color: #ffffff;
    
         background: ${theme.colors.darkBlue};
         transform: skew(-20deg) rotate(-20deg);
    
         @media (max-width: ${theme.media.mob}) {
           padding: 7px 8px 1px 8px;
         }
       }`}
`;

type LogoProps = {
  text: ReactElement | string;
  type?: string;
  href?: string;
  theme?: string;
  big?: boolean;
}

const LogoComponent: React.FC<LogoProps> = ({ text, type = "div", href = `/`, theme = "default", big = false }) => {
  return (
    <>
      {type === "link" ? (
        <Link href={href}>
          <Logo theme={theme} big={big}>
            <span>{text}</span>
          </Logo>
        </Link>
      ) : (
        <Logo theme={theme} big={big}>
          <span>{text}</span>
        </Logo>
      )}
    </>
  );
}

export default LogoComponent;
