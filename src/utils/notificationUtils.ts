import type { NotificationWithDetails } from '../types/notification';

export function formatNotificationMessage(notification: NotificationWithDetails): {
  title: string;
  message: string;
} {
  switch (notification.type) {
    case 'manuscript_submitted':
      return {
        title: 'New Manuscript Submitted',
        message: `"${notification.manuscript?.title}" has been submitted for review.`
      };
    case 'review_assigned':
      return {
        title: 'Review Assignment',
        message: `You have been assigned to review "${notification.manuscript?.title}".`
      };
    case 'review_submitted':
      return {
        title: 'Review Submitted',
        message: `A new review has been submitted for "${notification.manuscript?.title}".`
      };
    case 'revision_requested':
      return {
        title: 'Revision Requested',
        message: `A revision has been requested for "${notification.manuscript?.title}".`
      };
    default:
      return {
        title: 'Notification',
        message: notification.message || ''
      };
  }
}

export function groupNotificationsByDate(notifications: NotificationWithDetails[]) {
  return notifications.reduce((groups, notification) => {
    const date = new Date(notification.created_at).toLocaleDateString();
    return {
      ...groups,
      [date]: [...(groups[date] || []), notification]
    };
  }, {} as Record<string, NotificationWithDetails[]>);
}