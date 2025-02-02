import Product from "../models/Product";
import jwt from "jsonwebtoken";

interface GetProductParam {
  prodId: string;
}

export const getProductController = (req: any, res: any, next: any) => {
  const param: GetProductParam = req.params;
  if (!param.prodId) {
    res.status(400).json({ message: "Bad Reqeust: Request param is required" });
    return;
  }
  const prodId = param.prodId;
  try {
    const product: Product | undefined = Product.getById(prodId);
    if (!product) {
      const error = new Error(
        "The requested product could not be found"
      ) as any;
      error.status = 404;
      throw error;
    }
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
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
