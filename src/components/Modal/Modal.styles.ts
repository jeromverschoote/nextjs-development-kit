const styles = {
  container: 'relative z-10',

  background: {
    enter: 'ease-out duration-300',
    enterFrom: 'opacity-0',
    enterTo: 'opacity-100',
    leave: 'ease-in duration-200',
    leaveFrom: 'opacity-100',
    leaveTo: 'opacity-0',

    content: 'fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity',
  },

  content: 'fixed z-10 inset-0 overflow-y-auto',
  wrapper:
    'flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0',

  modal: {
    enter: 'ease-out duration-300',
    enterFrom: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
    enterTo: 'opacity-100 translate-y-0 sm:scale-100',
    leave: 'ease-in duration-200',
    leaveFrom: 'opacity-100 translate-y-0 sm:scale-100',
    leaveTo: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',

    container:
      'relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6',
    head: 'hidden sm:block absolute top-0 right-0 pt-4 pr-4',
    body: 'mt-10',
    foot: 'mt-5 sm:mt-6',

    close: {
      button:
        'bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none',
      span: 'sr-only',
      icon: 'h-6 w-6',
    },

    confirm: {
      button:
        'inline-flex justify-center w-full rounded-md border border-blue-600 hover:bg-white hover:text-blue-600 duration-200 shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 sm:text-sm',
    },

    cancel: {
      button:
        'inline-flex justify-center w-full rounded-md bg-white text-blue-600 border border-blue-600 hover:text-white duration-200 shadow-sm px-4 py-2 text-base font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 sm:text-sm mt-2',
    },
  },
};

export default styles;
