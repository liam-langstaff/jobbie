import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  HostBinding,
  inject,
  ViewChild,
} from '@angular/core';
import { Button } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { animate, style, transition, trigger } from '@angular/animations';
import { debounceTime, filter, fromEvent, of, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [Button, MenuModule, BadgeModule],
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
export class NavigationComponent implements AfterViewInit {
  @ViewChild('nav') navigation: ElementRef | undefined;

  @HostBinding('class.no-scroll') get noScroll() {
    return this.isMobileMenu;
  }

  public navHeight: number | undefined;

  public isMobileMenu: boolean = false;

  items = [
    {
      label: 'Options',
      items: [
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
        },
      ],
    },
  ];

  private readonly _destroyRef$: DestroyRef = inject(DestroyRef);

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
}
