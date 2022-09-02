import React, {useEffect} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import { CSSTransition } from 'react-transition-group';

import {setShowCart, settingsSelector} from "../../features/settings/settingsSlice";
import {cartSelector} from '../../features/cart/cartSlice'
import {setItems} from '../../features/cart/cartSlice'
import {useAppDispatch} from "../../app/hooks";
import {getCartFromLS} from "../../utils/getCartFromLS";
import {CardB, ClientOnlyPortal} from "../index";
import theme from "../../styles/theme";
import Logo from "../Logo";
import Button from "../Button";

const Wrapper = styled.div`
  position: fixed;
  z-index: 110;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;
`;
const Footer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 26px;

  background: ${theme.colors.darkBlue};
  border-radius: 24px;
`;
const Cart = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 260px;
  height: max-content;
  max-height: calc(100% - 80px);
  margin: auto 30px auto;

  color: black;

  border-radius: 26px;
  transform: translateX(150%);

  transition: 0.7s transform;
  transition-timing-function: cubic-bezier(0.85, 0.01, 0.2, 0.99);

  .cart-modal-enter & {
    transform: translateX(150%);
  }
  .cart-modal-enter-active & {
    transform: translateX(0%);
  }
  .cart-modal-enter-done & {
    transform: translateX(0%);
  }
  .cart-modal-exit & {
    transform: translateX(0%);
  }
  .cart-modal-exit-active & {
    transform: translateX(150%);
  }

  @media (max-width: ${theme.media.mob}) {
    max-height: calc(100% - 110px);
  }
`;
const List = styled.ul`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: max-content;
  margin: 0 0 20px 0;
  padding: 15px;

  background: #1bbc9b;
  border-radius: 26px;

  &::-webkit-scrollbar {
    display: none;
  }

  li {
    margin: 0 0 15px 0;

    &:nth-last-child(1) {
      margin: 0;
    }
  }
`;
const LogoWrapper = styled.div`
  position: absolute;
  z-index: 2;
  top: -18px;
  left: 0;
  right: 0;

  width: max-content;
  margin: auto;
`;
const LogoEmptyWrapper = styled.div`
  width: max-content;
  padding: 104px 0;
`;
const Overflow = styled.div`
  width: 100%;
  height: 100%;

  cursor: pointer;

  transition: 0.7s background-color;
  transition-timing-function: cubic-bezier(0.85, 0.01, 0.2, 0.99);

  .cart-modal-enter-active & {
    background: rgba(0, 0, 0, 0.9);
  }
  .cart-modal-enter-done & {
    background: rgba(0, 0, 0, 0.9);
  }
  .cart-modal-exit & {
    background: rgba(0, 0, 0, 0.9);
  }
  .cart-modal-exit-active & {
    background: rgba(0, 0, 0, 0);
  }
`;
const Total = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 15px;

  color: ${theme.colors.green};
`;
const Br = styled.div`
  display: flex;
  width: 100%;
  height: 1px;
  width: 100%;
  margin: 13px 0 23px 0;

  background: ${theme.colors.green};
  border: unset;
`
const Amount = styled.strong`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin: 0 0 10px 0;

  font-weight: unset;
  font-family: ${theme.fonts.dinCondM};
  font-size: ${theme.fontSize} * 1.4;

  b {
    font-size: 21px;
  }
`;

interface CartModalProps {
  selector: string
}

const CartModal: React.FC<CartModalProps> = ({selector}) => {
  const {items, totalPrice, totalCount} = useSelector(cartSelector);
  const {showCart} = useSelector(settingsSelector);
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);

  useEffect(() => {
    dispatch(setItems({goods: getCartFromLS().items}))
  }, [])

  React.useEffect(() => {
    if (isMounted.current) {
      const cart = {
        items,
        totalPrice,
        totalCount
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    isMounted.current = true;
  }, [items])

  const onClickShowCartButton = () => {
    dispatch(setShowCart(!showCart));
  };

  return (
    <ClientOnlyPortal selector={selector}>
      <CSSTransition in={showCart} classNames={'cart-modal'} timeout={700} unmountOnExit>
        <Wrapper className={"js-cart-wrapper"}>
        <Overflow onClick={onClickShowCartButton}/>
        <Cart>
          <List>
            {totalCount > 0 ? (
              <>
                <LogoWrapper>
                  <Logo text={"Корзина"} theme={"lined-dark"}/>
                </LogoWrapper>
                {items.map((goods, index) => (
                  <li key={index}>
                    <CardB {...goods} />
                  </li>
                ))}
              </>
            ) : (
              <LogoEmptyWrapper>
                <Logo text={"Корзина пуста"} theme={"lined-dark"}/>
              </LogoEmptyWrapper>
            )}
          </List>
          <Footer>
            <Total>
              <Amount>
                <span>Цена:</span>
                {totalPrice} Р
              </Amount>
              <Amount>
                <span>Доставка:</span>
                {totalCount === 0 ? 0 : 350} Р
              </Amount>
              <Br/>
              <Amount>
                <span>Подытог:</span>
                <b>
                  {totalCount === 0 ? (`0 Р`) : (`${totalPrice} Р`)}
                </b>
              </Amount>
            </Total>
            {totalCount === 0
              ?
              (<div onClick={onClickShowCartButton}>
                <Button theme={'green-border'} text={"Закрыть"} fullwidth={true}/>
              </div>)
              :
              (<div onClick={onClickShowCartButton}>
                <Button type={"link"} href={'/cart'} theme={'green-border'} text={"В корзину"} fullwidth={true}/>
              </div>)
            }
          </Footer>
        </Cart>
      </Wrapper>
      </CSSTransition>
    </ClientOnlyPortal>
  )
}

export default CartModal;