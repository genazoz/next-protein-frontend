import React from "react";
import styled from "styled-components";

import theme from "../../styles/theme";
import Logo from "../Logo";
import SquareIcon from "../SquareIcon";

const FooterEl = styled.footer<{ isFull: boolean }>`
  display: flex;
  align-items: center;
  margin: auto;
  padding: 35px 64px;

  position: relative;
  width: calc(100% - 80px * 2);

  background: ${theme.colors.green};
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;

  @media (max-width: 1600px) {
    width: calc(100% - 5vw * 2);
  }
  @media (max-width: ${theme.media.tab}) {
    width: 92%;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
  }
  @media (max-width: ${theme.media.tabMd}) {
    justify-content: space-around;
    padding: 20px;
  }

  ${(props) =>
          props.isFull &&
          `width: 95%; 
      background: transparent;  
      padding: 35px 0;
      
      @media (max-width: 380px) {
        display: none;
      }`};
}
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const LogoWrapper = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;

  width: max-content;
  margin: 2px auto auto;

  @media (max-width: ${theme.media.tabMd}) {
    position: relative;

    order: 0;
    margin: 0;
  }
`;
const Contacts = styled(Wrapper)`
  justify-content: flex-start;

  @media (max-width: ${theme.media.tabMd}) {
    order: 1;
    justify-content: space-around;

    border-radius: 35px;
  }

  @media (max-width: ${theme.media.tabSm}) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: ${theme.media.mob}) {
    width: max-content;
    padding: 0 20px;
  }

  span {
    @media (max-width: ${theme.media.tabSm}) {
      display: none;
    }
  }

  span,
  a {
    margin: 3px 35px 0 0;

    font-family: ${theme.fonts.dinCondM};
    font-size: calc(${theme.fontSize} + 1px);
    color: ${theme.colors.darkBlue};

    @media (max-width: ${theme.media.tabMd}) {
      margin: 0;
    }
  }
`;
const SquareIcons = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  @media (max-width: ${theme.media.tabMd}) {
    order: 2;
    justify-content: center;
    width: auto;
  }

  a:not(:nth-last-child(1)) {
    margin: 0 10px 0 0;
  }
`;

export const Footer: React.FC<{ isFull?: boolean }> = ({isFull = false}) => {
  return (
    <FooterEl isFull={isFull}>
      <Contacts>
        <span>Санкт-Петербург</span>
        <a href="http://genazoz.ru" target="_blank" rel="noopener noreferrer">
          www.genazoz.ru
        </a>
        <span>8 (993) 204 76 - 27</span>
      </Contacts>
      <LogoWrapper>
        <Logo text={"PS"} theme={"dark"}/>
      </LogoWrapper>
      <SquareIcons>
        <SquareIcon
          theme={"dark"}
          text={<i className="fab fa-instagram"></i>}
          type={"link"}
          href="https://www.instagram.com"
        />
        <SquareIcon
          theme={"dark"}
          text={<i className="fab fa-vk"></i>}
          type={"link"}
          href="https://vk.com/genazozulya"
        />
      </SquareIcons>
    </FooterEl>
  );
}
