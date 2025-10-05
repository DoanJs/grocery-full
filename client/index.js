/**
 * @format
 */
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { getApp } from '@react-native-firebase/app';
import { setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import { AppRegistry, Linking } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { messaging } from './firebase.config';

getApp();
/**
 * Xử lý thông báo foreground (Android), khi người dùng click/dismiss vào thông báo
 */
notifee.onForegroundEvent(({ type, detail }) => {
  if (type === EventType.PRESS) {
    const { data } = detail.notification;

    if (data && data.type === 'review') {
      Linking.openURL(`grocery://product/review/${data.id}`);
    }
  }
  if (type === EventType.ACTION_PRESS) {
    console.log('User click action button:', detail.pressAction.id);
  }
  if (type === EventType.DISMISSED) {
    console.log(
      'Notification dismissed (foreground):',
      detail.notification?.id,
    );
  }
});
/**
 * Xử lý thông báo background (Android)
 */
setBackgroundMessageHandler(messaging, async remoteMessage => {
  const channelId = await notifee.createChannel({
    id: `default`,
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
  // Hiển thị thông báo
  await notifee.displayNotification({
    title: remoteMessage.data?.title ?? '',
    body: remoteMessage.data?.body ?? '',
    data: remoteMessage.data ?? {},
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
});

// phải đặt ở đây, để luôn chạy kể cả khi app kill
notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { data } = detail.notification;
  if (type === EventType.PRESS) {
    if (data && data.type === 'review') {
      Linking.openURL(`grocery://product/review/${data.id}`);
    }
  }

  if (type === EventType.ACTION_PRESS) {
    console.log('User pressed action:', detail.pressAction.id);
  }

  if (type === EventType.DISMISSED) {
    console.log('Notification dismissed:', detail.notification?.id);
  }

  if (type === EventType.DELIVERED) {
    console.log('Notification delivered to device (may or may not be shown)');
  }
});
AppRegistry.registerComponent(appName, () => App);
