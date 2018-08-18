import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private sidebar = true;
  constructor() {

  }
  // toggleSidebar() {
  //   if (this.sidebar === false) {
  //     this.sidebar = true;
  //     document.getElementById('content').style.marginLeft = '250px';
  //   } else {
  //     this.sidebar = false;
  //     document.getElementById('content').style.marginLeft = '0px';
  //   }
  // }
}
