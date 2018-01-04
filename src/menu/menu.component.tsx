import * as React from "react";

import { MenuService } from "./menu.service";
import { Category } from "./category.model";
import { Product } from "./product.model";
import * as styles from "./menu.style.scss";


const MenuItem = (item: Category|Product): JSX.Element => {
  let prefix = item instanceof Category ? "Category" : "Product";
  let hasChildren = item instanceof Category && item.children.length > 0;
  let children = hasChildren ? (item as Category).children.map(MenuItem) : [];
  return (
    <li key={ prefix + item.id.toString() }>
      { hasChildren &&
        <span className={ styles.indicator + " glyphicon glyphicon-plus-sign" }></span>
      }
      { item.name }
      { hasChildren &&
        <ul>
         { children }
        </ul>
      }
    </li>
  );
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
                MenuItem(this.state.category)
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
