import React from "react";
import {useRouter} from 'next/router'
import Link from "next/link";
import styled from "styled-components";
import {useSelector} from 'react-redux'
import dynamic from "next/dynamic";
import {setCookie} from "nookies";

import {cartSelector} from "../../features/cart/cartSlice";
import {setMenuOpened, setShowAuthModal, setShowCart, settingsSelector} from "../../features/settings/settingsSlice";
import theme from "../../styles/theme";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {BackButton} from "../../components/index";
import useWindowDimensions from "../../@hooks/useWindowDimensions";
import {selectUserData, setUserData} from "../../features/user/userSlice";
import Logo from "../Logo";
import Indicator from "../Indicator";
import SignOutIco from '../../public/svg/signout.svg'
import UserIco from '../../public/svg/user.svg'
import CartIco from '../../public/svg/cart.svg'

const HeaderEl = styled.header<{ isHidden: boolean }>`
  position: fixed;
  z-index: 11;
  left: 0;
  right: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  margin: auto;
  padding: 0 80px;

  ${(props) => props.isHidden && "opacity: 0;"}

  transition: 0.7s opacity;
  transition-timing-function: cubic-bezier(0.85, 0.01, 0.2, 0.99);

  @media (max-width: 1600px) {
    padding: 0 5vw;
  }
  @media (max-width: ${theme.media.tab}) {
    width: 92%;
    padding: 0;
  }
  @media (max-width: ${theme.media.mob}) {
    width: 100%;
    height: 80px;
    padding: 0 24px;
  }
`;
const MenuButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;

  cursor: pointer;
`;
const MenuButton = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 18px;
  height: auto;

  color: ${theme.colors.darkBlue};

  cursor: pointer;
  background: transparent;
  border: unset;

  ${(props) =>
          props.isActive
                  ? `animation: toggleMobileButtonA 1s forwards;`
                  : `animation: toggleMobileButtonB 1s forwards;`}
  span {
    display: flex;
    width: 100%;
    height: 2px;
    border-radius: 10px;
    background-color: white;
    margin-top: 7px;

    &:nth-child(1) {
      width: 50%;
      margin: 0 auto 0 0;
      ${(props) =>
              props.isActive
                      ? `animation: toggleFirstLineA 1.5s forwards;`
                      : `animation: toggleFirstLineB 1.5s forwards;`}
    }

    &:nth-last-child(1) {
      width: 50%;
      margin-left: auto;
      ${(props) =>
              props.isActive
                      ? `animation: toggleThirdLineA 1.5s forwards;`
                      : `animation: toggleThirdLineB 1.5s forwards;`}
    }
  }

  @keyframes toggleMobileButtonA {
    0% {
      transform-origin: center;
      transition: 0.2s all;
      transform: rotate(0deg);
    }
    36% {
      transform-origin: center;
      transition: 0.2s all;
      transform: rotate(0deg);
    }
    60% {
      transform-origin: center;
      transition: 0.2s all;
      transform: rotate(-53deg);
    }
    100% {
      transform-origin: center;
      transition: 0.2s all;
      transform: rotate(-45deg);
    }
  }
  @keyframes toggleMobileButtonB {
    0% {
      transform-origin: center;
      transition: 0.2s all;
      transform: rotate(-45deg);
    }
    36% {
      transform-origin: center;
      transition: 0.2s all;
      transform: rotate(-53deg);
    }
    60% {
      transform-origin: center;
      transition: 0.2s all;
      transform: rotate(0deg);
    }
    100% {
      transform-origin: center;
      transition: 0.2s all;
      transform: rotate(0deg);
    }
  }
  @keyframes toggleFirstLineA {
    10% {
      transform-origin: right;
      transition: 0.3s all;
      transform: rotate(9deg);
    }
    13% {
      transform-origin: right;
      transition: 0.3s all;
      transform: rotate(9deg);
    }
    35% {
      transform-origin: right;
      transition: 0.6s all;
      transform: rotate(-90deg);
    }
    100% {
      transform-origin: right;
      transition: 0.6s all;
      transform: rotate(-90deg);
    }
  }
  @keyframes toggleFirstLineB {
    0% {
      transform-origin: right;
      transition: 0.6s all;
      transform: rotate(-90deg);
    }
    30% {
      transform-origin: right;
      transition: 0.6s all;
      transform: rotate(-90deg);
    }
    50% {
      transform-origin: right;
      transition: 0.3s all;
      transform: rotate(9deg);
    }
    65% {
      transform-origin: right;
      transition: 0.3s all;
    }
    100% {
      transform-origin: right;
      transition: 0.3s all;
      transform: rotate(0deg);
    }
  }
  @keyframes toggleThirdLineA {
    10% {
      transform-origin: left;
      transition: 0.3s all;
      transform: rotate(9deg);
    }
    13% {
      transform-origin: left;
      transition: 0.3s all;
      transform: rotate(9deg);
    }
    35% {
      transform-origin: left;
      transition: 0.6s all;
      transform: rotate(-90deg);
    }
    100% {
      transform-origin: left;
      transition: 0.6s all;
      transform: rotate(-90deg);
    }
  }
  @keyframes toggleThirdLineB {
    0% {
      transform-origin: left;
      transition: 0.6s all;
      transform: rotate(-90deg);
    }
    30% {
      transform-origin: left;
      transition: 0.6s all;
      transform: rotate(-90deg);
    }
    50% {
      transform-origin: left;
      transition: 0.3s all;
      transform: rotate(9deg);
    }
    65% {
      transform-origin: left;
      transition: 0.3s all;
      transform: rotate(0deg);
    }
    100% {
      transform-origin: right;
      transition: 0.3s all;
      transform: rotate(0deg);
    }
  }
`;
const Side = styled.div`
  display: flex;
  align-items: center;
  gap: 35px;
  padding: 0px 27px 0 12px;

  background: ${theme.colors.darkBlue};
  border-radius: 20px;

  @media (max-width: ${theme.media.tabSm}) {
    gap: 30px;
    padding: 0;

    background: transparent;
    border-radius: 0;
  }
  @media (max-width: ${theme.media.mobSm}) {
    gap: 25px;
  }
`;
const LogoWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;

  width: max-content;
  margin: auto;
