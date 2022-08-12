import { useCallback, useState } from 'react';

import { NotificationType } from 'types/Notification';

interface ContextType {
  notifications: NotificationType[];
  create: (notification: NotificationType) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useNotification = (): ContextType => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const handleAddNotification = (notification: NotificationType) => {
    const result = [...notifications];
    result.push(notification);
    setNotifications(result);
  };

  const handleDeleteNotification = useCallback(
    (id: string) => {
      const result = [...notifications];
      const index = notifications.findIndex(
        (notification: NotificationType) => notification.id === id,
      );
      result.splice(index, 1);
      setNotifications(result);
    },
    [notifications],
  );

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    create: handleAddNotification,
    remove: handleDeleteNotification,
    clear: handleClearNotifications,
  };
};
