import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems as allNavItems } from './_nav';
import { AuthService } from 'src/app/services/auth-service.service'; // Ensure the correct path to AuthService

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    DefaultHeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    DefaultFooterComponent
  ]
})
export class DefaultLayoutComponent implements OnInit {
  public navItems: any[] = [];
  public roles: string[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.logUserRoles();
    this.navItems = this.getFilteredNavItems();
  }

  logUserRoles(): void {
    const authorities = this.authService.getUserAuthorities();
    console.log('User roles:', authorities);
    this.roles = authorities;
  }

  

  getFilteredNavItems(): any[] {
    const authorities = this.authService.getUserAuthorities();

        // Check if the user is an admin
    if (authorities.includes('ROLE_ADMIN')) {
        return allNavItems;
      }

    return allNavItems.filter(item => {
      if (item.name?.includes('Final')) {
        return authorities.includes('ROLE_ADMIN');
      }

      if (item.name?.includes('Management')) {
        return authorities.includes('ROLE_ADMIN');
      }

      if (item.name?.includes('Daftar')) {
        return authorities.includes('ROLE_ADMIN');
      }

      if (item.name?.includes('Treasury')) {
        return authorities.includes('ROLE_TREASURY');
      }
      if (item.name?.includes('HR Payroll')) {
        return authorities.includes('ROLE_HRPAYROLL');
      }
      if (item.name?.includes('HRIR')) {
        return authorities.includes('ROLE_HRIR');
      }
      if (item.name?.includes('General Services')) {
        return authorities.includes('ROLE_GENERALSERVICES');
      }
      if (item.name?.includes('HR Service')) {
        return authorities.includes('ROLE_HRSERVICE');
      }
      if (item.name?.includes('Security Admin')) {
        return authorities.includes('ROLE_SECURITYADMIN');
      }
      if (item.name?.includes('HR Talent')) {
        return authorities.includes('ROLE_HRTALENT');
      }
      if (item.name?.includes('HR Learning')) {
        return authorities.includes('ROLE_HRLEARNING');
      }
      return true; // Default to show
    });
  }

  onScrollbarUpdate($event: any) {
    // if ($event.verticalUsed) {
    // console.log('verticalUsed', $event.verticalUsed);
    // }
  }
}
