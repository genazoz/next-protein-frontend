import Cookies, {parseCookies} from "nookies";
import {GetServerSidePropsContext, NextPageContext,} from "next";
import axios from "axios";
import {ProductApi} from "./product";
import {UserApi} from "./user";
import {OrderApi} from "./order";
import {OrderProductApi} from "./order-product";

export type ApiReturnType = {
  product: ReturnType<typeof ProductApi>;
  user: ReturnType<typeof UserApi>;
  order: ReturnType<typeof OrderApi>;
  orderProduct: ReturnType<typeof OrderProductApi>;
};

export const Api = (
  ctx?: NextPageContext | GetServerSidePropsContext
): ApiReturnType => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const token = cookies.proteinUserToken;   // proteinToken - чтобы токены не повторялись именами token

  const instance = axios.create({
    baseURL: 'http://77.222.54.210:5000/',
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return {
    product: ProductApi(instance),
    user: UserApi(instance),
    order: OrderApi(instance),
    orderProduct: OrderProductApi(instance),
  };
};
