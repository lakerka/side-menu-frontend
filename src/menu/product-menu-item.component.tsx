import * as React from "react";

import { Product } from "./product.model";


export class ProductMenuItemComponent extends React.Component<{item: Product, active: boolean}, {}> {
  constructor(props: any) {
      super(props);
  }

  render() {
    let item = this.props.item;
    return (
      <li>
        { item.name }
      </li>
    );
  }
}
