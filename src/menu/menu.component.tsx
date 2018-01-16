import * as React from "react";

import { MenuService } from "./menu.service";
import { Category } from "./category.model";
import { CategoryMenuItemComponent } from "./category-menu-item.component";
import * as styles from "./menu.style.scss";


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
