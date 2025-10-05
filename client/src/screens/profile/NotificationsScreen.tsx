import { serverTimestamp, where } from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  BtnShadowLinearComponent,
  Container,
  LoadingComponent,
  NotificationItemComponent,
  SectionComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { notificationItems } from '../../constants/dataSetDefault';
import { getDocsData } from '../../constants/getDocsData';
import { setDocData } from '../../constants/setDocData';
import { SettingModel } from '../../models/SettingModel';
import useSettingStore from '../../zustand/store/useSettingStore';
import useUserStore from '../../zustand/store/useUserStore';

const NotificationsScreen = () => {
  const { user } = useUserStore();
  const [disable, setDisable] = useState(true);
  const [settingsData, setSettingsData] = useState<SettingModel[]>([]);
  const { setting, setSetting } = useSettingStore();

  useEffect(() => {
    if (user) {
      getDocsData({
        nameCollect: 'settings',
        condition: [where('userId', '==', user.id)],
        setData: setSettingsData,
      });
    }
  }, [user]);

  useEffect(() => {
    if (settingsData) {
      setSetting(settingsData[0]);
    }
  }, [settingsData]);

  useEffect(() => {
    if (
      settingsData[0] && setting &&
      settingsData[0].allowNotifications === setting.allowNotifications &&
      settingsData[0].emailNotifications === setting.emailNotifications &&
      settingsData[0].orderNotifications === setting.orderNotifications &&
      settingsData[0].generalNotifications === setting.generalNotifications
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [setting]);

  const handleChangeSetting = () => {
    setDocData({
      nameCollect: 'settings',
      id: setting?.id as string,
      valueUpdate: {
        ...setting,
        updateAt: serverTimestamp(),
      },
    });

    setDisable(true)
  };

  return setting ? (
    <Container bg={colors.background} back title="Notifications">
      <SectionComponent
        styles={{
          backgroundColor: colors.background1,
          flex: 1,
          paddingVertical: 20,
          marginBottom: 0,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          {notificationItems.map((_, index) => (
            <NotificationItemComponent
              key={index}
              title={_.title}
              description={_.description}
              value={setting[_.key as keyof SettingModel] as boolean}
              onPress={val => setSetting({ ...setting, [_.key]: val })}
            />
          ))}
        </View>

        <BtnShadowLinearComponent
          disable={disable}
          onPress={handleChangeSetting}
          title="Save settings"
        />
      </SectionComponent>
    </Container>
  ) : (
    <LoadingComponent size={30} />
  );
};

export default NotificationsScreen;
