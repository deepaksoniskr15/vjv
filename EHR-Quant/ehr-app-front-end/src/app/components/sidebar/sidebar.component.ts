import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export let ROUTES: RouteInfo[] = [];



// export const ROUTES: RouteInfo[] = [
//     { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
//     { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
//     { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
//     { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
//     { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
//     { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
//     { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
//     { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
// ];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  user: any;

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem("user")) {
      ROUTES = [];
      this.user = JSON.parse(localStorage.getItem("user"));
      if (this.user.role === 0) {
        ROUTES.push({ path: '/patient/add', title: 'Add Patient', icon: 'person', class: '' });
        ROUTES.push({ path: '/patient/view', title: 'View Patient', icon: 'content_paste', class: '' });
      } else if (this.user.role === 1) {
        ROUTES.push({ path: '/permission/view', title: 'View Permissions', icon: 'content_paste', class: '' });
      }
    }
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
