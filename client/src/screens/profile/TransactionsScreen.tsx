import React from 'react';
import { Image, View } from 'react-native';
import masterCard from '../../assets/images/masterCard.png';
import paypalCard from '../../assets/images/paypalCard.png';
import visaCard from '../../assets/images/visaCard.png';
import {
  Container,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';

const data = [
  {
    icon: masterCard,
    title: 'Master Card',
    description: 'Dec 12 2021 at 10:00 pm',
    price: '$89'
  },
  {
    icon: visaCard,
    title: 'Master Card',
    description: 'Dec 12 2021 at 10:00 pm',
    price: '$109'
  },
  {
    icon: paypalCard,
    title: 'Paypal',
    description: 'Dec 12 2021 at 10:00 pm',
    price: '$567'
  },
  {
    icon: paypalCard,
    title: 'Paypal',
    description: 'Dec 12 2021 at 10:00 pm',
    price: '$567'
  },
  {
    icon: visaCard,
    title: 'Master Card',
    description: 'Dec 12 2021 at 10:00 pm',
    price: '$109'
  },
  {
    icon: masterCard,
    title: 'Master Card',
    description: 'Dec 12 2021 at 10:00 pm',
    price: '$89'
  },
];

const TransactionsScreen = () => {
  return (
    <Container bg={colors.background} back title="Transactions">
      <SectionComponent
        styles={{
          backgroundColor: colors.background1,
          flex: 1,
          paddingVertical: 24,
          marginBottom: 0
        }}
      >
        {data.map((_, index) => (
          <RowComponent
            key={index}
            justify="space-between"
            styles={{
              padding: 16,
              backgroundColor: colors.background,
              marginVertical: 6
            }}
          >
            <View
              style={{
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.background2,
                borderRadius: 100,
                marginRight: 16,
              }}
            >
              <Image source={_.icon} style={{ resizeMode: 'contain' }} />
            </View>
            <View style={{ flex: 1 }}>
              <TextComponent
                text={_.title}
                font={fontFamillies.poppinsSemiBold}
                size={sizes.bigText}
              />
              <TextComponent
                text={_.description}
                size={sizes.smallText}
              />
            </View>
            <TextComponent
              text={_.price}
              color={colors.green}
              font={fontFamillies.poppinsSemiBold}
              size={sizes.bigText}
            />
          </RowComponent>
        ))}
      </SectionComponent>
    </Container>
  );
};

export default TransactionsScreen;
