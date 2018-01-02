import axios from 'axios';

import { Category } from '../model/category.model';
import { Product } from '../model/product.model';


interface ProductData {
  name: string;
  children?: Array<ProductData>;
  price?: number;
}

export class MenuService {
  private static fromData(data: ProductData): Category|Product|undefined {
    if (data === undefined) {
      return undefined;
    }
    let parsed;
    if (data.hasOwnProperty('children')) {
      parsed = new Category(data.name, data.children.map(MenuService.fromData));
    } else {
      parsed = new Product(data.name, data.price);
    }
    return parsed;
  }

  static getTree(): Promise<Category|undefined> {
    return axios.get('/menu/tree')
      .then((promise) => {
        let cateogry =  <Category|undefined> MenuService.fromData(promise.data);
        return cateogry;
      });
  }
};
