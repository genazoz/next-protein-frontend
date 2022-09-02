import {AxiosInstance} from "axios";
import {CreateOrderProductDto, OrderItem, ResponseProduct} from "./types";

export const OrderProductApi = (instance: AxiosInstance) => ({
  async create(dto: CreateOrderProductDto) {
    const {data} = await instance.post<{ data: CreateOrderProductDto }>(
      `/order-products`,
      dto
    );
    return data;
  },
  async findByOrder(id: number) {
    const {data} = await instance.get<ResponseProduct[]>(`/order-products/findByOrder/${id}`);
    return data;
  },
});
