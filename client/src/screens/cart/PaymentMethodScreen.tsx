import { serverTimestamp, where } from '@react-native-firebase/firestore';
import {
  Apple,
  ArrowDown2,
  ArrowUp2,
  Calendar,
  Card,
  Lock1,
  Paypal,
  TickCircle,
  User,
} from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import cardPhysical from '../../assets/images/cardPhysical.png';
import {
  BtnShadowLinearComponent,
  CheckedButtonComponent,
  Container,
  InputComponent,
  ProgressShippingComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { addDocData } from '../../constants/addDocData';
import { colors } from '../../constants/colors';
import { deleteDocData } from '../../constants/deleteDocData';
import { fontFamillies } from '../../constants/fontFamilies';
import { getDocsData } from '../../constants/getDocsData';
import { setDocData } from '../../constants/setDocData';
import { sizes } from '../../constants/sizes';
import { typeCards } from '../../constants/typeCards';
import { CardModel } from '../../models/CardModel';
import useAddressStore from '../../zustand/store/useAddressStore';
import useCardStore from '../../zustand/store/useCardStore';
import useCartStore from '../../zustand/store/useCartStore';
import useOrderStore from '../../zustand/store/useOrderStore';
import useShippingSettingStore from '../../zustand/store/useShippingSetting';
import useUserStore from '../../zustand/store/useUserStore';
const data1 = [
  {
    title: '1',
    status: 'success',
    description: 'DELIVERY',
  },
  {
    title: '2',
    status: 'success',
    description: 'ADDRESS',
  },
  {
    title: '3',
    status: 'pending',
    description: 'PAYMENT',
  },
];
const data2 = [
  {
    icon: <Paypal size={30} color={colors.text} variant="Bold" />,
    iconActive: <Paypal size={30} color={colors.background} variant="Bold" />,
    title: '    Paypal    ',
  },
  {
    icon: <Calendar size={30} color={colors.text} variant="Bold" />,
    iconActive: <Calendar size={30} color={colors.background} variant="Bold" />,
    title: 'Credit Card',
  },
  {
    icon: <Apple size={30} color={colors.text} variant="Bold" />,
    iconActive: <Apple size={30} color={colors.background} variant="Bold" />,
    title: 'Apple pay',
  },
];
const initialCard = {
  type: 'Master Card',
  name: '',
  number: '',
  exp: '',
  cvv: '',
  url: typeCards[0].url,
};
const PaymentMethodScreen = ({ navigation }: any) => {
  const { user } = useUserStore();
  const [infoCard, setInfoCard] = useState(initialCard);
  const [saved, setSaved] = useState(false);
  const [selectedType, setSelectedType] = useState('Credit Card');
  const [typeCard, setTypeCard] = useState('Add new card');
  const [disable, setDisable] = useState(true);
  const { cards, addCard, setCards, editCard } = useCardStore();
  const { carts, setCarts } = useCartStore();
  const { addOrder } = useOrderStore();
  const { addresses } = useAddressStore();
  const [cardDefault, setCardDefault] = useState<CardModel>();
  const [showTypes, setShowTypes] = useState(false);
  const { shippingSetting, setShippingSetting } = useShippingSettingStore();

  useEffect(() => {
    if (user) {
      getDocsData({
        nameCollect: 'cards',
        condition: [where('userId', '==', user.id)],
        setData: setCards,
      });
    }
  }, [user]);

  useEffect(() => {
    if (cards) {
      const index = cards.findIndex((card: CardModel) => card.default);
      setCardDefault(cards[index]);
    }
  }, [cards]);

  useEffect(() => {
    if (
      infoCard.name ||
      infoCard.number ||
      infoCard.exp ||
      infoCard.cvv ||
      (selectedType === 'Credit Card' && typeCard === 'Use card default')
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [infoCard, typeCard, selectedType]);

  const handlePaymentMethod = () => {
    if (typeCard === 'Add new card') {
      let isDefault: boolean = false;

      if (cardDefault && saved) {
        editCard(cardDefault.id, {
          ...cardDefault,
          default: false,
        });
        setDocData({
          nameCollect: 'cards',
          id: cardDefault.id,
          valueUpdate: { default: false, updateAt: serverTimestamp() },
        });
        isDefault = true;
      }

      addDocData({
        nameCollect: 'cards',
        value: {
          ...infoCard,
          default: isDefault,
          userId: user?.id,
          createAt: serverTimestamp(),
          updateAt: serverTimestamp(),
        },
      }).then(result => {
        addCard({
          ...infoCard,
          id: result.id,
          default: isDefault,
          userId: user?.id as string,
        });
        setShippingSetting({
          ...shippingSetting,
          payment: {
            ...infoCard,
            id: result.id,
            default: isDefault,
            userId: user?.id as string,
          },
        });
      });
      navigation.navigate('OrderConfirmScreen');
    } else {
      navigation.navigate('OrderConfirmScreen');
    }
  };

  return (
    <Container bg={colors.background} back title="Payment Method">
      <View
        style={{
          backgroundColor: colors.background1,
          flex: 1,
          paddingTop: 16,
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

          <RowComponent
            justify="space-between"
            styles={{
              marginVertical: 10,
            }}
          >
            {data2.map((_, index) => (
              <Shadow
                key={index}
                distance={5}
                startColor={`${colors.border}d8`}
                endColor={`${colors.border}10`}
                offset={[0, 4]}
                style={{
                  width: '100%',
                }}
              >
                <TouchableOpacity
                  onPress={() => setSelectedType(_.title)}
                  style={{
                    backgroundColor:
                      selectedType === _.title
                        ? colors.primary
                        : colors.background,
                    paddingVertical: 20,
                    paddingHorizontal: 26,
                    borderRadius: 5,
                    alignItems: 'center',
                  }}
                >
                  {selectedType === _.title ? _.iconActive : _.icon}
                  <SpaceComponent height={10} />
                  <TextComponent
                    text={_.title}
                    color={
                      selectedType === _.title ? colors.background : colors.text
                    }
                  />
                </TouchableOpacity>
              </Shadow>
            ))}
          </RowComponent>
          {selectedType === 'Credit Card' && (
            <>
              <RowComponent
                justify="space-around"
                styles={{
                  marginVertical: 16,
                }}
              >
                <TouchableOpacity onPress={() => setTypeCard('Add new card')}>
                  <TextComponent
                    text="Add new card"
                    font={
                      typeCard === 'Add new card'
                        ? fontFamillies.poppinsBold
                        : fontFamillies.poppinsRegular
                    }
                    color={
                      typeCard === 'Add new card' ? colors.primary : colors.text
                    }
                  />
                </TouchableOpacity>
                <View
                  style={{
                    width: 2,
                    backgroundColor: colors.background,
                    height: '100%',
                  }}
                />
                <TouchableOpacity
                  onPress={() => setTypeCard('Use card default')}
                >
                  <TextComponent
                    text="Use card default"
                    font={
                      typeCard === 'Use card default'
                        ? fontFamillies.poppinsBold
                        : fontFamillies.poppinsRegular
                    }
                    color={
                      typeCard === 'Use card default'
                        ? colors.primary
                        : colors.text
                    }
                  />
                </TouchableOpacity>
              </RowComponent>
              {typeCard === 'Add new card' && (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      backgroundColor: colors.primary,
                      height: 200,
                      width: '100%',
                      borderRadius: 10,
                      marginBottom: 20,
                    }}
                  >
                    <ImageBackground
                      source={cardPhysical}
                      imageStyle={{
                        height: 200,
                        width: '100%',
                      }}
                    >
                      <SectionComponent>
                        <RowComponent
                          justify="space-between"
                          styles={{
                            paddingRight: 24,
                          }}
                        >
                          <View>
                            <Image
                              source={{ uri: infoCard.url }}
                              style={{
                                height: 80,
                                width: 80,
                                resizeMode: 'contain',
                              }}
                            />
                            <TextComponent
                              text={
                                infoCard.number !== ''
                                  ? infoCard.number
                                  : 'XXXX XXXX XXXX 8790'
                              }
                              font={fontFamillies.poppinsMedium}
                              size={sizes.thinTitle}
                              color={colors.background}
                            />
                          </View>
                          <View
                            style={{
                              height: 12,
                              width: 12,
                              backgroundColor: colors.red,
                              transform: [{ rotate: '45deg' }],
                            }}
                          />
                        </RowComponent>

                        <SpaceComponent height={40} />

                        <RowComponent
                          justify="space-between"
                          styles={{
                            paddingBottom: 20,
                          }}
                        >
                          <View>
                            <TextComponent
                              text="CARD HOLDER"
                              font={fontFamillies.poppinsMedium}
                              size={sizes.smallText}
                              color={colors.background}
                            />
                            <TextComponent
                              text={
                                infoCard.name !== ''
                                  ? infoCard.name
                                  : 'Russell austin'
                              }
                              font={fontFamillies.poppinsSemiBold}
                              color={colors.background}
                            />
                          </View>
                          <RowComponent
                            styles={{
                              alignItems: 'flex-start',
                            }}
                          >
                            <View>
                              <TextComponent
                                text="EXPRIES"
                                font={fontFamillies.poppinsMedium}
                                size={sizes.smallText}
                                color={colors.background}
                              />
                              <TextComponent
                                text={
                                  infoCard.exp !== '' ? infoCard.exp : '01/22'
                                }
                                font={fontFamillies.poppinsSemiBold}
                                color={colors.background}
                              />
                            </View>
                            <SpaceComponent width={10} />
                            <View
                              style={{
                                height: 12,
                                width: 12,
                                backgroundColor: colors.orange3,
                                transform: [{ rotate: '45deg' }],
                              }}
                            />
                          </RowComponent>
                        </RowComponent>
                      </SectionComponent>
                    </ImageBackground>
                  </View>

                  <InputComponent
                    editable={false}
                    styles={{
                      backgroundColor: colors.background,
                      paddingVertical: 16,
                      paddingHorizontal: 26,
                      borderRadius: 5,
                    }}
                    prefix={<Card color={colors.text} size={26} />}
                    affix={
                      showTypes ? (
                        <ArrowUp2
                          size={20}
                          color={colors.text}
                          variant="Bold"
                          onPress={() => setShowTypes(!showTypes)}
                        />
                      ) : (
                        <ArrowDown2
                          size={20}
                          color={colors.text}
                          variant="Bold"
                          onPress={() => setShowTypes(!showTypes)}
                        />
                      )
                    }
                    color={colors.background}
                    value={infoCard.type}
                    placeholder="Type card"
                    placeholderTextColor={colors.text}
                    textStyles={{
                      color: colors.text,
                    }}
                    onChange={val => setInfoCard({ ...infoCard, type: val })}
                  />
                  {showTypes && (
                    <SectionComponent
                      styles={{
                        backgroundColor: colors.background,
                      }}
                    >
                      {typeCards.map((_, index) => (
                        <RowComponent
                          key={index}
                          onPress={() => {
                            setShowTypes(false);
                            setInfoCard({
                              ...infoCard,
                              type: _.type,
                              url: _.url,
                            });
                          }}
                          styles={{
                            borderTopWidth: 1,
                            borderTopColor: colors.border,
                            paddingVertical: 10,
                          }}
                        >
                          <Image
                            source={{
                              uri: _.url,
                            }}
                            style={{
                              resizeMode: 'contain',
                              height: 30,
                              width: 30,
                            }}
                          />
                          <SpaceComponent width={10} />
                          <TextComponent text={_.type} />
                        </RowComponent>
                      ))}
                    </SectionComponent>
                  )}
                  <InputComponent
                    styles={{
                      backgroundColor: colors.background,
                      paddingVertical: 16,
                      paddingHorizontal: 26,
                      borderRadius: 5,
                    }}
                    prefix={<User color={colors.text} size={26} />}
                    color={colors.background}
                    value={infoCard.name}
                    allowClear
                    placeholder="Name on the card"
                    placeholderTextColor={colors.text}
                    textStyles={{
                      color: colors.text,
                    }}
                    onChange={val =>
                      setInfoCard({ ...infoCard, name: val.toUpperCase() })
                    }
                  />
                  <InputComponent
                    styles={{
                      backgroundColor: colors.background,
                      paddingVertical: 16,
                      paddingHorizontal: 26,
                      borderRadius: 5,
                    }}
                    prefix={<Card color={colors.text} size={26} />}
                    color={colors.background}
                    value={infoCard.number}
                    allowClear
                    placeholder="Card number"
                    placeholderTextColor={colors.text}
                    textStyles={{
                      color: colors.text,
                    }}
                    onChange={val =>
                      setInfoCard({ ...infoCard, number: val.toUpperCase() })
                    }
                  />
                  <RowComponent justify="space-between">
                    <InputComponent
                      styles={{
                        backgroundColor: colors.background,
                        paddingVertical: 16,
                        paddingHorizontal: 26,
                        borderRadius: 5,
                        flex: 1,
                      }}
                      prefix={<Calendar color={colors.text} size={26} />}
                      color={colors.background}
                      value={infoCard.exp}
                      allowClear
                      placeholder="Month / Year"
                      placeholderTextColor={colors.text}
                      textStyles={{
                        color: colors.text,
                      }}
                      onChange={val => setInfoCard({ ...infoCard, exp: val })}
                    />
                    <SpaceComponent width={4} />
                    <InputComponent
                      styles={{
                        backgroundColor: colors.background,
                        paddingVertical: 16,
                        paddingHorizontal: 26,
                        borderRadius: 5,
                        flex: 1,
                      }}
                      prefix={<Lock1 color={colors.text} size={26} />}
                      color={colors.background}
                      value={infoCard.cvv}
                      placeholder="CVV"
                      isPassword
                      placeholderTextColor={colors.text}
                      textStyles={{
                        color: colors.text,
                      }}
                      onChange={val => setInfoCard({ ...infoCard, cvv: val })}
                    />
                  </RowComponent>

                  <SectionComponent>
                    <SectionComponent>
                      <CheckedButtonComponent
                        title="Save this card"
                        value={saved}
                        onPress={(val: boolean) => setSaved(val)}
                      />
                    </SectionComponent>
                  </SectionComponent>
                </ScrollView>
              )}

              {typeCard === 'Use card default' && cardDefault && (
                <>
                  <RowComponent
                    justify="flex-start"
                    styles={{
                      borderBottomWidth: 1,
                      borderBottomColor: colors.border,
                      paddingBottom: 10,
                    }}
                  >
                    <TickCircle
                      size={24}
                      color={colors.primary}
                      variant="Bold"
                    />
                    <View
                      style={{
                        backgroundColor: colors.background,
                        height: 60,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 100,
                        marginHorizontal: 16,
                      }}
                    >
                      <Image
                        source={{ uri: cardDefault.url }}
                        style={{ height: 40, width: 40, resizeMode: 'contain' }}
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <TextComponent
                        text={cardDefault.type}
                        font={fontFamillies.poppinsSemiBold}
                        size={sizes.bigText}
                      />
                      <TextComponent
                        text={cardDefault.number}
                        font={fontFamillies.poppinsMedium}
                        color={colors.text}
                      />
                      <RowComponent>
                        <RowComponent>
                          <TextComponent
                            text="Expiry: "
                            size={sizes.smallText}
                          />
                          <TextComponent
                            text={cardDefault.exp}
                            font={fontFamillies.poppinsSemiBold}
                            size={sizes.smallText}
                          />
                        </RowComponent>
                        <SpaceComponent width={26} />
                        <RowComponent>
                          <TextComponent text="CVV: " size={sizes.smallText} />
                          <TextComponent
                            text={cardDefault.cvv}
                            font={fontFamillies.poppinsSemiBold}
                            size={sizes.smallText}
                          />
                        </RowComponent>
                      </RowComponent>
                    </View>
                  </RowComponent>

                  <TouchableOpacity
                    style={{
                      paddingVertical: 16,
                    }}
                    onPress={() => navigation.navigate('MyCardScreen')}
                  >
                    <TextComponent
                      styles={{
                        textAlign: 'center',
                      }}
                      text="Change card default"
                      font={fontFamillies.poppinsSemiBold}
                      color={colors.text2}
                    />
                  </TouchableOpacity>
                </>
              )}
            </>
          )}
        </SectionComponent>

        <SectionComponent>
          <BtnShadowLinearComponent
            disable={disable}
            title="Make a payment"
            onPress={handlePaymentMethod}
          />
        </SectionComponent>
      </View>
    </Container>
  );
};

export default PaymentMethodScreen;
