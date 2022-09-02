import React from "react";

import {OrderItem} from "../../utils/api/types";
import styled from "styled-components";
import theme from "../../styles/theme";
import {OrderCard} from "./Card";

const TableWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  max-width: 100%;
  width: 100%;
`
const Table = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  min-width: 100%;
  width: max-content;
  margin: 30px 0 0;
  
  font-family: ${theme.fonts.dinCondM};

  border: 1px solid #1d1b3e;
  border-radius: 20px;
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
`
const Thead = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 18px 30px;

  color: #929292;

  border-bottom: 1px solid #1d1b3e;
`
const Tbody = styled.div``
const Th = styled.div`
  flex: 1;

  &:nth-last-child(1) {
    flex: .3;
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
const Td = styled.div`
  padding: 24px 30px;
  border-bottom: 1px solid #1d1b3e;

  &:nth-last-child(1) {
    border-bottom: unset;
  }
`

interface OrderCardProps {
  orders: OrderItem[]
}

export const OrderTable: React.FC<OrderCardProps> = ({orders}) => {
  return (
    <TableWrapper>
      <Table>
        <Thead>
          <Th>
            Номер
          </Th>
          <Th>
            Количество товаров
          </Th>
          <Th>
            Цена
          </Th>
          <Th>
            Дата создания
          </Th>
          <Th>
            Статус
          </Th>
          <Th>
          </Th>
        </Thead>
        <Tbody>
          {orders.map(order =>
            <Td key={order.id}>
              <OrderCard {...order}/>
            </Td>
          )}
        </Tbody>
      </Table>
    </TableWrapper>
  );
}
