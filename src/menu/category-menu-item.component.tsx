import * as React from "react";

import { Product } from "./product.model";
import { ProductMenuItemComponent } from "./product-menu-item.component";
import { Category } from "./category.model";
import * as styles from "./menu.style.scss";


export class CategoryMenuItemComponent extends React.Component<{item: Category, isExpanded: boolean}, {isExpanded: boolean}> {
  constructor(props: any) {
      super(props);
      this.state = { isExpanded: this.props.isExpanded };
      this.handleChildClick = this.handleChildClick.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.getChild = this.getChild.bind(this);
      this.hasChildren = this.hasChildren.bind(this);
  }

  hasChildren() {
    return this.props.item.children.length > 0;
  }

  handleChildClick(event: React.MouseEvent<HTMLUListElement>) {
      event.preventDefault();
  }

  handleClick(event: React.MouseEvent<HTMLLIElement>) {
    if (!event.isDefaultPrevented() && this.hasChildren()) {
      this.setState({ isExpanded: !this.state.isExpanded });
      event.preventDefault();
    }
  }

  getChild(child: Category|Product): React.ReactElement<CategoryMenuItemComponent|ProductMenuItemComponent> {
    if (child instanceof Category) {
      return React.createElement(CategoryMenuItemComponent, {
        key: "Category " + child.id.toString(),
        item: child,
        isExpanded: this.state.isExpanded
      });
    } else {
      return React.createElement(ProductMenuItemComponent, {
        key: "Product " + child.id.toString(),
        item: child
      });
    }
  }

  render() {
    let item = this.props.item;
    let hasChildren = this.hasChildren();
    let children = item.children.map(this.getChild);
    let spanClass = styles.indicator + " glyphicon";
    if (this.state.isExpanded && hasChildren) {
      spanClass += " glyphicon-plus-sign";
    } else {
      spanClass += " glyphicon-minus-sign";
    }
    let childrenClass = this.state.isExpanded ? "" : "hidden";
    return (
      <li onClick={ this.handleClick }>
        { hasChildren &&
          <span className={ spanClass }></span>
        }
        { item.name }
        { hasChildren &&
          <ul className={ childrenClass } onClick={ this.handleChildClick }>
           { children }
          </ul>
        }
      </li>
    );
  }
}
