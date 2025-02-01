import Product from "../models/Product";
import { products } from "../data/dummyData";

interface PostProductBody {
  title: string;
  description: string;
  price: number;
}

interface UpdateProductParam {
  prodId: string;
}

interface UpdateProductBody {
  title?: string;
  description?: string;
  price?: number;
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

export const updateProductController = (req: any, res: any, next: any) => {
  const param: UpdateProductParam = req.params;
  const body: UpdateProductBody = req.body;
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
