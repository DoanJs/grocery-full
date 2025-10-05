import { ShoppingBag } from 'iconsax-react-native';
import React from 'react';
import { View } from 'react-native';
import {
  BtnShadowLinearComponent,
  Container,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';

const OrderSuccessScreen = ({ navigation }: any) => {
  return (
    <Container bg={colors.background} title="Order Success">
      <View
        style={{
          backgroundColor: colors.background1,
          flex: 1,
        }}
      >
        <SectionComponent
          styles={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ShoppingBag size={100} color={colors.primary} />
          <SpaceComponent height={16} />
          <TextComponent
            text="Your order was succesfull !"
            font={fontFamillies.poppinsSemiBold}
            size={sizes.smallTitle}
            styles={{
              width: '50%',
              textAlign: 'center',
              marginVertical: 10,
            }}
          />
          <TextComponent
            text="You will get a response within a few minutes."
            font={fontFamillies.poppinsMedium}
            size={sizes.bigText}
            color={colors.text}
            styles={{
              width: '60%',
              textAlign: 'center',
            }}
          />
        </SectionComponent>

        <SectionComponent>
          <RowComponent justify="space-between">
            <BtnShadowLinearComponent
              title="Go to shopping"
              onPress={() => navigation.navigate('Main')}
            />
            <BtnShadowLinearComponent
              title="Track order"
              onPress={() => navigation.navigate('TrackOrderScreen')}
            />
          </RowComponent>
        </SectionComponent>
      </View>
    </Container>
  );
};

export default OrderSuccessScreen;
