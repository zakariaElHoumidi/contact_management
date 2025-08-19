import { Component } from '@angular/core';
import { SideBarComponent } from "../../components/user/side-bar/side-bar.component";
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../components/user/header/header.component";

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [SideBarComponent, RouterOutlet, HeaderComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {
  sidebarEvent: boolean = false;

  handleSidebarEvent(message: string) {
    if (message == 'toggleSideBar') {
      this.sidebarEvent = !this.sidebarEvent;
    }
  }
}