`
const CartButton = styled.button`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;

  cursor: pointer;

  i {
    color: #ffffff;
  }

  @media (max-width: ${theme.media.tab}) {
    color: #ffffff;
    background: transparent;

    svg {
      width: 30px;
      height: 30px;
    }

    i {
      font-size: 20px;
    }
  }
  @media (max-width: ${theme.media.mobSm}) {
    svg {
      width: 25px;
      height: 25px;
    }
  }
`;
const UserButton = styled.button`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;

  cursor: pointer;

  i {
    color: #ffffff;
  }

  @media (max-width: ${theme.media.tab}) {
    color: #ffffff;
    background: transparent;

    i {
      font-size: 20px;
    }
  }
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;

  @media (max-width: ${theme.media.tabSm}) {
    gap: 6px;
  }`
const UserWrapper = styled.a`
  display: flex;
  align-items: center;
  gap: 13px;

  text-transform: capitalize;
  font-size: 14px;
  font-family: ${theme.fonts.dinCondM};
  cursor: pointer;

  margin: 0 0 0 10px;

  @media (max-width: ${theme.media.tabSm}) {
    margin: 0 0 0 5px;
  }

  span {
    @media (max-width: ${theme.media.tabSm}) {
      display: none;
    }
  }
`
const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 27px;
  height: 27px;
  padding: 1px 0 0px;

  font-size: 14px;
  font-family: ${theme.fonts.dinCondM};
  position: relative;

  color: #FFFFFF;

  border-radius: 50%;
  border: 1px solid ${theme.colors.green};
  background: rgba(27, 188, 155, .2);

  @media (max-width: ${theme.media.tabSm}) {
    width: 34px;
    height: 34px;

    font-size: 16px;
  }
  @media (max-width: ${theme.media.mobSm}) {
    width: 27px;
    height: 27px;

    font-size: 14px;
  }
`
const Exit = styled.button`
  display: flex;

  color: #888;
  border-radius: 5px;
  font-size: 12px;

  @media (max-width: ${theme.media.tabSm}) {
    display: none;
    padding: 0;

    font-size: 12px;
    color: #FFF;

    border: unset;
  }

  span {
    display: none;
  }

  //i {
  //  margin: 0 0 0 3px;
  //}
`
const IndicatorWrapper = styled.div`
  position: absolute;
  right: -9px;
  top: 17px;

  @media (max-width: ${theme.media.tabSm}) and (min-width: ${theme.media.mobSm}) {
    right: -12px;
  }
`
const SignOutIcon = styled.svg`
  width: 15px;
  height: 15px;

  fill: #AAAAAA;

  transform: rotate(180deg) translateY(-1px);
`
const UserIcon = styled.svg`
  width: 17px;
  height: 17px;

  fill: #FFFFFF;
`
const CartIcon = styled.svg`
  width: 25.5px;
  height: 25.5px;

  fill: #FFFFFF;
`

