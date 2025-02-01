import { randomUUID } from "crypto";

export default class Product {
  id: string;
  title: string;
  description: string;
  price: number;

  constructor(title: string, description: string, price: number) {
    this.id = randomUUID();
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
