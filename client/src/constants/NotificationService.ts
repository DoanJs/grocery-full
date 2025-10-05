// notificationService.js
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

/**
 * Hiển thị notification bằng Notifee
 */
async function showNotification(remoteMessage: any) {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  const title = remoteMessage.notification?.title || remoteMessage.data?.title;
  const body = remoteMessage.notification?.body || remoteMessage.data?.body;

  await notifee.displayNotification({
    title,
    body,
    data: remoteMessage.data,
    android: {
      channelId,
      pressAction: { id: 'default' }, // click notification chính
    },
  });
}

/**
 * Foreground handler
 */
export function registerForegroundHandler() {
  // Khi app đang mở
  messaging().onMessage(async remoteMessage => {
    console.log('[FCM Foreground]', remoteMessage);
    await showNotification(remoteMessage);
  });

  // Xử lý user click / dismiss khi app mở
  notifee.onForegroundEvent(({ type, detail }: any) => {
    if (type === EventType.PRESS) {
      console.log('User click notification (foreground):', detail.notification.data);
    }
    if (type === EventType.ACTION_PRESS) {
      console.log('User click action button:', detail.pressAction.id);
    }
    if (type === EventType.DISMISSED) {
      console.log('Notification dismissed (foreground):', detail.notification?.id);
    }
  });
}

/**
 * Background handler
 */
export function registerBackgroundHandler() {
  // Khi FCM gửi xuống lúc app ở background / kill
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('[FCM Background]', remoteMessage);
    await showNotification(remoteMessage);
  });

  // Khi user click notification lúc app background / kill
  notifee.onBackgroundEvent(async ({ type, detail }: any) => {
    console.log('[Notifee Background Event]', type, detail);

    if (type === EventType.PRESS) {
      console.log('User click notification (background/kill):', detail.notification?.data);
    }
    if (type === EventType.ACTION_PRESS) {
      console.log('User click action button:', detail.pressAction.id);
    }
    if (type === EventType.DISMISSED) {
      console.log('Notification dismissed (background):', detail.notification?.id);
    }
    if (type === EventType.DELIVERED) {
      console.log('Notification delivered to device:', detail.notification?.id);
    }
  });
}

/**
 * Khi app được mở từ trạng thái kill nhờ notification
 */
export async function checkInitialNotification() {
  const initialNotification = await notifee.getInitialNotification();
  if (initialNotification) {
    console.log('[Initial Notification]', initialNotification.notification.data);
    // ví dụ điều hướng:
    // navigation.navigate('Detail', { id: initialNotification.notification.data?.id });
  }
}
