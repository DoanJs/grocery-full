import { serverTimestamp } from '@react-native-firebase/firestore';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { auth } from '../../../firebase.config';
import {
  BtnShadowLinearComponent,
  CheckedButtonComponent,
  Container,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { addDocData } from '../../constants/addDocData';
import { colors } from '../../constants/colors';
import { addressItems } from '../../constants/dataSetDefault';
import { flags } from '../../constants/flags';
import { fontFamillies } from '../../constants/fontFamilies';
import { setDocData } from '../../constants/setDocData';
import useAddressStore from '../../zustand/store/useAddressStore';

const initialAddress = {
  userId: '',
  name: '',
  email: '',
  address: '',
  phone: '',
  city: '',
  zipCode: '',
  country: '',
  default: false,
  createAt: serverTimestamp(),
  updateAt: serverTimestamp(),
};

const AddAdressScreen = ({ navigation, route }: any) => {
  const user = auth.currentUser;
  const { params } = route;
  const [form, setForm] = useState<any>(initialAddress);
  const [textError, setTextError] = useState('');
  const [saved, setSaved] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [disable, setDisable] = useState(true);
  const { addresses, addAddress, editAddress } = useAddressStore()

  useEffect(() => {
    if (textError) {
      setTimeout(() => {
        setTextError('');
      }, 3000);
    }
  }, [textError]);

  useEffect(() => {
    if (!form.name &&
      !form.address &&
      !form.phone &&
      !form.email &&
      !form.zipCode &&
      !form.city &&
      !form.country) {
      setDisable(true)
    } else {
      setDisable(false)
    }
  }, [form])

  const handleAddAddress = () => {
    if (
      !form.name ||
      !form.address ||
      !form.phone ||
      !form.email ||
      !form.zipCode ||
      !form.city ||
      !form.country
    ) {
      setTextError('Vui lòng không bỏ trống các thông tin !');
    } else {
      let isDefault: boolean = false;
      if (saved && addresses.length > 0) {
        const indexDefault = addresses.findIndex(_ => _.id === params.addressDefault)
        editAddress(
          params.addressDefault,
          { ...addresses[indexDefault], default: false }
        )
        setDocData({
          nameCollect: 'addresses',
          id: params.addressDefault,
          valueUpdate: {
            default: false,
            updateAt: serverTimestamp()
          },
        });
        isDefault = true;
      }

      addDocData({
        nameCollect: 'addresses',
        value: {
          ...form,
          userId: user?.uid,
          default: addresses.length === 0 ? true : isDefault,
        },
      }).then(result => addAddress({
        ...form,
        userId: user?.uid,
        default: addresses.length === 0 ? true : isDefault,
        id: result.id
      }));
      
      navigation.goBack();
    }
  };

  return (
    <Container bg={colors.background} back title="Add Address">
      <SectionComponent
        styles={{
          backgroundColor: colors.background1,
          paddingVertical: 20,
          flex: 1,
          marginBottom: 0,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {addressItems.map((_, index) => (
            <InputComponent
              key={index}
              styles={{
                backgroundColor: colors.background,
                paddingVertical: 12,
                paddingHorizontal: 26,
                borderRadius: 5,
                marginBottom: _.title === 'Country' && showCountries ? 0 : 16,
              }}
              allowClear
              prefix={_.icon}
              affix={
                _.title === 'Country' && (
                  <>
                    {showCountries ? (
                      <ArrowUp2
                        size={20}
                        color={colors.text}
                        variant="Bold"
                        onPress={() => setShowCountries(!showCountries)}
                      />
                    ) : (
                      <ArrowDown2
                        size={20}
                        color={colors.text}
                        variant="Bold"
                        onPress={() => setShowCountries(!showCountries)}
                      />
                    )}
                  </>
                )
              }
              editable={_.title === 'Country' ? false : true}
              placeholder={_.title}
              placeholderTextColor={colors.text}
              color={colors.background}
              value={form[_.name]}
              onChange={val => setForm({ ...form, [_.name]: val })}
            />
          ))}

          {showCountries && (
            <SectionComponent
              styles={{
                backgroundColor: colors.background,
              }}
            >
              {flags.map((_, index) => (
                <RowComponent
                  key={index}
                  onPress={() => {
                    setShowCountries(false)
                    setForm({ ...form, country: _.title });
                  }}
                  styles={{
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    paddingVertical: 10,
                  }}
                >
                  <Image
                    source={{
                      uri: _.icon,
                    }}
                    style={{
                      resizeMode: 'cover',
                      height: 30,
                      width: 30,
                    }}
                  />
                  <SpaceComponent width={10} />
                  <TextComponent text={_.title} />
                </RowComponent>
              ))}
            </SectionComponent>
          )}
          <CheckedButtonComponent
            title={`set default this address ${addresses.length === 0 && '(require is true in field)'}`}
            onPress={() => setSaved(addresses.length === 0 ? true : !saved)}
            value={addresses.length === 0 ? true : saved}
          />
          {textError && (
            <View>
              <SpaceComponent height={8} />
              <TextComponent
                text={textError}
                color={colors.red}
                font={fontFamillies.poppinsLight}
                styles={{
                  fontStyle: 'italic',
                }}
              />
            </View>
          )}
        </ScrollView>
      </SectionComponent>

      <SectionComponent>
        <BtnShadowLinearComponent
          disable={disable}
          onPress={handleAddAddress}
          title="Add address"
        />
      </SectionComponent>
    </Container>
  );
};

export default AddAdressScreen;
