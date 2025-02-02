import { randomUUID } from "crypto";

export default class Product {
  id: string;
  title: string;
  description: string;
  price: number;
  userId: string;

  constructor(
    title: string,
    description: string,
    price: number,
    userId: string
  ) {
    this.id = randomUUID();
    this.title = title;
    this.description = description;
    this.price = price;
    this.userId = userId;
  }
}
