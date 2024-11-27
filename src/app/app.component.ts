import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { SupabaseService } from './shared/services/supabase.service';
import { NotificationsService } from './shared/services/notifications.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private _supabaseService = inject(SupabaseService);
  private _notificationService = inject(NotificationsService);

  ngOnInit() {
    this._supabaseService.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        this._supabaseService.currentUser.set({
          id: session?.user.id!,
          email: session?.user.email!,
          username:
            session?.user.identities?.at(0)?.identity_data?.['username'],
          isOrganisation:
            session?.user?.user_metadata?.['type'] === 'organisation',
          type: session?.user?.user_metadata?.['type'],
          organization: session?.user?.user_metadata?.['organization'],
        });
        this._notificationService.fetchNotifications();
      } else if (event === 'SIGNED_OUT') {
        this._supabaseService.currentUser.set(null);
      }
    });
  }
}
