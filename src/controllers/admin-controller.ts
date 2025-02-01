import Product from "../models/Product";
import { products } from "../data/dummyData";

interface PostProductBody {
  title: string;
  description: string;
  price: number;
}

export const createProductController = (req: any, res: any, next: any) => {
  const body: PostProductBody = req.body;
  const { title, description, price } = body;
  const newProduct = new Product(title, description, price);
  products.push(newProduct);
  res
    .status(201)
    .json({ message: "successfully created new product", products: products });
};
