import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from '@react-native-firebase/auth';
import { Call, Lock, Sms, User } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { auth } from '../../../firebase.config';
import {
  BtnShadowLinearComponent,
  Container,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';
import useUserStore from '../../zustand/store/useUserStore';

const AboutMeScreen = () => {
  const userFirebase = auth.currentUser;
  const { user } = useUserStore()
  const [value, setValue] = useState<any>({
    oldPass: '',
    newPass: '',
    confPass: '',
  });
  const [textError, setTextError] = useState('');
  const [disable, setDisable] = useState(true);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    if (textError) {
      setTimeout(() => {
        setTextError('');
      }, 3000);
    }
  }, [textError]);

  useEffect(() => {
    if (value.oldPass || value.newPass || value.confPass) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [value]);

  const handleChangePassword = async () => {
    if (
      userFirebase &&
      value.oldPass &&
      value.newPass &&
      value.confPass &&
      value.newPass === value.confPass
    ) {
      try {
        // Step 1: Re-authenticate
        const credential = EmailAuthProvider.credential(
          user?.email,
          value.oldPass,
        );
        setIsloading(true)
        await reauthenticateWithCredential(userFirebase, credential);

        // Step 2: Update password
        await updatePassword(userFirebase, value.newPass);
        setDisable(true);
        setIsloading(false)
        setValue({
          oldPass: '',
          newPass: '',
          confPass: ''
        })
      } catch (error: any) {
        console.error('Error:', error.message);
      }
    } else {
      setTextError(
        'Vui lòng không bỏ trống các thông tin và kiểm tra newPass, confPass',
      );
    }
  };

  return (
    <Container bg={colors.background} back title="About me">
      <View
        style={{
          backgroundColor: colors.background1,
          flex: 1,
        }}
      >
        <SectionComponent
          styles={{
            flex: 1,
            paddingVertical: 20,
          }}
        >
          <TextComponent
            text="Personal Details"
            font={fontFamillies.poppinsSemiBold}
            size={sizes.thinTitle}
          />

          <RowComponent
            styles={{
              backgroundColor: colors.background,
              padding: 16,
              borderRadius: 5,
              marginVertical: 4,
            }}
          >
            <User size={24} color={colors.text} />
            <SpaceComponent width={10} />
            <TextComponent
              text={`${user?.name}`}
              color={colors.text}
              font={fontFamillies.poppinsMedium}
              size={sizes.bigText}
            />
          </RowComponent>
          <RowComponent
            styles={{
              backgroundColor: colors.background,
              padding: 16,
              borderRadius: 5,
              marginVertical: 4,
            }}
          >
            <Sms size={24} color={colors.text} />
            <SpaceComponent width={10} />
            <TextComponent
              text={`${user?.email}`}
              color={colors.text}
              font={fontFamillies.poppinsMedium}
              size={sizes.bigText}
            />
          </RowComponent>
          <RowComponent
            styles={{
              backgroundColor: colors.background,
              padding: 16,
              borderRadius: 5,
              marginVertical: 4,
            }}
          >
            <Call size={24} color={colors.text} />
            <SpaceComponent width={10} />
            <TextComponent
              text={user?.phone ?? '+1  202  555  0142 '}
              color={colors.text}
              font={fontFamillies.poppinsMedium}
              size={sizes.bigText}
            />
          </RowComponent>

          <SpaceComponent height={20} />

          <TextComponent
            text="Change Password"
            font={fontFamillies.poppinsSemiBold}
            size={sizes.thinTitle}
          />
          <SpaceComponent height={16} />

          {[
            { title: 'Current password', value: 'oldPass' },
            { title: 'New password', value: 'newPass' },
            { title: 'Confirm password', value: 'confPass' },
          ].map((_, index) => (
            <InputComponent
              key={index}
              styles={{
                backgroundColor: colors.background,
                paddingVertical: 12,
                paddingHorizontal: 26,
                borderRadius: 5,
                marginBottom: 10,
              }}
              prefix={<Lock size={20} color={colors.text} />}
              placeholder={_.title}
              placeholderTextColor={colors.text}
              color={colors.background}
              value={value[_.value]}
              isPassword={index === 1 ? true : false}
              onChange={val => setValue({ ...value, [_.value]: val })}
            />
          ))}

          <TextComponent
            text={textError}
            color={colors.red}
            font={fontFamillies.poppinsLight}
          />
        </SectionComponent>

        <SectionComponent>
          <BtnShadowLinearComponent
            disable={disable}
            isLoading={isloading}
            onPress={handleChangePassword}
            title="Save settings"
          />
        </SectionComponent>
      </View>
    </Container>
  );
};

export default AboutMeScreen;
