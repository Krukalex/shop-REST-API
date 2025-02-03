import { Request, Response, NextFunction } from "express";

import Product from "../models/Product";
// import { products } from "../data/dummyData";

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
    res
      .status(200)
      .json({
        message: `Pulled all items for user ${userId}`,
        products: productNames,
      });
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
  const userId = req.userId!;
  try {
    const product: Product | undefined = Product.getById(prodId);
    if (!product) {
      const error = new Error(`Product ${prodId} could not be found`) as any;
      error.status = 404;
      throw error;
    }
    if (userId != product.user_id) {
      const error = new Error(
        `Only the creator of a product is authorized to modify or delete it`
      ) as any;
      error.status = 401;
      throw error;
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
  const userId = req.userId!;
  try {
    const product: Product | undefined = Product.getById(prodId);
    if (!product) {
      const error = new Error(`Product ${prodId} not found`) as any;
      error.status = 404;
      throw error;
    }
    if (userId != product.user_id) {
      const error = new Error(
        `Only the creator of a product is authorized to modify or delete it`
      ) as any;
      error.status = 401;
      throw error;
    }
    const deleted: Boolean = Product.deleteById(prodId);
    res.status(200).json({
      message: `Successfully deleted product ${prodId}`,
    });
  } catch (err: any) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
