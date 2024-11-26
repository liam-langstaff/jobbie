import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { Notification } from '../types/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notificationsSubject$$ = new BehaviorSubject<Notification[]>([]);
  notifications$: Observable<Notification[]> =
    this.notificationsSubject$$.asObservable();
  supabaseService: SupabaseService = inject(SupabaseService);

  constructor() {
    this.fetchNotifications();
  }

  async fetchNotifications() {
    const user = this.supabaseService.currentUser();
    console.log(user);
    if (user?.id) {
      const { data, error } = await this.supabaseService.supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false });

      if (!error) {
        this.notificationsSubject$$.next(data);
      } else {
        console.error('Error fetching notifications:', error);
      }
    }
  }

  async markNotificationAsRead(notificationId: string) {
    const { data, error } = await this.supabaseService.supabase
      .from('notifications')
      .update({ read: true })
      .match({ id: notificationId });

    if (!error) {
      await this.fetchNotifications(); // Refresh notifications
    } else {
      console.error('Error marking notification as read:', error);
    }
  }
}
