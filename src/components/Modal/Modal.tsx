import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React, { Fragment, FC, useState, ReactNode, useCallback } from 'react';

import { styles } from '.';

interface Props {
  trigger: ReactNode;
  children: ReactNode | ReactNode[];

  onCancel?: () => void;
  onConfirm?: () => void;
  onClose?: () => void;
}

const Modal: FC<Props> = (props) => {
  const { trigger, children, onCancel, onConfirm, onClose } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleClickConfirm = useCallback(() => {
    setIsOpen(false);
    onConfirm && onConfirm();
  }, [onConfirm]);

  const handleClickCancel = useCallback(() => {
    setIsOpen(false);
    onCancel && onCancel();
  }, [onCancel]);

  const handleClickClose = useCallback(() => {
    setIsOpen(false);
    onClose && onClose;
  }, [onClose]);

  return (
    <Fragment>
      <div onClick={() => setIsOpen(true)}>{trigger}</div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className={styles.container} onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter={styles.background.enter}
            enterFrom={styles.background.enterFrom}
            enterTo={styles.background.enterTo}
            leave={styles.background.leave}
            leaveFrom={styles.background.leaveFrom}
            leaveTo={styles.background.leaveTo}
          >
            <div className={styles.background.content} />
          </Transition.Child>

          <div className={styles.content}>
            <div className={styles.wrapper}>
              <Transition.Child
                as={Fragment}
                enter={styles.modal.enter}
                enterFrom={styles.modal.enterFrom}
                enterTo={styles.modal.enterTo}
                leave={styles.modal.leave}
                leaveFrom={styles.modal.leaveFrom}
                leaveTo={styles.modal.leaveTo}
              >
                <Dialog.Panel className={styles.modal.container}>
                  <div className={styles.modal.head}>
                    <button
                      type="button"
                      className={styles.modal.close.button}
                      onClick={handleClickClose}
                    >
                      <span className={styles.modal.close.span}>Close</span>
                      <XIcon
                        className={styles.modal.close.icon}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <div className={styles.modal.body}>{children}</div>

                  {(onConfirm || onCancel) && (
                    <div className={styles.modal.foot}>
                      {onConfirm && (
                        <button
                          type="button"
                          className={styles.modal.confirm.button}
                          onClick={handleClickConfirm}
                        >
                          Confirm
                        </button>
                      )}
                      {onCancel && (
                        <button
                          type="button"
                          className={styles.modal.cancel.button}
                          onClick={handleClickCancel}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </Fragment>
  );
};

export default Modal;
