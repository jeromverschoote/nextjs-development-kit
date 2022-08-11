import React, { ReactNode } from 'react';
import { useContext } from 'react';

// import { NotificationType } from 'types/Notification';

import Context from 'context';

import Notification from 'components/Notification';

// import { styles } from '.';

interface Props {
  children: ReactNode | ReactNode[];
}

const Notifications: React.FC<Props> = (props) => {
  const { children } = props;

  const { notifications } = useContext(Context.Notifications);

  return (
    <>
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start mt-24 z-50"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end ">
          {notifications.map((notification, index) => (
            <Notification
              key={`${notification.id}-${index}`}
              title={notification.title}
              description={notification?.description}
              type={notification.type}
            />
          ))}
        </div>
      </div>
      {children}
    </>
  );
};

export default Notifications;
