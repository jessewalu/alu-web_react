import * as notificationsData from '../../notifications.json';

const notifications = notificationsData.default;

export const getAllNotificationsByUser = (userId) => (
  notifications
    .filter((notification) => notification.author.id === userId)
    .map((notification) => notification.context)
);
