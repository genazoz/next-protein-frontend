import React from "react";

import styled from "styled-components";
import theme from "../../styles/theme";
import Link from "next/link";
import {gsap} from "gsap";
import {useSelector} from "react-redux";
import {settingsSelector} from "../../features/settings/settingsSlice";
import {useAppDispatch} from "../../app/hooks";
import {setMenuOpened} from "../../features/settings/settingsSlice";
import useWindowDimensions from '../../@hooks/useWindowDimensions';

const MenuEl = styled.div<{ isShow: boolean }>`
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

  ${(props) => props.isShow && `pointer-events: all; opacity: 1`}
`;
const Overlay = styled.svg`
  grid-area: 1 / 1 / 2 / 2;
  position: absolute;
  z-index: -1;
  pointer-events: none;
  width: 100%;
  height: 100%;
`;
const Strips = styled.ul`
  position: absolute;
  z-index: -1;

  overflow: hidden;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  transform: skewX(-45deg);
  display: none;
`;
const Strip = styled.li<{ isShow: boolean }>`
  display: flex;
  width: 3px;
  margin: auto 0 auto 13vh;

  background: ${theme.colors.darkBlue};

  transition: 0.8s height cubic-bezier(0.85, 0.01, 0.2, 0.99);
  transition-delay: 0.1s;

  &:first-child {
    margin-left: 1vh;
  }

  ${(props) =>
  props.isShow
    ? `transition-delay: .7s; height: 100%;`
    : `transition: .6s height cubic-bezier(0.85, 0.01, 0.2, 0.99);height: 0%;`}
`;
const List = styled.ul`
  width: 82%;
  height: auto;
  margin: auto;
`;
const ListItem = styled.li<{ isShow: boolean }>`
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

  ${(props) =>
  props.isShow &&
  `height: 100px;
     padding: 3px 30px 0px 30px;
  
     opacity: 1;
     box-shadow: 0 0 0 5px #1abc9c, 0 0 0 10px white;
     
     transition: 0.6s height cubic-bezier(0.85, 0.01, 0.2, 0.99), 0.6s padding cubic-bezier(0.85, 0.01, 0.2, 0.99), 1.4s box-shadow cubic-bezier(0.85, 0.01, 0.2, 0.99);
     transition-delay: .7s;
      @media (max-width: ${theme.media.tabSm}) {
        height: 70px;
      }
    `};
  &:nth-child(1) {
    a {
      transition: 0.5s all cubic-bezier(0.85, 0.01, 0.2, 0.99);
      transition-delay: 0.25s;

      ${(props) =>
  props.isShow &&
  `transition: .6s transform cubic-bezier(.85,.01,.2,.99); transition-delay: .7s;`}
    }
  }

  &:nth-child(2) a {
    ${(props) =>
  props.isShow
    ? `transition: .8s transform cubic-bezier(.85,.01,.2,.99);
    transition-delay: .7s;`
    : `transition: 0.7s all cubic-bezier(0.85, 0.01, 0.2, 0.99);
    transition-delay: 0.25s;`}
  }

  &:nth-child(3) a {
    ${(props) =>
  props.isShow
    ? `transition: 1s transform cubic-bezier(.85,.01,.2,.99);
    transition-delay: .7s;`
    : `transition: 0.9s all cubic-bezier(0.85, 0.01, 0.2, 0.99);
      transition-delay: 0.25s;`}
  }

  a {
    display: flex;

    font-size: 80px;
    color: white;
    font-family: ${theme.fonts.bebasB};

    @media (max-width: ${theme.media.tabSm}) {
      font-size: 50px;
    }

    ${(props) =>
  props.isShow
    ? `transform: translateY(0%);`
    : `transform: translateY(150%);`}
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

export const Menu = () => {
  const {menuOpened} = useSelector(settingsSelector);
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();

  const onClickLink = () => {
    dispatch(setMenuOpened(false));
    closeMenu();
  };

  const closeMenu = () => {
    const overlayPath = document.querySelector(".js-overlay-path");

    gsap
      .timeline({})
      // now reveal
      .set(overlayPath, {
        attr: {d: "M 0 100 V 0 Q 50 0 100 0 V 100 z"},
      })
      .to(overlayPath, {
        duration: 0.9,
        ease: "power4.in",
        attr: {d: "M 0 100 V 50 Q 50 100 100 50 V 100 z"},
      })
      .to(overlayPath, {
        duration: 0.3,
        ease: "power2",
        attr: {d: "M 0 100 V 100 Q 50 100 100 100 V 100 z"},
      });
  };

  return (
    <MenuEl isShow={menuOpened}>
      {/*{width && width > 1200 && (<Balls isShow={menuOpened}/>)}*/}
      <Overlay
        className="overlay"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill={"#ccc"}
      >
        <path
          className="js-overlay-path"
          vectorEffect="non-scaling-stroke"
          d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
        />
      </Overlay>
      <Strips>
        <Strip isShow={menuOpened}/>
        <Strip isShow={menuOpened}/>
        <Strip isShow={menuOpened}/>
        <Strip isShow={menuOpened}/>
      </Strips>
      <List>
        {linksArray.map((item, index) => (
          <ListItem key={index} isShow={menuOpened}>
            <span onClick={onClickLink}>
              <Link href={`/${item.link}`}>
                  {item.text}
              </Link>
            </span>
          </ListItem>
        ))}
      </List>
    </MenuEl>
  );
}
