import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Session } from '@supabase/supabase-js';
import { SupabaseService } from '../services/supabase.service';
import { from } from 'rxjs';

export const organisationGuard: CanActivateFn = (route, state) => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);

  return from(supabaseService.supabase.auth.getSession()).pipe(
    map((sessionResponse: { data: { session: Session | null } }) => {
      console.log(sessionResponse.data.session);
      const isAuthenticated = !!sessionResponse.data.session;
      const isOrg =
        sessionResponse.data.session?.user?.user_metadata?.['type'].includes(
          'organisation',
        );
      if (!isAuthenticated) {
        router.navigate(['/login']); // Navigate to login if not authenticated
      }
      if (!isOrg) {
        router.navigate(['/403']);
      }
      return isAuthenticated && isOrg;
    }),
  );
};
