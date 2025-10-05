import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { TextComponent } from '.';
import { colors } from '../constants/colors';
import { fontFamillies } from '../constants/fontFamilies';
import { sizes } from '../constants/sizes';

interface Props {
  bg?: string;
  uri: string;
  text: string;
  styles?: StyleProp<ViewStyle>;
  imgStyles?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const CategoryItem = (props: Props) => {
  const { bg, uri, text, styles, imgStyles, onPress } = props;
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: 12,
        },
        styles,
      ]}
      onPress={onPress}
    >
      <View
        style={[
          {
            backgroundColor: bg,
            marginBottom: 8,
            paddingVertical: 16,
            borderRadius: 100,
            paddingHorizontal: 18,
          },
          imgStyles,
        ]}
      >
        <Image
          source={{uri: uri}}
          style={{
            height: 24,
            width: 24,
            resizeMode: 'contain',
          }}
        />
      </View>
      <TextComponent
        text={text}
        color={colors.text}
        font={fontFamillies.poppinsMedium}
        size={sizes.smallText}
      />
    </TouchableOpacity>
  );
};

export default CategoryItem;
