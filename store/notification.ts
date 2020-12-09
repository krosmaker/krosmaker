export interface Notification {
  id: number;
  show: boolean;
  message: string;
  parameters?: any;
  color?: string;
}

interface NotificationState {
  counter: number;
  notifications: Notification[];
}

export const state: () => NotificationState = () => ({
  counter: 0,
  notifications: [],
});

export const mutations = {
  add(state: NotificationState, notification: Notification) {
    const index = state.counter++;
    notification.id = index;
    notification.show = true;
    notification.color = notification.color || "green";
    notification.parameters = notification.parameters || {};
    state.notifications.push(notification);
  },

  hide(state: NotificationState, index: number) {
    const notification = state.notifications.find(
      (notification) => notification.id === index
    );
    if (notification) {
      notification.show = false;
    }
  },

  remove(state: NotificationState, index: number) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== index
    );
  },
};
