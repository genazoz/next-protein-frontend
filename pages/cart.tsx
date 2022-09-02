import React, {useMemo} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {cartSelector, clearItems} from '../features/cart/cartSlice';
import {CardBasket} from '../components'
import Button from '../components/Button'
import theme from "../styles/theme";
import Logo from "../components/Logo";
import {selectUserData} from "../features/user/userSlice";
import {setShowAuthModal} from "../features/settings/settingsSlice";
import {useAppDispatch} from "../app/hooks";
import {Api} from "../utils/api";
import {OrderStatus} from "../utils/api/types";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  margin: 0;
  padding: 130px var(--unit) 60px var(--unit);
  
  @media (max-width: ${theme.media.tabSm}) {
    height: auto;
  }
`;
const Title = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 30px 0 32px 0;

  font-family: ${theme.fonts.dinCondM};
  font-size: 32px;

  opacity: 0;

  transition: .5s margin, .5s opacity;
  transition-delay: .1s;

  .page-entering &{
    margin: 30px 0 32px 0;
    opacity: 0;
  }
  .page-entered &{
    margin: 0 0 32px 0;
    opacity: 1;
  }
`
const Footer = styled.footer`
  position: relative;
  
  display: flex;
  align-items: center;
  width: 100%;
  padding: 40px 0 0;

  background: ${theme.colors.darkBlue};

  &::before {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    width: 100%;
    height: 1px;
    margin: auto;

    background: #201f3d;
  }

  &::after {
    content: '';

    position: absolute;
    z-index: 2;
    bottom: 100%;
    left: 0;
    right: 0;

    width: 100%;
    height: 150px;
    margin: auto;
    
    opacity: 1;
    pointer-events: none;
    background: linear-gradient(to top, ${theme.colors.darkBlue}, transparent);

    @media (max-width: ${theme.media.tabSm}) {
      display: none;
    }
  }
  
  @media (max-width: ${theme.media.tab}) {
    flex-direction: column;
  }
  @media (max-width: ${theme.media.tabSm}) {
    margin: 50px 0 0;
  }
`
const Details = styled.div`
  display: flex;
  width: 100%;
  gap: 60px;

  font-family: ${theme.fonts.dinCondM};
  font-size: 18px;

  span {
    display: flex;
    flex-direction: column-reverse;
    gap: 2px;
  }

  b {
    color: ${theme.colors.green};
    font-size: 28px;
  }

  @media (max-width: ${theme.media.tab}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: max-content;
  gap: 20px;

  @media (max-width: ${theme.media.tab}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    margin: 45px 0 0;

    button {
      width: 100%;
    }
  }
  @media (max-width: 390px) {
    display: flex;
    flex-direction: column;
  }
`
const ErrorInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: max-content;
  margin: auto;
  padding: 60px 0 120px 0;

  @media (max-width: ${theme.media.tabMd}) {
    position: relative;

    order: 0;
    margin: 20px auto;
  }

  span {
    display: block;
    width: auto;
    padding: 0 70px;

    font-family: ${theme.fonts.bebasB};
    font-size: 80px;
    color: white;

    background: ${theme.colors.darkBlue};
    border: 10px solid ${theme.colors.green};
    box-shadow: 0 0 0 10px white;
    transform: skew(-10deg) rotate(-10deg);

    @media (max-width: ${theme.media.mob}) {
      padding: 8px 8px 2px 8px;

      font-size: 40px;
    }
  }
`;
const Items = styled.div`
  overflow-y: auto;
  
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 0 0 auto;
  padding: 0 0 70px;

  @media (max-width: ${theme.media.desktopSm}) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 22px;
    padding: 0;

    background: transparent;
    border-radius: unset;
  }

  @media (max-width: ${theme.media.tabMd}) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (max-width: ${theme.media.tabSm}) {
    overflow-y: unset;
  }
`
const CardWrapper = styled.div`
  margin: 30px 0 0;
  
  opacity: 0;

  transition: .5s margin, .5s opacity;
  transition-delay: .1s;

  .page-entering &{
    margin: 30px 0 0;
    opacity: 0;
  }
  .page-entered &{
    margin: 0;
    opacity: 1;
  }
`

function CartPage() {
  const {items, totalPrice, totalCount} = useSelector(cartSelector);
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectUserData);
  const deliveryPrice = 650;
  const resultPrice = useMemo(() => totalPrice > 5000 ? totalPrice : totalPrice + deliveryPrice, [totalPrice]);

  const onClickClear = () => {
    dispatch(clearItems());
  }

  const onClickOrderButton = async () => {
    try {
      const data = await Api().order.create({
        status: OrderStatus.PROCESS,
        price: resultPrice,
        count: totalCount,
      })

      items.map(async product => {
        await Api().orderProduct.create({
          title: product.title,
          imageUrl: product.imageUrl,
          category: product.category,
          price: product.price,
          prodId: product.id,
          orderId: data.id,
        })
      })


      dispatch(clearItems());
    } catch (err) {
      console.warn("Order error", err);
    }
  }

  return (
    <Section>
      <Wrapper>
        {items.length > 0 ? (
          <>
            <Title>
              Корзина
            </Title>
            <Items>
              {items.map((goods: any, index: number) => (
                <CardWrapper key={index}>
                  <CardBasket {...goods}/>
                </CardWrapper>
              ))}
            </Items>
            <Footer>
              <Details>
                <span> Товаров <b>{totalCount} шт.</b> </span>
                <span> Сумма заказа <b>{totalPrice} Р</b> </span>
                <span> Доставка <b>{totalPrice > 5000 ? 'Бесплатно' : '650 Р'}</b> </span>
                <span> Итого <b>{resultPrice} Р</b> </span>
              </Details>
              <Buttons>
                {
                  isAuth
                    ? <Button theme={'green'} text={"Оплатить сейчас"} onClick={onClickOrderButton} />
                    : <Button theme={'green'} text={"Оплатить сейчас"} onClick={() => dispatch(setShowAuthModal(true))} />
                }
                <span onClick={onClickClear}>
                  <Button theme={'green-border'} text={"Очистить корзину"}/>
                </span>
              </Buttons>
            </Footer>
          </>
        ) :
            <>
              <Title>
                Корзина
              </Title>
              <ErrorInfo>
                <Logo text={'Корзина пуста'}></Logo>
              </ErrorInfo>
              <Footer>
                <Details>
                  <span> Товаров <b>Не добавлены</b> </span>
                  <span> Сумма заказа <b>0 Р</b> </span>
                </Details>
                <Buttons>
                  <Button type={'link'} href={'catalog'} theme={'green'} text={"Перейти в каталог"}/>
                </Buttons>
              </Footer>
            </>
          }
      </Wrapper>
    </Section>
  );
}

export default CartPage;