import { validationResult } from "express-validator";
import Product from "../models/Product";
import { RequestValidationError } from "../errors/request-validation-error";
import { NotFoundError } from "../errors/not-found-error";

interface GetProductParam {
  prodId: string;
}

export const getProductController = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  const param: GetProductParam = req.params;
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

export const getProductsController = (req: any, res: any, next: any) => {
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
