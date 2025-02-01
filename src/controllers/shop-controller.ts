import { products } from "../data/dummyData";
import Product from "../models/Product";

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
  const product: Product | undefined = products.find(
    (prod: Product) => prod.id === prodId
  );
  res
    .status(200)
    .json({ message: `Retrieved product ${prodId}`, product: product });
};

export const getProductsController = (req: any, res: any, next: any) => {
  const productNames = products.map((product) => {
    return { id: product.id, title: product.title };
  });
  res.status(200).json({ message: "Pulled all items", products: productNames });
};
