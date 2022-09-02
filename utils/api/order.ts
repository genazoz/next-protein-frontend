import {AxiosInstance} from "axios";
import {CreateOrderDto, OrderItem, ResponseOrder} from "./types";

export const OrderApi = (instance: AxiosInstance) => ({
  async create(dto: CreateOrderDto) {
    const {data} = await instance.post<ResponseOrder>(
      `/orders`,
      dto
    );
    return data;
  },
  async findByUser() {
    const {data} = await instance.get<{ data: OrderItem[] }>(`/orders`);
    return data;
  },
});
