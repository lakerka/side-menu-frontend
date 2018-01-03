import * as React from "react";

import { MenuService } from "./menu.service";
import { Category } from "./category.model";
import { Product } from "./product.model";


const MenuItem = (item: Category|Product): JSX.Element => {
  return (
    <ul>
        <li>
        { item.name }
        { item instanceof Category ? item.children.map(MenuItem) : "" }
        </li>
    </ul>
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
            { this.state !== null ? MenuItem(this.state.category) : "" }
          </div>
        </div>
      </div>
    );
  }
  // render() {
  //   return (
  //     <div className="container" style={{ marginTop: '30px' }}>
  //       <div className="row">
  //           <div className="col-md-4">
  //               <ul>
  //                   <li>TECH
  //                       <ul>
  //                           <li>Company Maintenance</li>
  //                           <li>Employees
  //                               <ul>
  //                                   <li>Reports
  //                                       <ul>
  //                                           <li>Report1</li>
  //                                           <li>Report2</li>
  //                                           <li>Report3</li>
  //                                       </ul>
  //                                   </li>
  //                                   <li>Employee Maint.</li>
  //                               </ul>
  //                           </li>
  //                           <li>Human Resources</li>
  //                       </ul>
  //                   </li>
  //                   <li>XRP
  //                       <ul>
  //                           <li>Company Maintenance</li>
  //                           <li>Employees
  //                               <ul>
  //                                   <li>Reports
  //                                       <ul>
  //                                           <li>Report1</li>
  //                                           <li>Report2</li>
  //                                           <li>Report3</li>
  //                                       </ul>
  //                                   </li>
  //                                   <li>Employee Maint.</li>
  //                               </ul>
  //                           </li>
  //                           <li>Human Resources</li>
  //                       </ul>
  //                   </li>
  //               </ul>
  //           </div>
  //       </div>
  //   </div>
  //   );
  // }
}
