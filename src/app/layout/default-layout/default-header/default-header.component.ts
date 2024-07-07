import { Component, OnInit, inject, Input, DestroyRef, computed, TrackByFunction } from '@angular/core';
import {
  AvatarComponent,
  BadgeComponent,
  BreadcrumbRouterComponent,
  ColorModeService,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  ModalModule,
  NavItemComponent,
  NavLinkDirective,
  ProgressBarDirective,
  ProgressComponent,
  SidebarToggleDirective,
  TextColorDirective,
  ThemeDirective,
} from '@coreui/angular';
import { NgStyle, NgTemplateOutlet, CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, filter, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  standalone: true,
  imports: [
    CommonModule, // Ensure CommonModule is imported here
    ContainerComponent,
    HeaderTogglerDirective,
    SidebarToggleDirective,
    IconDirective,
    HeaderNavComponent,
    NavItemComponent,
    NavLinkDirective,
    RouterLink,
    RouterLinkActive,
    NgTemplateOutlet,
    BreadcrumbRouterComponent,
    ThemeDirective,
    DropdownComponent,
    DropdownToggleDirective,
    TextColorDirective,
    AvatarComponent,
    DropdownMenuDirective,
    DropdownHeaderDirective,
    DropdownItemDirective,
    BadgeComponent,
    DropdownDividerDirective,
    ProgressBarDirective,
    ProgressComponent,
    NgStyle,
    ModalModule
  ]
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {
  public username: string | undefined;
  public nama: string | undefined;
  public notifications: string[] = [];
  public showNotifications: boolean = false;
  public modalVisible:boolean = false;
  
  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;
  readonly #destroyRef = inject(DestroyRef);

  readonly colorModes = [
    { name: 'light', text: 'Light', icon: 'cilSun' },
    { name: 'dark', text: 'Dark', icon: 'cilMoon' },
    { name: 'auto', text: 'Auto', icon: 'cilContrast' }
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode => mode.name === currentMode)?.icon ?? 'cilSun';
  });
trackByFn: TrackByFunction<{ name: string; text: string; icon: string; }> | undefined;

  constructor(private authService: AuthService, private notificationService: NotificationService) {
    super();
    this.#colorModeService.localStorageItemName.set('coreui-free-angular-admin-template-theme-default');
    this.#colorModeService.eventName.set('ColorSchemeChange');
    this.#activatedRoute.queryParams
      .pipe(
        delay(1),
        map(params => <string>params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
        filter(theme => ['dark', 'light', 'auto'].includes(theme)),
        tap(theme => {
          this.colorMode.set(theme);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.username = user.username;
        this.nama = user.userDetail?.nama;
        this.getNotifications();
      }
    });
  }

  getNotifications(): void {
    this.notificationService.getNotification().subscribe(notifications => {
      this.notifications = notifications;
      console.log(notifications[1])
    });
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  // openModal(): void {
  //   this.modalVisible = true;
  // }

  // closeModal(): void {
  //   this.modalVisible = false;
  // }


  logout(): void {
    this.authService.logout();
  }

  @Input() sidebarId: string = 'sidebar1';
}
