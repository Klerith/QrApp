import { Component } from '@angular/core';

import {HomePage,GuardadosPage} from "../index.pages";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
tab1:any = HomePage;
tab2:any = GuardadosPage;

constructor() {

  }




}
