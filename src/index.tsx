import * as React from "react";
import * as ReactDOM from "react-dom";

import 'bootstrap/dist/css/bootstrap.css';

import { MenuComponent } from "./menu/menu.component";


ReactDOM.render(
    <MenuComponent/>,
    document.getElementById("menu-content")
);
