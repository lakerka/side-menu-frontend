import { Product } from './product.model';


export class Category {
  constructor(
    public name: string,
    public children: Array<Category|Product>
  ) {}
}
