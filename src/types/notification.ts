export interface NotificationPreferences {
  emailNotifications: boolean;
  desktopNotifications: boolean;
  notificationTypes: {
    manuscript_submitted: boolean;
    review_assigned: boolean;
    review_submitted: boolean;
    revision_requested: boolean;
    manuscript_approved: boolean;
    manuscript_rejected: boolean;
  };
}

export interface NotificationGroup {
  date: string;
  notifications: NotificationWithDetails[];
}