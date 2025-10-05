import { signInWithPhoneNumber } from '@react-native-firebase/auth';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
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
import { flags } from '../../constants/flags';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';
import { validVNPhone } from '../../constants/validateEmailPhone';
import useVerifyPhoneStore from '../../zustand/store/useVerifyPhoneStore';

const VerifyNumberScreen = ({ navigation }: any) => {
  const [country, setCountry] = useState(flags[0]);
  const [phone, setPhone] = useState('912345678');
  const [disable, setDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowCountry, setIsShowCountry] = useState(false);
  const { setVerifyPhone } = useVerifyPhoneStore();

  useEffect(() => {
    if (phone && validVNPhone(country.phone + phone)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [phone]);

  const handleSendOTP = async () => {
    const phoneFull = country.phone + phone;
    setIsLoading(true)
    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneFull);
      setVerifyPhone(confirmation);
      navigation.navigate('OTPScreen', {phoneFull});
      console.log('✅ OTP đã gửi tới: ', phone);
      setIsLoading(false)
    } catch (err) {
      console.error('❌ Lỗi gửi OTP: ', err);
    }
  };
  return (
    <Container bg={colors.background1} back title="Verify Number">
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
            text="Verify your number"
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

        <RowComponent
          styles={{
            backgroundColor: colors.background,
            height: 56,
            paddingHorizontal: 10,
          }}
        >
          <RowComponent
            styles={{
              paddingHorizontal: 10,
              width: 100,
            }}
          >
            <Image
              source={{ uri: country.icon }}
              style={{ width: 30, height: 30 }}
            />
            <TextComponent
              text={country.phone}
              size={sizes.bigText}
              font={fontFamillies.poppinsMedium}
              styles={{
                marginHorizontal: 4,
              }}
            />

            {isShowCountry ? (
              <ArrowUp2
                size={16}
                color={colors.text}
                variant="Bold"
                onPress={() => setIsShowCountry(!isShowCountry)}
              />
            ) : (
              <ArrowDown2
                size={16}
                color={colors.text}
                variant="Bold"
                onPress={() => setIsShowCountry(!isShowCountry)}
              />
            )}
          </RowComponent>

          <View
            style={{
              borderLeftWidth: 2,
              borderLeftColor: colors.border,
              height: '100%',
            }}
          />

          <InputComponent
            placeholder="Number phone"
            placeholderTextColor={colors.text}
            styles={{
              backgroundColor: colors.background,
              paddingVertical: 12,
              paddingHorizontal: 26,
              borderRadius: 5,
              marginBottom: 0,
              flex: 1,
            }}
            color={colors.background}
            value={phone}
            allowClear
            textStyles={{
              color: colors.text2,
              fontFamily: fontFamillies.poppinsMedium,
              fontSize: sizes.bigText,
            }}
            onChange={val => setPhone(val)}
          />
        </RowComponent>
        {isShowCountry && (
          <>
            {flags.map((flag, index) => (
              <RowComponent
                onPress={() => {
                  setCountry(flag);
                  setIsShowCountry(false);
                }}
                key={index}
                styles={{
                  backgroundColor: colors.background,
                  height: 56,
                  paddingHorizontal: 10,
                  borderTopWidth: 1,
                  borderTopColor: colors.border,
                }}
              >
                <RowComponent
                  styles={{
                    paddingHorizontal: 10,
                  }}
                >
                  <Image
                    source={{ uri: flag.icon }}
                    style={{
                      height: 30,
                      width: 30,
                    }}
                  />
                  <TextComponent
                    text={flag.phone}
                    size={sizes.bigText}
                    font={fontFamillies.poppinsMedium}
                    styles={{
                      marginHorizontal: 4,
                    }}
                  />
                </RowComponent>

                <TextComponent
                  text={flag.title}
                  font={fontFamillies.poppinsMedium}
                />
              </RowComponent>
            ))}
          </>
        )}

        <SpaceComponent height={10} />

        <BtnShadowLinearComponent
          disable={disable}
          isLoading={isLoading}
          title="Next"
          onPress={handleSendOTP}
        />

        <TextComponent
          text="Resend confirmation code (1:23)"
          font={fontFamillies.poppinsLight}
          size={sizes.bigText}
          styles={{
            textAlign: 'center',
          }}
        />
      </SectionComponent>
    </Container>
  );
};

export default VerifyNumberScreen;
