import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XIcon,
} from '@heroicons/react/outline';
import React, { Fragment, useMemo, useState } from 'react';

interface Props {
  title: string;
  description?: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

const Notification: React.FC<Props> = (props) => {
  const { title, description, type = 'info' } = props;

  const [show, setShow] = useState(true);

  const icon = useMemo(() => {
    let result;

    switch (type) {
      case 'info':
        result = (
          <InformationCircleIcon
            className="h-6 w-6 text-blue-400"
            aria-hidden="true"
          />
        );
        break;

      case 'success':
        result = (
          <CheckCircleIcon
            className="h-6 w-6 text-green-400"
            aria-hidden="true"
          />
        );
        break;

      case 'warning':
        result = (
          <ExclamationCircleIcon
            className="h-6 w-6 text-yellow-400"
            aria-hidden="true"
          />
        );
        break;

      case 'error':
        result = (
          <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
        );
        break;
    }

    return result;
  }, [type]);

  setTimeout(() => {
    setShow(false);
  }, 3500);

  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">{icon}</div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">{title}</p>
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                type="button"
                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  setShow(false);
                }}
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Notification;
