import {GetServerSideProps, NextPage} from "next";
import styled from "styled-components";
import theme from "../styles/theme";
import {Api} from "../utils/api";
import {OrderItem, OrderStatus, ResponseUser} from "../utils/api/types";
import {OrderTable} from "../components";
import {setCookie} from "nookies";
import {setUserData} from "../features/user/userSlice";
import {useAppDispatch} from "../app/hooks";
import Button from "../components/Button";
import React, {useMemo} from "react";
import ProfileInfoCard from "../components/ProfileInfoCard";
import ListFormatIco from '../public/svg/list-format.svg'
import CurrencyRubIco from '../public/svg/currency-rub.svg'
import BoxIco from '../public/svg/box.svg'
import CalendarIco from '../public/svg/calendar.svg'

const Content = styled.div`
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 120px calc(var(--unit) + 180px) 40px calc(var(--unit) + 180px);

  background: #0d0c1c;

  @media (max-width: ${theme.media.tab}) {
    padding: 110px var(--unit) 40px var(--unit);
  }

  transition: .17s background;

  .page-entered &{
    background: #0d0c1c;
  }
  .page-exiting &{
    background: transparent;
  }
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px calc(var(--unit) + 180px) 80px;
  height: max-content;
  flex: 1;

  @media (max-width: ${theme.media.tab}) {
    padding: 40px var(--unit);
  }
`;
const Title = styled.h2`
  width: 100%;
  margin: 0 0 25px;

  font-family: ${theme.fonts.dinCondM};
  font-size: 24px;

  margin: 30px 0 25px;
  opacity: 0;

  transition: .5s margin, .5s opacity;
  transition-delay: .1s;

  .page-entering &{
    margin: 30px 0 0;
    opacity: 0;
  }
  .page-entered &{
    margin: 0 0 25px;
    opacity: 1;
  }
`
const UserPanel = styled.div`
  position: relative;
  
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  margin: 0 0 40px 0;
  padding: 0 0 33px 0;

  &::before {
    content: '';
    
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    
    width: 0%;
    height: 1px;
    margin: 0 auto;
    
    background: #16152d;

    transition: .5s width;
    transition-delay: .1s;

    .page-entering &{
      width: 0%;
    }
    .page-entered &{
      width: 100%;
    }
  }
  
  @media (max-width: ${theme.media.tabSm}) {  
    display: flex;
    flex-direction: column;
    padding: 0 0 50px 0;
    gap: 50px;
  }
`
const Avatar = styled.div`
  position: relative;

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
  padding: 1px 0 0px;

  font-size: 38px;
  font-family: ${theme.fonts.dinCondM};
  color: #FFFFFF;

  border-radius: 50%;
  border: 2px solid ${theme.colors.green};
  background: rgba(27, 188, 155, .2);

  @media (max-width: ${theme.media.tabSm}) {
    width: 95px;
    height: 95px;

    font-size: 50px;
  }
`
const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  margin: 30px 0 0;
  opacity: 0;

  transition: .5s margin, .5s opacity;
  transition-delay: .1s;

  .page-entering &{
    margin: 30px 0 0;
    opacity: 0;
  }
  .page-entered &{
    margin: 0 0 0;
    opacity: 1;
  }

  @media (max-width: ${theme.media.tabSm}) {
    flex-direction: column;
  }
`
const UserInfoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`
const Name = styled.span`
  font-family: ${theme.fonts.dinCondM};
  font-size: 22px;
  color: #FFFFFF;

  @media (max-width: ${theme.media.tabSm}) {
    font-size: 30px;
    text-align: center;
  }
`
const Text = styled.span`
  font-family: ${theme.fonts.dinCondM};
  font-size: 15px;
  color: #a5a5a5;

  @media (max-width: ${theme.media.tabSm}) {
    width: 250px;
    margin: auto;
    text-align: center;
  }
`
const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;

  @media (max-width: ${theme.media.tabSm}) {
    justify-content: center;
  }
  @media (max-width: ${theme.media.mobSm}) {
    flex-direction: column;
    
    button {
      width: 100%;
    }
  }
