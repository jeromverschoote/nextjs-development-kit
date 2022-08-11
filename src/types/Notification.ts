export type NotificationType = {
  id: string;

  title: string;
  description?: string;

  type: 'info' | 'success' | 'warning' | 'error';
};
