import { ArrowLeft, Lock } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { auth, signInWithEmailAndPassword } from '../../../firebase.config';
import welcomeBackPng from '../../assets/images/welcomeBack.png';
import {
  BtnShadowLinearComponent,
  CheckedButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('demo01@gmail.com');
  const [password, setPassword] = useState('demo01');
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (email || password) {
      setErrorText('');
    }
  }, [email, password]);

  const handleLoginWithEmail = async () => {
    if (!email || !password) {
      setErrorText('Please enter your email or password!');
    } else {
      setErrorText('');
      setIsLoading(true);

      await signInWithEmailAndPassword(auth, email, password)
        .then(async userCredential => {
          // Signed in
          setIsLoading(false);
          const user = userCredential.user;
          if(remember){
            await AsyncStorage.setItem('user', user.email as string);
          }
        })
        .catch((error: any) => {
          console.log(error);
          setIsLoading(false);
          setErrorText(error.message);
        });
    }
  };

  return (
    <ImageBackground
      source={welcomeBackPng}
      imageStyle={{ resizeMode: 'cover' }}
      style={{ flex: 1, alignItems: 'center' }}
    >
      <SectionComponent styles={{ backgroundColor: 'transparent', top: '6%' }}>
        <RowComponent styles={{ width: '100%' }}>
          <ArrowLeft
            size={28}
            color={colors.background}
            onPress={() => navigation.goBack()}
          />
          <TextComponent
            text="Welcome"
            color={colors.background}
            size={sizes.thinTitle}
            flex={1}
            font={fontFamillies.poppinsBold}
            styles={{
              textAlign: 'center',
            }}
          />
        </RowComponent>
      </SectionComponent>

      <View
        style={{
          backgroundColor: colors.background1,
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 0,
          paddingVertical: 20,
          borderRadius: 10,
        }}
      >
        <SectionComponent>
          <TextComponent
            text="Welcome back !"
            font={fontFamillies.poppinsSemiBold}
            size={sizes.title}
          />
          <TextComponent
            text="Sign in to your account"
            color={colors.text}
            size={sizes.bigText}
            font={fontFamillies.poppinsRegular}
          />

          <SpaceComponent height={16} />

          <InputComponent
            styles={{
              backgroundColor: colors.background,
              paddingVertical: 12,
              paddingHorizontal: 26,
              borderRadius: 5,
            }}
            allowClear
            prefix={<Fontisto name="email" color={colors.text} size={26} />}
            placeholder="Email Address"
            placeholderTextColor={colors.text}
            color={colors.background}
            value={email}
            onChange={val => setEmail(val)}
          />
          <InputComponent
            styles={{
              backgroundColor: colors.background,
              paddingVertical: 12,
              paddingHorizontal: 26,
              borderRadius: 5,
            }}
            prefix={<Lock color={colors.text} size={26} />}
            color={colors.background}
            value={password}
            isPassword
            textStyles={{
              color: colors.text,
            }}
            onChange={val => setPassword(val)}
          />

          <RowComponent justify="space-between">
            <CheckedButtonComponent
              onPress={() => setRemember(!remember)}
              title="Remember me"
              titleStyles={{
                fontFamily: fontFamillies.poppinsMedium,
                fontSize: sizes.bigText,
                color: colors.text,
              }}
              value={remember}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPasswordScreen')}
            >
              <TextComponent
                text="Forgot password"
                color={colors.blue}
                size={sizes.bigText}
                font={fontFamillies.poppinsMedium}
              />
            </TouchableOpacity>
          </RowComponent>

          {errorText !== '' && (
            <TextComponent
              text={errorText}
              color={colors.red}
              font={fontFamillies.poppinsSemiBold}
              size={sizes.smallText}
              styles={{
                marginTop: 8,
              }}
            />
          )}

          <SpaceComponent height={16} />

          <BtnShadowLinearComponent
            title="Login"
            onPress={handleLoginWithEmail}
            isLoading={isLoading}
            
          />

          <RowComponent justify="center">
            <TextComponent
              text="Don’t have an account ?"
              size={sizes.bigText}
              font={fontFamillies.poppinsLight}
              color={colors.text}
            />
            <SpaceComponent width={10} />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <TextComponent
                text="Sign up"
                color={colors.text2}
                size={sizes.bigText}
                font={fontFamillies.poppinsMedium}
              />
            </TouchableOpacity>
          </RowComponent>
        </SectionComponent>
      </View>
    </ImageBackground>
  );
};

export default Login;
