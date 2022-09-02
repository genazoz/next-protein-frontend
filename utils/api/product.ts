import {AxiosInstance} from "axios";
import {ResponseMeta, ResponseProduct} from "./types";

export const ProductApi = (instance: AxiosInstance) => ({
  async getPaginate(limit: number, page: number, query?: string, categories?: string) {
    const categoriesQuery = categories ? `&categories=${categories}` : '';
    const titleQuery = query ? `&title=${query}` : '';
    const {data} = await instance.get<{items: ResponseProduct[], meta: ResponseMeta}>(`/products?limit=${limit ? limit : 24}&page=${page ? page : 1}${titleQuery}${categoriesQuery}`);
    return {...data};
  },
  async getOne(id: number) {
    const {data} = await instance.get<{ data: ResponseProduct }>(`/products/${id}`);
    return data;
  },
});
