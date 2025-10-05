import { serverTimestamp, where } from '@react-native-firebase/firestore';
import { AddCircle } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  AddressItemComponent,
  BtnShadowLinearComponent,
  Container,
  SectionComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { getDocsData } from '../../constants/getDocsData';
import { setDocData } from '../../constants/setDocData';
import useAddressStore from '../../zustand/store/useAddressStore';
import useUserStore from '../../zustand/store/useUserStore';

const AddressScreen = ({ navigation }: any) => {
  const [addressDefault, setAddressDefault] = useState('');
  const [disable, setDisable] = useState(false);
  const { user } = useUserStore()
  const { addresses, setAddresses, editAddress } = useAddressStore()

  useEffect(() => {
    if (user) {
      getDocsData({
        nameCollect: 'addresses',
        condition: [where('userId', '==', user.id)],
        setData: setAddresses
      })
    }
  }, [user]);

  useEffect(() => {
    if (addresses.length > 0) {
      addresses.map(_ => {
        _.default && setAddressDefault(_.id);
      });
    }
  }, [addresses]);

  useEffect(() => {
    if (addresses.length > 0) {
      const index = addresses.findIndex(_ => _.default);
      if (['', addresses[index].id].includes(addressDefault)) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  }, [addressDefault]);


  const handleChangeAddressDefault = () => {
    const index = addresses.findIndex(_ => _.default);
    const indexDefault = addresses.findIndex(_ => _.id === addressDefault)

    editAddress(addresses[index].id, { ...addresses[index], default: false })
    editAddress(addressDefault, { ...addresses[indexDefault], default: true })

    setDocData({
      nameCollect: 'addresses',
      id: addresses[index].id,
      valueUpdate: { default: false, updateAt: serverTimestamp() },
    });
    setDocData({
      nameCollect: 'addresses',
      id: addressDefault,
      valueUpdate: { default: true, updateAt: serverTimestamp() },
    });

    setDisable(true)
  };

  return (
    <Container
      bg={colors.background}
      back
      title="My Address"
      right={
        <AddCircle
          size={26}
          color={colors.text2}
          onPress={() => navigation.navigate('AddAdressScreen', { addressDefault })}
        />
      }
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background1,
        }}
      >
        <SectionComponent
          styles={{
            paddingTop: 20,
            marginBottom: 0,
            flex: 1,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {addresses.map((_, index) => (
              <AddressItemComponent
                key={index}
                address={_}
                value={addressDefault}
                onPress={val => setAddressDefault(val)}
              />
            ))}
          </ScrollView>
        </SectionComponent>

        <SectionComponent>
          <BtnShadowLinearComponent
            onPress={handleChangeAddressDefault}
            title="Save settings"
            disable={disable}
          />
        </SectionComponent>
      </View>
    </Container>
  );
};

export default AddressScreen;
