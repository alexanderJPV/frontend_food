import { Component, OnInit } from '@angular/core';
declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    icon: 'dashboard',
    class: ''
  },
  {
    path: '/admin/user-profile',
    title: 'Perfil Usuario',
    icon: 'person',
    class: ''
  },
  {
    path: '/admin/user-list',
    title: 'Lista Usuarios',
    icon: 'content_paste',
    class: ''
  },
  {
    path: '/admin/sucursal-list',
    title: 'Lista Sucursales',
    icon: 'restaurant',
    class: ''
  },
  {
    path: '/admin/plato-especial',
    title: 'Platos especiales',
    icon: 'room_service',
    class: ''
  },
  { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  { path: '/upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro' },
];
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
