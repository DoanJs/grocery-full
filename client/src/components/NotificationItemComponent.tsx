import React from 'react';
import { View } from 'react-native';
import { RowComponent, SpaceComponent, TextComponent } from '.';
import { colors } from '../constants/colors';
import { fontFamillies } from '../constants/fontFamilies';
import { sizes } from '../constants/sizes';

interface Props {
  title: string;
  description: string;
  value: boolean;
  onPress: (val: any) => void;
}

const NotificationItemComponent = (props: Props) => {
  const { title, description, value, onPress } = props;

  return (
    <RowComponent
      justify="space-between"
      styles={{
        backgroundColor: colors.background,
        padding: 20,
        marginVertical: 6,
      }}
    >
      <RowComponent
        styles={{
          flexDirection: 'column',
          flex: 1,
          alignItems: 'flex-start',
        }}
      >
        <TextComponent
          text={title}
          font={fontFamillies.poppinsSemiBold}
          size={sizes.bigText}
        />
        <SpaceComponent height={10} />
        <TextComponent
          text={description}
          font={fontFamillies.poppinsMedium}
          size={sizes.smallText}
          styles={{
            width: '70%',
          }}
        />
      </RowComponent>

      <RowComponent onPress={() => onPress(!value)}>
        <View
          style={{
            height: 18,
            width: 32,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: value ? colors.primary : colors.text,
            flexDirection: 'row',
            justifyContent: value ? 'flex-end' : 'flex-start',
            backgroundColor: value ? colors.primary : 'transparent',
          }}
        >
          <View
            style={{
              width: 16,
              height: 16,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: value ? colors.primary : colors.text,
              backgroundColor: colors.background,
            }}
          />
        </View>
      </RowComponent>
    </RowComponent>
  );
};

export default NotificationItemComponent;
