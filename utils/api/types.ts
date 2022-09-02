export interface ResponseProduct {
  id: number;
  title: string;
  imageUrl: string;
  category: number;
  price: number;
};

export interface ResponseOrderProduct {
  id: number;
  title: string;
  imageUrl: string;
  category: number;
  prodId: number;
  price: number;
};

export interface CreateOrderProductDto {
  title: string;
  imageUrl: string;
  category: number;
  price: number;
  prodId: number;
  orderId: number;
};

export type ResponseMeta = {
  totalItems: number,
  itemCount: number,
  itemsPerPage: number,
  totalPages: number,
  currentPage: number
}

export type ResponseUser = {
  id: number;
  token: string;
  email: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type CreateUserDto = {
  fullName: string;
} & LoginDto;

export enum OrderStatus {
  PROCESS = 'В обработке',
  SUCCESS = 'Оплачено',
}

export type CreateOrderDto = {
  status: OrderStatus;
  price: number;
  count: number;
};

export type ResponseOrder = {
  id: number,
  status: OrderStatus;
  price: number;
  count: number;
};

export type FindOrderByUserDto = {
  userId: number;
};

export type OrderItem = {
  id: number,
  status: OrderStatus,
  products: number[],
  price: number,
  count: number,
  createdAt: string,
  updatedAt: string,
}
