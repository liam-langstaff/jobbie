import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, scan } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { Notification } from '../types/notification.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notificationsSubject$$ = new BehaviorSubject<Notification[]>([]);
  notifications$: Observable<Notification[]> = this.notificationsSubject$$.pipe(
    scan(
      (prev: Notification[], curr: Notification[]) => [...curr, ...prev],
      [],
    ),
    distinctUntilChanged(), // Ensure not to repeat the same notifications
  );
  supabaseService: SupabaseService = inject(SupabaseService);

  constructor() {
    this.fetchNotifications();
    this.supabaseService.supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (res) => {
          console.log('Notification received:', res);
          this.notificationsSubject$$.next([res.new] as Notification[]);
          // this.fetchNotifications();
        },
      )
      .subscribe();
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
      .eq('id', notificationId);

    if (!error) {
      console.log('Notification marked as read:', data);
      // remove this as we can set the read reciepts locally. The DB will already have been set but prevent another call
      // await this.fetchNotifications();
    } else {
      console.error('Error marking notification as read:', error);
    }
  }

  async sendTestNotification() {
    // Define a test notification object
    const testNotification = {
      id: uuidv4(),
      user_id: this.supabaseService.currentUser()?.id,
      title: 'Hello!',
      message: 'Thanks for subscribing!',
      timestamp: new Date().toISOString(),
      type: 'info',
      read: false,
    };

    // Insert the test notification into the 'notifications' table
    const { data, error } = await this.supabaseService.supabase
      .from('notifications')
      .insert([testNotification]);

    if (error) {
      console.error('Error sending test notification:', error);
    } else {
      console.log('Test notification sent:', data);
    }
  }
}
