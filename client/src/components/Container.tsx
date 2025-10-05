import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'iconsax-react-native';
import React, { ReactNode } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { RowComponent, TextComponent } from '.';
import { colors } from '../constants/colors';
import { fontFamillies } from '../constants/fontFamilies';
import { globalStyles } from '../styles/globalStyles';

type Props = {
  children: ReactNode;
  title?: string;
  back?: boolean;
  left?: ReactNode;
  right?: ReactNode;
  center?: ReactNode;
  isScroll?: boolean;
  bg?: string;
};

const Container = (props: Props) => {
  const navigation: any = useNavigation();
  const { children, title, back, left, right, center, isScroll, bg } = props;
  const localStyle = StyleSheet.create({
    header: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 42,
    },
    title: { paddingHorizontal: 16, flex: 1, alignItems: 'center' },
  });

  return (
    <SafeAreaView
      style={[
        globalStyles.container,
        { backgroundColor: bg ?? colors.background },
      ]}
    >
      {(back || left || right || title) && (
        <RowComponent styles={[localStyle.header]}>
          {back && (
            <ArrowLeft
              size={26}
              color={colors.text2}
              onPress={() => navigation.goBack()}
            />
          )}
          {/* {left && !back && <TextComponent text="Left" />} */}
          {title && (
            <View style={[localStyle.title]}>
              <TextComponent
                type="thinTitle"
                font={fontFamillies.poppinsBold}
                text={title}
              />
            </View>
          )}
          {center && center}
          {right && right}
        </RowComponent>
      )}
      {!isScroll ? (
        <View style={[globalStyles.container]}>{children}</View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[globalStyles.container]}
        >
          {children}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Container;