const DynamicMenu = dynamic(() => import(/*webpackChunkName: "Menu_DYNAMIC_IMPORT"*/'../Menu'))
const DynamicCartModal = dynamic(() => import(/*webpackChunkName: "CartModal_DYNAMIC_IMPORT"*/'../CartModal'))
const DynamicAuthModal = dynamic(() => import(/*webpackChunkName: "AuthModal_DYNAMIC_IMPORT"*/'../AuthModal'))

const Header: React.FC = () => {
  const {totalCount} = useSelector(cartSelector);
  const {menuOpened, previewSubmitHovered, showCart, showAuthModal} = useSelector(settingsSelector);
  const dispatch = useAppDispatch();
  const router = useRouter()
  const {width} = useWindowDimensions();
  const userData = useAppSelector(selectUserData);

  const onClickExitUser = () => {
    setCookie(null, 'proteinUserToken', '', {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    })
    dispatch(setUserData(null));
  }
  const onClickMenuButton = () => {
    dispatch(setMenuOpened(!menuOpened));
  };
  const onClickCartButton = () => {
    dispatch(setShowCart(true));
  };
  const onClickUserButton = () => {
    dispatch(setShowAuthModal(true));
  };

  return (

    <HeaderEl className={"js-header"} isHidden={previewSubmitHovered}>
      <MenuButtonWrapper onClick={onClickMenuButton}>
        <MenuButton isActive={menuOpened}>
          <span></span>
          <span></span>
          <span></span>
        </MenuButton>
      </MenuButtonWrapper>
      {(router.pathname === `/card/[id]` || router.pathname === `/cart`) && width && width > 1280 && (<BackButton/>)}
      <LogoWrapper>
        <Logo text={'PS'} type={'link'} href={'/'}/>
      </LogoWrapper>
      <Side>
        <CartButton onClick={onClickCartButton}>
          <IndicatorWrapper>
            <Indicator count={totalCount}/>
          </IndicatorWrapper>
          <CartIcon as={CartIco}/>
        </CartButton>
        {userData
          ? <User>
            <Link href={"/profile"}>
              <UserWrapper>
                <Avatar>{userData.fullName.slice(0, 1)}</Avatar>
                <span>
                {userData.fullName.split(' ')[0]}
              </span>
              </UserWrapper>
            </Link>
            <Exit onClick={onClickExitUser}>
              <span>
                Выйти
              </span>
              <SignOutIcon as={SignOutIco}/>
            </Exit>
          </User>
          : <UserButton onClick={onClickUserButton}>
            <UserIcon as={UserIco}/>
          </UserButton>}
      </Side>
      <DynamicMenu/>
      <DynamicCartModal selector='#modal-root'/>
      <DynamicAuthModal selector='#modal-root'/>
    </HeaderEl>
  );
}

export default Header;