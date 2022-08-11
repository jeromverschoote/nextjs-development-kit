import { createContext } from 'react';

import { NotificationType } from 'types/Notification';

export type NotificationContextType = {
  notifications: NotificationType[];
  create: (notification: NotificationType) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export default createContext<NotificationContextType>({
  notifications: [],
  create: (_notification: NotificationType) => null,
  remove: (_id: string) => null,
  clear: () => null,
});
