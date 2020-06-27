import addNotification from 'react-push-notification';

export const pushNotification = (
  message,
  subtitle,
  title = 'New Message',
) => {
  addNotification({
    title: title,
    subtitle: 'From Troperial',
    message: message,
    theme: 'darkblue',
    native: true, // when using native, your OS will handle theming.
    duration: 3000, //optional, default: 5000,
  });
};

// title: 'title',
// subtitle: 'subtitle', //optional
// message: 'message', //optional
// onClick: (e: Event | Notification) => void, //optional, onClick callback.
// theme: 'red', //optional, default: undefined
// backgroundTop: 'green', //optional, background color of top container.
// backgroundBottom: 'darkgreen', //optional, background color of bottom container.
// colorTop: 'green', //optional, font color of top container.
// colorBottom: 'darkgreen', //optional, font color of bottom container.
// closeButton: 'Go away', //optional, text or html/jsx element for close text. Default: Close,
// native?: boolean, //optional, makes the push notification a native OS notification
// icon?: string, // optional, Native only. Sets an icon for the notification.
// vibrate?: number | number[], // optional, Native only. Sets a vibration for the notification.
// silent?: boolean // optional, Native only. Makes the notification silent.
