import { sendPasswordResetEmail } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
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
import { validateEmail } from '../../constants/validateEmailPhone';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (email && validateEmail(email)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [email]);

  const handleResetPassword = async () => {
    try {
      sendPasswordResetEmail(auth, email).then(result => console.log(result))
      Alert.alert('Check your email', 'We sent you a password reset link.');
      setEmail('')
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Container bg={colors.background1} back title="Password Recovery">
      <SectionComponent
        styles={{
          flex: 1,
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '35%',
          }}
        >
          <TextComponent
            text="Forgot Password"
            font={fontFamillies.poppinsSemiBold}
            size={sizes.title}
          />
          <TextComponent
            styles={{
              textAlign: 'center',
              width: '80%',
            }}
            text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy"
            font={fontFamillies.poppinsMedium}
            size={sizes.bigText}
            color={colors.text}
          />
        </View>

        <InputComponent
          placeholder="Email Address"
          placeholderTextColor={colors.text}
          styles={{
            backgroundColor: colors.background,
            paddingVertical: 12,
            paddingHorizontal: 26,
            borderRadius: 5,
            width: '100%',
          }}
          prefix={<Fontisto name="email" size={20} color={colors.text} />}
          color={colors.background}
          value={email}
          allowClear
          textStyles={{
            color: colors.text,
          }}
          onChange={val => setEmail(val)}
        />

        <RowComponent justify="center">
          <TextComponent
            text="Do not have email ? "
            font={fontFamillies.poppinsMedium}
            color={colors.text}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('VerifyNumberScreen')}
          >
            <TextComponent

              text="verify phone"
              font={fontFamillies.poppinsMedium}
              color={colors.link}
            />
          </TouchableOpacity>
        </RowComponent>

        <SpaceComponent height={10} />

        <BtnShadowLinearComponent
          disable={disable}
          title="Send link"
          onPress={handleResetPassword}
        />
      </SectionComponent>
    </Container>
  );
};

export default ForgotPasswordScreen;
