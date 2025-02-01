import { Request, Response, NextFunction } from "express";

import Product from "../models/Product";
import { products } from "../data/dummyData";

interface PostProductBody {
  title: string;
  description: string;
  price: number;
}

interface ProductParam {
  prodId: string;
}

interface UpdateProductBody {
  title?: string;
  description?: string;
  price?: number;
}

export const getProductController = (req: any, res: any, next: any) => {
  const param: ProductParam = req.params;
  if (!param.prodId) {
    res.status(400).json({ message: "Bad Reqeust: Request param is required" });
    return;
  }
  const prodId = param.prodId;
  const product: Product | undefined = products.find(
    (prod: Product) => prod.id === prodId
  );
  res
    .status(200)
    .json({ message: `Retrieved product ${prodId}`, product: product });
};

export const createProductController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: PostProductBody = req.body;
  if (!body.title || !body.description || body.price == null) {
    res.status(400).json({ message: "Missing required product fields" });
    return;
  }
  const { title, description, price } = body;
  const newProduct = new Product(title, description, price);
  products.push(newProduct);
  res
    .status(201)
    .json({ message: "successfully created new product", products: products });
};

export const updateProductController = (
  req: Request<ProductParam>,
  res: Response,
  next: NextFunction
) => {
  const param: ProductParam = req.params;
  const body: UpdateProductBody = req.body;
  if (!body) {
    res.status(400).json({ message: "Bad Reqeust: Request body is required" });
    return;
  }
  if (!param.prodId) {
    res.status(400).json({ message: "Bad Reqeust: Request param is required" });
    return;
  }
  const prodId = param.prodId;
  const prodIndex: number = products.findIndex((prod) => prod.id === prodId);
  const product = products[prodIndex];
  if (body.title) {
    product.title = body.title;
  }
  if (body.description) {
    product.description = body.description;
  }
  if (body.price) {
    product.price = body.price;
  }
  products[prodIndex] = product;
  res.status(200).json({
    message: `Successfully updated product ${prodId}`,
    product: product,
  });
};

export const deleteProductController = (
  req: Request<ProductParam>,
  res: Response,
  next: NextFunction
) => {
  const param: ProductParam = req.params;
  if (!param.prodId) {
    res.status(400).json({ message: "Bad Reqeust: Request param is required" });
    return;
  }
  const prodId = param.prodId;
  const index = products.findIndex((prod) => prod.id === prodId);
  if (index !== -1) {
    products.splice(index, 1);
  }
  res.status(200).json({
    message: `Successfully deleted product ${prodId}`,
    products: products,
  });
};
