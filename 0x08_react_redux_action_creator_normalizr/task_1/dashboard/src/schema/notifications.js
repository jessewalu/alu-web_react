import { normalize, schema } from 'normalizr';
import * as notificationsData from '../../notifications.json';

const notifications = notificationsData.default;

export const getAllNotificationsByUser = (userId) => (
  notifications
    .filter((notification) => notification.author.id === userId)
    .map((notification) => notification.context)
);

const user = new schema.Entity('users');

const message = new schema.Entity(
  'messages',
  {},
  { idAttribute: 'guid' },
);

const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});

export const normalizedData = normalize(notifications, [notification]);
