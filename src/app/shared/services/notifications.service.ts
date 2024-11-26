import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { Notification } from '../types/notification.interface';
import { v4 as uuidv4 } from 'uuid';

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
      .eq('id', notificationId);

    if (!error) {
      console.log('Notification marked as read:', data);
      await this.fetchNotifications(); // Refresh notifications
    } else {
      console.error('Error marking notification as read:', error);
    }
  }

  async sendTestNotification() {
    // Define a test notification object
    const testNotification = {
      id: uuidv4(), // You can generate unique UUID dynamically
      user_id: this.supabaseService.currentUser()?.id,
      title: 'This is a test notification',
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
