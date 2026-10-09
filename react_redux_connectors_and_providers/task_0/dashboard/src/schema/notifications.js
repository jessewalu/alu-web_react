import { normalize, schema } from 'normalizr';
import * as notificationsData from '../../notifications.json';

const notifications = notificationsData.default;

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

export const notificationsNormalizer = (data) => normalize(data, [notification]);

export const getAllNotificationsByUser = (userId) => {
  const { notifications: notificationsById, messages } = normalizedData.entities;
  const contexts = [];

  for (const id of normalizedData.result) {
    const item = notificationsById[id];

    if (item.author === userId) {
      contexts.push(messages[item.context]);
    }
  }

  return contexts;
};
