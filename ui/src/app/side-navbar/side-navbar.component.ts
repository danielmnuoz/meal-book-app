import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent {

  @ViewChild(MatSidenav) sidenav! : MatSidenav;

  constructor(private observer: BreakpointObserver) {

  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      this.sidenav.mode = "side";
      if(res.matches){
        this.sidenav.open();
      } else {
        this.sidenav.close();
      }
    })
  }
}
