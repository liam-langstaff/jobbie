import {Injectable, signal} from '@angular/core';
import {from, Observable} from 'rxjs';
import {AuthResponse, createClient} from '@supabase/supabase-js';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  currentUser = signal<{ email: string; username: string } | null>(null);

  register(
    email: string,
    username: string,
    password: string
  ): Observable<AuthResponse> {
    const promise = this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
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