`
const InfoCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  width: 100%;
  
  @media (max-width: ${theme.media.desktopSm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${theme.media.mob}) {
    display: flex;
    flex-direction: column;
  }
`
const EmptyTable = styled.span`
  margin: 130px 0 0;
  
  font-family: ${theme.fonts.dinCondM};
  font-size: 22px;
  color: #2a2946;

  opacity: 0;

  transition: .5s margin, .5s opacity;
  transition-delay: .1s;

  .page-entering &{
    margin: 130px 0 0;
    opacity: 0;
  }
  .page-entered &{
    margin: 100px 0 0;
    opacity: 1;
  }
`
const ListFormatIcon = styled.svg`
  width: 15px;
  height: 15px;

  stroke: ${theme.colors.darkBlue};
  fill: ${theme.colors.darkBlue};
`
const CurrencyRubIcon = styled.svg`
  width: 21px;
  height: 21px;
  
  line, path {
    stroke:${theme.colors.darkBlue};
  }
`
const BoxIcon = styled.svg`
  width: 20.5px;
  height: 20.5px;

  fill: ${theme.colors.darkBlue};
  stroke: ${theme.colors.darkBlue};
`
const CalendarIcon = styled.svg`
  width: 17px;
  height: 17px;

  fill: ${theme.colors.darkBlue};
`

const Profile: NextPage<{ userData: ResponseUser, orders: OrderItem[] }> = ({userData, orders}) => {
  const dispatch = useAppDispatch();
  const totalPrice = useMemo(() => orders.reduce((acc, cur) => acc + cur.price, 0), [orders]);
  const countOfPaidGoods = useMemo(() => orders
    .filter(order => order.status === OrderStatus.SUCCESS)
    .reduce((acc, cur) => acc + cur.count, 0), [orders]);
  const registrationDate = useMemo(() => new Date(userData.createdAt).toLocaleDateString('de-DE'), [orders]);

  const onClickExitUser = () => {
    setCookie(null, 'proteinUserToken', '', {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    })
    dispatch(setUserData(null));
  }

  return (
    <Content>
      <Header>
        <UserPanel>
          <UserInfoWrapper>
            <Avatar>
              {userData?.fullName.split('')[0]}
            </Avatar>
            <UserInfoTextWrapper>
              <Name>
                Добрый вечер, {userData?.fullName.split(' ')[0]}!
              </Name>
              <Text>
                Здесь вы можете посмотреть ваши заказы и изменить данные пользователя.
              </Text>
            </UserInfoTextWrapper>
          </UserInfoWrapper>
          <Buttons>
            <Button type={'link'} href={'/catalog'} theme={'dark'} text={"К покупкам"} onClick={onClickExitUser}/>
            <Button theme={'green'} text={"Выйти"}  onClick={onClickExitUser}/>
          </Buttons>
        </UserPanel>
        <Title>
          Данные
        </Title>
        <InfoCards>
          <ProfileInfoCard text={`${orders.length}`}
                           title={'Количество заказов'}
                           icon={<ListFormatIcon as={ListFormatIco}/>}
                           iconColor={'#b4e4c8'}/>
          <ProfileInfoCard text={`${totalPrice} Р`}
                           title={'Сумма всех заказов'}
                           icon={<CurrencyRubIcon as={CurrencyRubIco}/>}
                           iconColor={'#FFD0B1'}/>
          <ProfileInfoCard text={`${countOfPaidGoods}`}
                           title={'Количество купленных товаров'}
                           icon={<BoxIcon as={BoxIco}/>}
                           iconColor={'#d2b1fe'}/>
          <ProfileInfoCard text={`${registrationDate}`}
                           title={'Дата регистрации на сайте'}
                           icon={<CalendarIcon as={CalendarIco}/>}
                           iconColor={'#b1dafd'}/>
        </InfoCards>
      </Header>
      <Wrapper>
        <Title>
          Заказы
        </Title>
        {
          orders.length > 0
            ? <OrderTable orders={orders}/>
            : <EmptyTable>
              Таблица заказов появится после вашего первого заказа
            </EmptyTable>
        }
      </Wrapper>
    </Content>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const userData = await Api(ctx).user.getMe();
    const orders = await Api(ctx).order.findByUser();

    return {
      props: {
        userData,
        orders
      },
    };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      userData: null,
      orders: null
    },
  };
};

export default Profile;