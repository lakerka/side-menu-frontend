import * as React from "react";

import { MenuService } from "./menu.service";
import { Category } from "./category.model";
import { Product } from "./product.model";
import * as styles from "./menu.style.scss";


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


export class MenuComponent extends React.Component<any, {category: Category}> {
  constructor(props: any){
      super(props);
  }

  public componentDidMount() {
    MenuService.getTree()
      .then((category: Category|undefined) => {
        if (category !== undefined) {
          this.setState({category: category});
        }
      });
  }

  render() {
    return (
      <div className="container" style={{ marginTop: "30px" }}>
        <div className="row">
          <div className="col-md-4">
            <ul className={ styles.tree }>
              { this.state !== null &&
                <CategoryMenuItemComponent item={this.state.category} isExpanded={true}/>
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
