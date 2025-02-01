import { products } from "../data/dummyData";

export const getProductsController = (req: any, res: any, next: any) => {
  res.status(200).json({ message: "Pulled all items", products: products });
};
