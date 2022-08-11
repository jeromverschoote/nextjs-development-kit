import { useCallback, useEffect, useState } from 'react';

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (notifications.length > 0) {
        handleDeleteNotification(notifications?.[0]?.id);
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [handleDeleteNotification, notifications]);

  return {
    notifications,
    create: handleAddNotification,
    remove: handleDeleteNotification,
    clear: handleClearNotifications,
  };
};
