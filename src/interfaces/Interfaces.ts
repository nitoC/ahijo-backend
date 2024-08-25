export interface ICart {
  user_id: string;
  cart_id: string;
  quantity?: string;
  product_id: string;
  size?: string;
}

export interface Iproduct {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: string;
  top_image: string;
  right_image: string;
  left_image: string;
}

export interface IOrder {}
