export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  timestamp: string; // ISO format date string or Date object
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
}
