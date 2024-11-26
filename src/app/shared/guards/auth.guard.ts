import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Session } from '@supabase/supabase-js';
import { SupabaseService } from '../services/supabase.service';
import { from } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);

  return from(supabaseService.supabase.auth.getSession()).pipe(
    map((sessionResponse: { data: { session: Session | null } }) => {
      const isAuthenticated = !!sessionResponse.data.session;
      if (!isAuthenticated) {
        router.navigate(['/login']); // Navigate to login if not authenticated
      }
      return isAuthenticated;
    }),
  );
};
