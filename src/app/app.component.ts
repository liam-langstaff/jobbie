import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavigationComponent} from './shared/components/navigation/navigation.component';
import {SupabaseService} from './shared/services/supabase.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavigationComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private _supabaseService = inject(SupabaseService);

  ngOnInit() {
      this._supabaseService.supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
          this._supabaseService.currentUser.set({
            email: session?.user.email!,
            username:
              session?.user.identities?.at(0)?.identity_data?.['username'],
          });
        } else if (event === 'SIGNED_OUT') {
          this._supabaseService.currentUser.set(null);
        }
      });
    }

    logout(): void {
      this._supabaseService.logout();
    }
}
