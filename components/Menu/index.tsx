import React from "react";
import Link from "next/link";
import {useSelector} from "react-redux";
import styled from "styled-components";
import { CSSTransition } from 'react-transition-group';

import theme from "../../styles/theme";
import {settingsSelector} from "../../features/settings/settingsSlice";
import {useAppDispatch} from "../../app/hooks";
import {setMenuOpened} from "../../features/settings/settingsSlice";

const MenuEl = styled.div`
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;

  overflow: hidden;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;

  cursor: auto;
  pointer-events: none;

  transition: 1s transform cubic-bezier(0.85, 0.01, 0.2, 0.99);

  &::-webkit-scrollbar {
    display: none;
  }

  &.menu-enter-active {
    pointer-events: all; 
  }
  &.menu-enter-done {
    pointer-events: all;
  }
`;
const Overlay = styled.svg`
  grid-area: 1 / 1 / 2 / 2;
  position: absolute;
  z-index: -1;
  pointer-events: none;
  width: 100%;
  height: 100%;

  path {
    .menu-enter & {
      animation: show-overlay 1.1s forwards;
    }
    .menu-enter-done & {
      animation: show-overlay 1.1s forwards;
    }
    .menu-exit-active & {
      animation: hide-overlay 1.05s forwards;
    }
  }

  @keyframes show-overlay {
    0% {
      animation-timing-function: cubic-bezier(1, 0, 1, 1.1);
      d: path("M 0 100 V 100 Q 50 100 100 100 V 100 z");
    }
    73% {
      animation-timing-function: cubic-bezier(.15, .15, .15, 1.1);
      d: path("M 0 100 V 50 Q 50 0 100 50 V 100 z");
    }
    100% {
      d: path("M 0 100 V 0 Q 50 0 100 0 V 100 z");
    }
  }
  @keyframes hide-overlay {
    0% {
      animation-timing-function: cubic-bezier(1, 0, 1, 1.1);
      d: path("M 0 100 V 0 Q 50 0 100 0 V 100 z");
    }
    73% {
      animation-timing-function: cubic-bezier(.15, .15, .15, 1.1);
      d: path("M 0 100 V 50 Q 50 100 100 50 V 100 z");
    }
    100% {
      d: path("M 0 100 V 100 Q 50 100 100 100 V 100 z");
    }
  }
`;
const List = styled.ul`
  width: 82%;
  height: auto;
  margin: auto;
`;
const ListItem = styled.li`
  position: relative;
  z-index: 111;

  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: max-content;
  height: 0;
  margin: 0 auto 45px auto;
  padding: 0px 30px;

  font-size: 21px;

  opacity: 0;
  box-shadow: 0 0 0 0px #1abc9c, 0 0 0 0px white;
  background: ${theme.colors.darkBlue};
  transform: skew(-10deg) rotate(-10deg);

  transition: 0.5s height cubic-bezier(0.85, 0.01, 0.2, 0.99),
    0.5s box-shadow cubic-bezier(0.85, 0.01, 0.2, 0.99),
    .4s opacity;
  transition-delay: 0s;

  .menu-enter-active & {
    height: 100px;
    padding: 3px 30px 0px 30px;

    opacity: 1;
    box-shadow: 0 0 0 5px #1abc9c, 0 0 0 10px white;

    transition: 0.6s height cubic-bezier(0.85, 0.01, 0.2, 0.99), 0.6s padding cubic-bezier(0.85, 0.01, 0.2, 0.99), 1.4s box-shadow cubic-bezier(0.85, 0.01, 0.2, 0.99);
    transition-delay: .7s;

    @media (max-width: ${theme.media.tabSm}) {
      height: 70px;
    }
  }
  .menu-enter-done & {
    height: 100px;
    padding: 3px 30px 0px 30px;

    opacity: 1;
    box-shadow: 0 0 0 5px #1abc9c, 0 0 0 10px white;

    transition: 0.6s height cubic-bezier(0.85, 0.01, 0.2, 0.99), 0.6s padding cubic-bezier(0.85, 0.01, 0.2, 0.99), 1.4s box-shadow cubic-bezier(0.85, 0.01, 0.2, 0.99);
    transition-delay: .7s;
    
    @media (max-width: ${theme.media.tabSm}) {
      height: 70px;
    }
  }
  
  &:nth-child(1) a {
      transition: 0.5s all cubic-bezier(0.85, 0.01, 0.2, 0.99);
      transition-delay: 0.25s;

      .menu-enter-active & {
        transition: .6s transform cubic-bezier(.85,.01,.2,.99);
        transition-delay: .8s;
      }
      .menu-enter-done & {
        transition: .6s transform cubic-bezier(.85,.01,.2,.99);
        transition-delay: .8s;
      }
  }

  &:nth-child(2) a {
    transition: 0.7s all cubic-bezier(0.85, 0.01, 0.2, 0.99);
    transition-delay: 0.25s;

    .menu-enter-active & {
      transition: .8s transform cubic-bezier(.85,.01,.2,.99);
      transition-delay: .8s;
    }
    .menu-enter-done & {
      transition: .8s transform cubic-bezier(.85,.01,.2,.99);
      transition-delay: .8s;
    }
  }


  a {
    display: flex;

    font-size: 80px;
    color: white;
    font-family: ${theme.fonts.bebasB};

    @media (max-width: ${theme.media.tabSm}) {
      font-size: 50px;
    }

    .menu-enter & {
      transform: translateY(0%);
    }
    .menu-enter-done & {
      transform: translateY(0%);
    }
    .menu-exit-active & {
      transform: translateY(150%);
    }
    .menu-exit-done & {
      transform: translateY(150%);
    }
  }

  &:after {
    margin-left: -100%;
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    transition: 0.4s all;
    margin-top: 7px;
  }

  &:last-child:after {
    margin-top: 9px;
  }

  &:last-child {
    margin-bottom: 50px;
  }

  i {
    color: #2aa76f;
    font-size: 3vh !important;
    margin-right: 20px;
    opacity: 0;
  }

  @media (max-width: ${theme.media.tabSm}) {
    margin: 0 auto 35px auto;
    padding: 0 20px;
  }
`;

const linksArray = [
  {link: "", text: "Домой"},
  {link: "catalog", text: "Каталог"},
];

const Menu = () => {
  const {menuOpened} = useSelector(settingsSelector);
  const dispatch = useAppDispatch();

  const onClickLink = () => {
    dispatch(setMenuOpened(false));
  };

  return (
    <CSSTransition in={menuOpened} classNames={'menu'} timeout={1100} unmountOnExit>
      <MenuEl>
      <Overlay
        className="overlay"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill={"#1aa085"}
      >
        <path
          className="js-overlay-path"
          vectorEffect="non-scaling-stroke"
          d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
        />
      </Overlay>
      <List>
        {linksArray.map((item, index) => (
          <ListItem key={index}>
            <span onClick={onClickLink}>
              <Link href={`/${item.link}`}>
                  {item.text}
              </Link>
            </span>
          </ListItem>
        ))}
      </List>
    </MenuEl>
    </CSSTransition>
  );
}

export default Menu;