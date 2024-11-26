import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  HostBinding,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Button, ButtonDirective } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { animate, style, transition, trigger } from '@angular/animations';
import { debounceTime, filter, fromEvent, map, of, switchMap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { NgClass } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { NotificationsService } from '../../services/notifications.service';
import { Notification } from '../../types/notification.interface';

@Component({
  selector: 'app-navigation',
  imports: [
    Button,
    MenuModule,
    BadgeModule,
    OverlayPanelModule,
    NgClass,
    ButtonDirective,
    Ripple,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class NavigationComponent implements AfterViewInit, OnInit {
  @ViewChild('nav') navigation: ElementRef | undefined;

  @HostBinding('class.no-scroll') get noScroll() {
    return this.isMobileMenu;
  }

  supabaseService = inject(SupabaseService);

  mockNotifications = [
    {
      title: 'Software Engineer',
      company: 'ABC Corp',
      location: 'Location1',
      datePosted: '1 day ago',
      iconClass: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'UI/UX Designer',
      company: 'XYZ Ltd',
      location: 'Location2',
      datePosted: '2 days ago',
      iconClass: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Project Manager',
      company: '123 Inc',
      location: 'Location3',
      datePosted: '3 days ago',
      iconClass: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
  ];

  public navHeight: number | undefined;

  public isMobileMenu: boolean = false;
  public hideNavbar: boolean = false;

  items = [
    {
      label: 'Options',
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-user',
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => {
            this.supabaseService.logout();
          },
        },
      ],
    },
  ];

  private readonly _destroyRef$: DestroyRef = inject(DestroyRef);
  public router = inject(Router);
  public activatedRoute = inject(ActivatedRoute);
  private readonly _hiddenRoutes = ['login', 'register'];
  notifications: Notification[] = [];
  notificationService: NotificationsService = inject(NotificationsService);

  ngOnInit() {
    this.notificationService.notifications$.subscribe((notifications) => {
      console.log(notifications);
      this.notifications = notifications;
    });
  }

  public readonly _hideNavbar = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        const currentRoute =
          this.activatedRoute.snapshot.firstChild?.routeConfig?.path;
        return this._hiddenRoutes.includes(currentRoute || '');
      }),
      takeUntilDestroyed(this._destroyRef$),
    ),
  );

  public readonly _resize$ = fromEvent(window, 'resize').pipe(
    debounceTime(150),
    filter(() => window.innerWidth >= 768),
    switchMap(() => of(false)),
    takeUntilDestroyed(this._destroyRef$),
  );

  public ngAfterViewInit() {
    this.navHeight = this.navigation?.nativeElement.offsetHeight;

    this._resize$.subscribe(() => {
      this.isMobileMenu = false;
    });
  }

  toggleMobileMenu() {
    this.isMobileMenu = !this.isMobileMenu;
    if (this.isMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  async markAsRead(notificationId: string) {
    await this.notificationService.markNotificationAsRead(notificationId);
  }

  getNotificationBadgeClass(type: string): string {
    switch (type) {
      case 'info':
        return 'notification-badge-info';
      case 'warning':
        return 'notification-badge-warning';
      case 'error':
        return 'notification-badge-error';
      case 'success':
        return 'notification-badge-success';
      default:
        return '';
    }
  }
}
