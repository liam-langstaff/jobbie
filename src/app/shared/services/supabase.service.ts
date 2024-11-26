import { Injectable, signal } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AuthResponse, createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  currentUser = signal<{
    email: string;
    username: string;
    id: string;
    type: string;
  } | null>(null);

  register(
    username: string,
    email: string,
    password: string,
    type: 'personal' | 'organization',
    organisation?: string,
  ): Observable<AuthResponse> {
    const promise = this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          type,
          organization: organisation ?? null,
        },
      },
    });
    return from(promise);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const promise = this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    return from(promise);
  }

  logout(): void {
    this.supabase.auth.signOut();
  }
}
