import { validationResult } from "express-validator";
import Product from "../models/Product";
import { RequestValidationError } from "../errors/request-validation-error";
import { NotFoundError } from "../errors/not-found-error";
import { NextFunction, Request, Response } from "express";
import User from "../models/User";

export const getProductController = (
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
  try {
    const product: Product | undefined = Product.getById(prodId);
    if (!product) {
      throw new NotFoundError();
    }
    res
      .status(200)
      .json({ message: `Retrieved product ${prodId}`, product: product });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getProductsController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products: Array<Product> = Product.fetchAll();
    const productNames = products.map((product) => {
      return { id: product.product_id, title: product.title };
    });
    res
      .status(200)
      .json({ message: "Pulled all items", products: productNames });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getCartController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId!;
  try {
    const user = User.getById(userId);
    if (!user) {
      throw new NotFoundError();
    }
    const cart = user.getCart();
    res.status(200).json({ message: "Retrieved cart items", cart: cart });
  } catch (err: any) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addToCartController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  const body = req.body as { prodId: string; quantity: number };
  const { prodId, quantity } = body;
  const userId = req.userId!;
  try {
    const user = User.getById(userId);
    if (!user) {
      throw new NotFoundError();
    }
    const product = Product.getById(prodId);
    if (!product) {
      throw new NotFoundError();
    }
    user.addToCart(product, quantity);

    res.status(200).json({
      message: "Added product to cart",
      product: {
        id: product.product_id,
        name: product.title,
        desription: product.description,
      },
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const removeFromCartController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  const { prodId, quantity } = req.body;
  const userId = req.userId!;
  try {
    const user = User.getById(userId);
    if (!user) {
      throw new NotFoundError();
    }
    user.removeFromCart(prodId, quantity);
    const updatedCart = user.getCart();
    res.status(200).json({
      message: "Successfully remove items from cart",
      cart: updatedCart,
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const createOrderController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId!;
  try {
    const user = User.getById(userId);
    if (!user) {
      throw new NotFoundError();
    }
    user.createOrder();
    const order = user.getOrder();
    res
      .status(200)
      .json({ message: "Order created successfully", order: order });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
