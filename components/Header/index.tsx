import React from "react";
import styled from "styled-components";
import {useSelector} from 'react-redux'
import {cartSelector} from "../../features/cart/cartSlice";
import theme from "../../styles/theme";
import {AuthModal, CartModal, Menu} from "../";
import {gsap} from "gsap";
import Logo from "../Logo";
import {setMenuOpened, setShowAuthModal, setShowCart, settingsSelector} from "../../features/settings/settingsSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {BackButton} from "../../components/index";
import {useRouter} from 'next/router'
import useWindowDimensions from "../../@hooks/useWindowDimensions";
import {selectUserData, setUserData} from "../../features/user/userSlice";
import Link from "next/link";
import {setCookie} from "nookies";

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
  padding: 0px 28px 0 12px;

  background: ${theme.colors.darkBlue};
  border-radius: 20px;

  @media (max-width: ${theme.media.tabSm}) {
    gap: 25px;
    padding: 0;

    background: transparent;
    border-radius: 0;
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

    i {
      font-size: 20px;
    }
  }
`;
const CartIndicator = styled.span`
  position: absolute;
  right: -8px;
  top: 17px;

  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 19px;
  height: 14px;
  padding-top: 1px;

  font-family: ${theme.fonts.bebasB};
  font-size: 11px;
  color: ${theme.colors.darkBlue};

  cursor: pointer;
  background: ${theme.colors.green};
  border-radius: 3px;

  &::before {
    content: '';

    position: absolute;
    left: -6px;
    top: 0;
    bottom: 0;

    width: 0;
    height: 0;
    margin: auto;

    border: 3px solid transparent;
    border-right-color: ${theme.colors.green};
  }

  @media (max-width: ${theme.media.tab}) {
    padding-top: 1px;
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

export const Header: React.FC = () => {
  const {totalCount} = useSelector(cartSelector);
  const {menuOpened, previewSubmitHovered} = useSelector(settingsSelector);
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
    menuOpened ? closeMenu() : openMenu();
  };
  const onClickCartButton = () => {
    dispatch(setShowCart(true));
  };
  const onClickUserButton = () => {
    dispatch(setShowAuthModal(true));
  };
  let isAnimating = false;

  const openMenu = () => {
    if (isAnimating) return;

    const overlayPath = document.querySelector(".js-overlay-path");
    isAnimating = true;

    gsap
      .timeline({
        onComplete: (): void => {
          isAnimating = false
        },
      })
      .set(overlayPath, {
        attr: {d: "M 0 100 V 100 Q 50 100 100 100 V 100 z"},
      })
      .to(
        overlayPath,
        {
          duration: 0.8,
          ease: "power4.in",
          attr: {d: "M 0 100 V 50 Q 50 0 100 50 V 100 z"},
        },
        0
      )
      .to(overlayPath, {
        duration: 0.3,
        ease: "power2",
        attr: {d: "M 0 100 V 0 Q 50 0 100 0 V 100 z"},
        onComplete: () => {
        },
      });
  };
  const closeMenu = () => {
    if (isAnimating) return;
    isAnimating = true;

    const overlayPath = document.querySelector(".js-overlay-path");

    gsap
      .timeline({
        onComplete: (): void => {
          isAnimating = false
        },
      })
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
    <HeaderEl className={"js-header"} isHidden={previewSubmitHovered}>
      <MenuButtonWrapper onClick={onClickMenuButton}>
        <MenuButton isActive={menuOpened}>
          <span></span>
          <span></span>
          <span></span>
        </MenuButton>
      </MenuButtonWrapper>
      {(router.pathname === `/card/[id]` || router.pathname === `/cart`) && width && width > 1200 && (<BackButton/>)}
      <LogoWrapper>
        <Logo text={'PS'} type={'link'} href={'/'}/>
      </LogoWrapper>
      <Side>
        <CartButton onClick={onClickCartButton}>
          <CartIndicator>{totalCount}</CartIndicator>
          <i className="fal fa-shopping-bag"></i>
        </CartButton>
        {router.pathname !== `/profile` && (
          <>
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
                  <i className="fal fa-sign-out"></i>
                </Exit>
              </User>
              : <UserButton onClick={onClickUserButton}>
                <i className="fal fa-user"></i>
              </UserButton>}
          </>)
        }

      </Side>
      <Menu/>
      <CartModal selector='#modal-root'/>
      <AuthModal selector='#modal-root'/>
    </HeaderEl>
  );
}
