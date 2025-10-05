import { ArrowRight2, Camera } from 'iconsax-react-native';
import React from 'react';
import { Image, View } from 'react-native';
import {
  Container,
  LoadingComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { profileItems } from '../../constants/dataSetDefault';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';
import useUserStore from '../../zustand/store/useUserStore';

const ProfileScreen = ({ navigation }: any) => {
  const { user } = useUserStore()

  return !user ? (
    <LoadingComponent size={30} />
  ) : (
    <Container bg={colors.background}>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            top: '60%',
            zIndex: 1,
          }}
        >
          <View
            style={{
              marginBottom: 10,
              position: 'relative',
            }}
          >
            <Image
              source={{ uri: user.url }}
              style={{
                resizeMode: 'cover',
                borderRadius: 100,
                height: 120,
                width: 120,
              }}
            />
            <View
              style={{
                backgroundColor: colors.green,
                padding: 4,
                position: 'absolute',
                borderRadius: 100,
                bottom: 0,
                right: 10,
              }}
            >
              <Camera size={16} color={colors.background} variant="Bold" />
            </View>
          </View>
          <TextComponent
            text={user.name}
            font={fontFamillies.poppinsSemiBold}
            size={sizes.bigText}
          />
          <TextComponent text={user.email} color={colors.text} />
        </View>
      </SectionComponent>

      <SectionComponent
        styles={{
          paddingTop: 100,
          backgroundColor: colors.background1,
          flex: 1,
          marginBottom: 0,
          paddingHorizontal: 32,
        }}
      >
        {profileItems.map((_, index) => (
          <RowComponent
            key={index}
            justify="space-between"
            styles={{
              alignItems: 'center',
              marginVertical: 10,
            }}
            onPress={() => navigation.navigate(_.screen)}
          >
            {_.icon}
            <SpaceComponent width={16} />
            <TextComponent
              text={_.title}
              font={fontFamillies.poppinsSemiBold}
              flex={1}
            />
            <ArrowRight2 color={colors.text} size={20} />
          </RowComponent>
        ))}
      </SectionComponent>
    </Container>
  );
};

export default ProfileScreen;
