import { Request, Response, NextFunction } from "express";

import Product from "../models/Product";
import { NotFoundError } from "../errors/not-found-error";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { validationResult } from "express-validator";

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

export const getProductsController = (req: any, res: any, next: any) => {
  try {
    const userId = req.userId!;
    const products: Array<Product> = Product.getUserProducts(userId);
    const productNames = products.map((product) => {
      return { id: product.product_id, title: product.title };
    });
    res.status(200).json({
      message: `Pulled all items for user ${userId}`,
      products: productNames,
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const createProductController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  const body: PostProductBody = req.body;
  const { title, description, price } = body;
  const userId = req.userId!;
  try {
    const newProduct = new Product(title, description, price, userId);
    newProduct.save();
    res.status(201).json({
      message: "successfully created new product",
      products: {
        product_id: newProduct.product_id,
        title: newProduct.title,
        description: newProduct.description,
        price: newProduct.price,
        creator: newProduct.user_id,
      },
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const updateProductController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  const param = req.params;
  const body: UpdateProductBody = req.body;
  const prodId = param.prodId;
  const userId = req.userId!;
  try {
    const product: Product | undefined = Product.getById(prodId);
    if (!product) {
      throw new NotFoundError();
    }
    if (userId != product.user_id) {
      throw new UnauthorizedError();
    }
    if (body.title) {
      product.title = body.title;
    }
    if (body.description) {
      product.description = body.description;
    }
    if (body.price) {
      product.price = body.price;
    }
    product.save();
    res.status(200).json({
      message: `Successfully updated product ${prodId}`,
      product: product,
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteProductController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  const param = req.params;
  const prodId = param.prodId;
  const userId = req.userId!;
  try {
    const product: Product | undefined = Product.getById(prodId);
    if (!product) {
      throw new NotFoundError();
    }
    if (userId != product.user_id) {
      throw new UnauthorizedError();
    }
    const deleted: Boolean = Product.deleteById(prodId);
    res.status(200).json({
      message: `Successfully deleted product ${prodId}`,
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
