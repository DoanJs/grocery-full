import { serverTimestamp } from '@react-native-firebase/firestore';
import {
  ArrowDown2,
  ArrowUp2,
  Calendar2,
  Card,
  User,
} from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import cardPhysical from '../../assets/images/cardPhysical.png';
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
import { fontFamillies } from '../../constants/fontFamilies';
import { setDocData } from '../../constants/setDocData';
import { sizes } from '../../constants/sizes';
import { typeCards } from '../../constants/typeCards';
import useCardStore from '../../zustand/store/useCardStore';
import useUserStore from '../../zustand/store/useUserStore';

const initialCard = {
  type: 'Master Card',
  name: '',
  number: '',
  exp: '',
  cvv: '',
  url: typeCards[0].url,
};

const AddCardScreen = ({ navigation }: any) => {
  const { user } = useUserStore();
  const { cards, editCard, addCard } = useCardStore();
  const [infoCard, setInfoCard] = useState(initialCard);
  const [saved, setSaved] = useState(false);
  const [disable, setDisable] = useState(true);
  const [showTypes, setShowTypes] = useState(false);

  useEffect(() => {
    if (infoCard.name || infoCard.number || infoCard.exp || infoCard.cvv) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [infoCard]);

  const handleAddCard = () => {
    let isDefault: boolean = false;
    if (saved) {
      const indexDefault = cards.findIndex(_ => _.default);
      if (indexDefault !== -1) {
        editCard(cards[indexDefault].id, {
          ...cards[indexDefault],
          default: false,
        });
        setDocData({
          nameCollect: 'cards',
          id: cards[indexDefault].id,
          valueUpdate: { default: false, updateAt: serverTimestamp() },
        });
      }
      isDefault = true;
    }

    addDocData({
      nameCollect: 'cards',
      value: {
        ...infoCard,
        default: cards.length === 0 ? true:  isDefault,
        userId: user?.id,
        createAt: serverTimestamp(),
        updateAt: serverTimestamp(),
      },
    }).then(result =>
      addCard({
        ...infoCard,
        id: result.id,
        default: cards.length === 0 ? true:  isDefault,
        userId: user?.id as string,
      }),
    );

    navigation.goBack();
  };
  return (
    <Container bg={colors.background} back title="Add Credit Card">
      <View
        style={{
          backgroundColor: colors.background1,
          paddingVertical: 20,
          flex: 1,
        }}
      >
        <SectionComponent
          styles={{
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: colors.primary,
              height: 200,
              width: '100%',
              borderRadius: 10,
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
                        marginTop: 20,
                        height: 60,
                        width: 60,
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
                        infoCard.name !== '' ? infoCard.name : 'Russell austin'
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
                        text={infoCard.exp !== '' ? infoCard.exp : '01/22'}
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

          <SpaceComponent height={10} />
          <InputComponent
            editable={false}
            styles={{
              backgroundColor: colors.background,
              paddingVertical: 16,
              paddingHorizontal: 26,
              borderRadius: 5,
              marginBottom: 6,
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
                    setInfoCard({ ...infoCard, type: _.type, url: _.url });
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
              marginBottom: 6,
            }}
            prefix={<User color={colors.text} size={26} />}
            color={colors.background}
            value={infoCard.name}
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
              marginBottom: 6,
            }}
            prefix={<Card color={colors.text} size={26} />}
            color={colors.background}
            value={infoCard.number}
            placeholder="Card number"
            placeholderTextColor={colors.text}
            textStyles={{
              color: colors.text,
            }}
            onChange={val =>
              setInfoCard({ ...infoCard, number: val.toUpperCase() })
            }
          />
          <RowComponent
            justify="space-between"
            styles={{
              alignItems: 'center',
            }}
          >
            <InputComponent
              styles={{
                backgroundColor: colors.background,
                paddingVertical: 16,
                paddingHorizontal: 26,
                borderRadius: 5,
                flex: 1,
              }}
              prefix={<Calendar2 color={colors.text} size={26} />}
              color={colors.background}
              value={infoCard.exp}
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
              prefix={<Calendar2 color={colors.text} size={26} />}
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

          <CheckedButtonComponent
            title={`Save this card ${cards.length === 0 && '(require is true in field)'}`}
            onPress={() => setSaved(cards.length === 0 ? true : !saved)}
            value={cards.length === 0 ? true:saved}
          />
        </SectionComponent>

        <SectionComponent>
          <BtnShadowLinearComponent
            disable={disable}
            onPress={handleAddCard}
            title="Add credit card"
          />
        </SectionComponent>
      </View>
    </Container>
  );
};

export default AddCardScreen;
