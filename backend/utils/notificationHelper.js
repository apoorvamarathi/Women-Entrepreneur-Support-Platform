const Notification = require('../models/Notification');

/**
 * Create a notification for a user
 * @param {string} userId - User ID
 * @param {string} message - Notification message
 */
const createNotification = async (userId, message) => {
  try {
    const notification = await Notification.create({
      userId,
      message,
      status: 'unread'
    });
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

/**
 * Create notifications for multiple users
 * @param {array} userIds - Array of user IDs
 * @param {string} message - Notification message
 */
const createBulkNotifications = async (userIds, message) => {
  try {
    const notifications = userIds.map(userId => ({
      userId,
      message,
      status: 'unread'
    }));
    await Notification.insertMany(notifications);
  } catch (error) {
    console.error('Error creating bulk notifications:', error);
  }
};

module.exports = {
  createNotification,
  createBulkNotifications
};
