import { Request, Response, NextFunction } from "express";

import Product from "../models/Product";
import { products } from "../data/dummyData";

interface PostProductBody {
  title: string;
  description: string;
  price: number;
}

interface UpdateProductBody {
  title?: string;
  description?: string;
  price?: number;
}

export const getProductController = (req: any, res: any, next: any) => {
  const param = req.params;
  if (!param.prodId) {
    const error = new Error("Bad Request: Request params is required") as any;
    error.status = 400;
    throw error;
  }
  const prodId = param.prodId;
  try {
    const product: Product | undefined = products.find(
      (prod: Product) => prod.id === prodId
    );
    res
      .status(200)
      .json({ message: `Retrieved product ${prodId}`, product: product });
  } catch (err: any) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

export const createProductController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: PostProductBody = req.body;
  if (!body.title || !body.description || body.price == null) {
    const error = new Error("Missing required product fields") as any;
    error.status = 400;
    throw error;
  }
  const { title, description, price } = body;
  try {
    const newProduct = new Product(title, description, price);
    products.push(newProduct);
    res.status(201).json({
      message: "successfully created new product",
      products: products,
    });
  } catch (err: any) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

export const updateProductController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const param = req.params;
  const body: UpdateProductBody = req.body;
  if (!body) {
    const error = new Error("Bad Request: Request body is required") as any;
    error.status = 400;
    throw error;
  }
  if (!param.prodId) {
    const error = new Error("Bad Request: Request params is required") as any;
    error.status = 400;
    throw error;
  }
  const prodId = param.prodId;
  try {
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
  } catch (err: any) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

export const deleteProductController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const param = req.params;
  if (!param.prodId) {
    const error = new Error("Missing required fields in request") as any;
    error.status = 400;
    throw error;
  }
  const prodId = param.prodId;
  try {
    const index = products.findIndex((prod) => prod.id === prodId);
    if (index !== -1) {
      products.splice(index, 1);
    }
    res.status(200).json({
      message: `Successfully deleted product ${prodId}`,
      products: products,
    });
  } catch (err: any) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
