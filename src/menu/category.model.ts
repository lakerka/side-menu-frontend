import { Product } from './product.model';


export class Category {
  constructor(
    public id: number,
    public name: string,
    public children: Array<Category|Product>
  ) {}
}
