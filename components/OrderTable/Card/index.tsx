import React, {useState} from "react";

import {OrderItem, OrderStatus, ResponseProduct} from "../../../utils/api/types";
import styled from "styled-components";
import {Api} from "../../../utils/api";
import {CardOrder} from "../../CardOrder";
import theme from "../../../styles/theme";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const Status = styled.div<{ statusTheme: 'green' | 'orange' | 'purple' }>`
  width: max-content;
  padding: 4px 14px;

  font-size: 13px;

  border-radius: 20px;

  ${props => props.statusTheme == 'green' && `color: rgba(28, 188, 155); background: rgba(28, 188, 155, .2);`}
  ${props => props.statusTheme == 'orange' && `color: rgba(255, 199, 49); background: rgba(255, 199,49, .2);`}
  ${props => props.statusTheme == 'purple' && `color: rgba(210, 177, 254); background: rgba(210, 177, 254, .2);`}
`
const Count = styled.div`

`
const Price = styled.div`

`
const Data = styled.div`

`
const CardsWrapper = styled.div`
  display: flex;
  gap: 30px;
`
const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;
  width: 100%;

  @media (max-width: ${theme.media.tabSm}) {
    grid-template-columns: repeat(3, 1fr);
  }
`
const Cell = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  &:nth-last-child(1) {
    flex: .3;
    justify-content: flex-end;
  }

  &:nth-last-child(2) {
    flex: .6;
  }

  @media (max-width: ${theme.media.tabSm}) {
    width: 140px;
    flex: unset;
    flex-shrink: 0;
    padding: 0 30px;
  }
`
const ShowProductsButton = styled.button`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  min-width: 30px;
  height: 22px;

  background: rgba(27, 188, 155, .2);
  color: rgba(27, 188, 155, 1);
  border-radius: 7px;
`;

interface OrderCardProps extends OrderItem {
}

export const OrderCard: React.FC<OrderCardProps> = ({id, status, price, count, createdAt}) => {
  const [products, setProducts] = useState<ResponseProduct[] | []>([]);

  const onClickShowProducts = async () => {
    if (products.length !== 0) {
      setProducts([])
      return;
    }

    try {
      const data = await Api().orderProduct.findByOrder(id);
      console.log(data)
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {products.length === 0 &&
        <Wrapper>
          <Cell>
            {id}
          </Cell>
          <Cell>
            <Count>
              {count}
            </Count>
          </Cell>
          <Cell>
            <Price>
              {price}
            </Price>
          </Cell>
          <Cell>
            <Data>
              {new Date(createdAt).toLocaleDateString('pt-PT')}
            </Data>
          </Cell>
          <Cell>
            <Status statusTheme={status === OrderStatus.PROCESS ? 'purple' : 'green'}>
              {status}
            </Status>
          </Cell>
          <Cell>
            <ShowProductsButton onClick={onClickShowProducts}>
              <i className={'far fa-long-arrow-right'}></i>
            </ShowProductsButton>
          </Cell>
        </Wrapper>
      }
      {products.length > 0 &&
        <CardsWrapper>
          <Cards>
            {products.map((goods: any, index: number) => (
              <CardOrder {...goods} key={index}/>
            ))}
          </Cards>
          <ShowProductsButton onClick={onClickShowProducts}>
            <i className={'far fa-long-arrow-right'}></i>
          </ShowProductsButton>
        </CardsWrapper>}
    </>
  );
}
