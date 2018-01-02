import * as React from "react";

import { MenuService } from '../services/menu.service';
import { Category } from '../model/category.model';
import { Product } from '../model/product.model';


export class MenuComponent extends React.Component {
  public componentDidMount() {
    //console.log(MenuService);
    //console.log(MenuService.getTree);
    MenuService.getTree();
  }

  render() {
    return <h1>Hello!</h1>;
  }
}
