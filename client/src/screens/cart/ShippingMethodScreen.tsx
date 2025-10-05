import React, { useState } from 'react';
import { View } from 'react-native';
import {
  BtnShadowLinearComponent,
  Container,
  ProgressShippingComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';
import useShippingSettingStore from '../../zustand/store/useShippingSetting';

const data1 = [
  {
    title: '1',
    status: 'pending',
    description: 'DELIVERY',
  },
  {
    title: '2',
    status: 'waiting',
    description: 'ADDRESS',
  },
  {
    title: '3',
    status: 'waiting',
    description: 'PAYMENT',
  },
];
const data2 = [
  {
    title: 'Standard Delivery',
    description:
      'Order will be delivered between 3 - 4 business days straights to your doorstep.',
    price: 3,
  },
  {
    title: 'Next Day Delivery',
    description:
      'Order will be delivered between 3 - 4 business days straights to your doorstep.',
    price: 5,
  },
  {
    title: 'Nominated Delivery',
    description:
      'Order will be delivered between 3 - 4 business days straights to your doorstep.',
    price: 3,
  },
];
const ShippingMethodScreen = ({ navigation }: any) => {
  const [method, setMethod] = useState('Nominated Delivery');
  const { setShippingSetting } = useShippingSettingStore();

  const handleShippingMethod = () => {
    const index = data2.findIndex(_ => _.title === method);
    setShippingSetting({
      method: data2[index],
    });
    navigation.navigate('ShippingAddressScreen');
  };
  return (
    <Container bg={colors.background} back title="Shipping Method">
      <View
        style={{
          backgroundColor: colors.background1,
          flex: 1,
          paddingVertical: 20,
        }}
      >
        <SectionComponent
          styles={{
            flex: 1,
          }}
        >
          <View
            style={{
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <RowComponent justify="space-around">
              {data1.map((_, index) => (
                <ProgressShippingComponent
                  key={index}
                  index={index}
                  status={_.status}
                  title={_.title}
                  description={_.description}
                />
              ))}
            </RowComponent>
          </View>

          <SpaceComponent height={20} />

          {data2.map((_, index) => (
            <SectionComponent
              key={index}
              styles={{
                backgroundColor:
                  method === _.title ? colors.primary : colors.background,
                paddingVertical: 10,
                marginVertical: 6,
              }}
            >
              <RowComponent
                justify="space-between"
                onPress={() => setMethod(_.title)}
              >
                <View style={{ flex: 1 }}>
                  <TextComponent
                    text={_.title}
                    font={fontFamillies.poppinsSemiBold}
                    size={sizes.bigText}
                  />
                  <SpaceComponent height={10} />
                  <TextComponent
                    text={_.description}
                    color={method === _.title ? colors.background : colors.text}
                  />
                </View>
                <TextComponent
                  text={`$${_.price}`}
                  font={fontFamillies.poppinsMedium}
                  size={sizes.bigText}
                  color={
                    method === _.title ? colors.background : colors.primary
                  }
                />
              </RowComponent>
            </SectionComponent>
          ))}
        </SectionComponent>

        <SectionComponent>
          <BtnShadowLinearComponent
            title="Next"
            onPress={handleShippingMethod}
          />
        </SectionComponent>
      </View>
    </Container>
  );
};

export default ShippingMethodScreen;
