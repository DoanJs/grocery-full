import {
  ArrowDown2,
  ArrowUp2,
  Calendar2,
  Card,
  User,
} from 'iconsax-react-native';
import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import {
  CheckedButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '.';
import { colors } from '../constants/colors';
import { fontFamillies } from '../constants/fontFamilies';
import { sizes } from '../constants/sizes';
import { CardModel } from '../models/CardModel';

interface Props {
  card: CardModel;
  value: string;
  onPress: (val: string) => void;
}

const CardItemComponent = (props: Props) => {
  const { card, value, onPress } = props;
  const [isShow, setIsShow] = useState(false);
  return (
    <View style={{ marginBottom: 10 }}>
      <SectionComponent
        styles={{
          backgroundColor: colors.background,
          marginBottom: 0,
          paddingVertical: 24,
        }}
      >
        <RowComponent justify="space-between">
          <View
            style={{
              backgroundColor: colors.background1,
              height: 60,
              width: 60,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              marginRight: 16,
            }}
          >
            <Image
              source={{ uri: card.url }}
              style={{ height: 40, width: 40, resizeMode: 'contain' }}
            />
          </View>

          <View style={{ flex: 1 }}>
            <TextComponent
              text={card.type}
              font={fontFamillies.poppinsSemiBold}
              size={sizes.bigText}
            />
            <TextComponent
              text={card.number}
              font={fontFamillies.poppinsMedium}
              color={colors.text}
            />
            <RowComponent>
              <RowComponent>
                <TextComponent text="Expiry: " size={sizes.smallText} />
                <TextComponent
                  text={card.exp}
                  font={fontFamillies.poppinsSemiBold}
                  size={sizes.smallText}
                />
              </RowComponent>
              <SpaceComponent width={26} />
              <RowComponent>
                <TextComponent text="CVV: " size={sizes.smallText} />
                <TextComponent
                  text={card.cvv}
                  font={fontFamillies.poppinsSemiBold}
                  size={sizes.smallText}
                />
              </RowComponent>
            </RowComponent>
          </View>

          <TouchableOpacity
            onPress={() => setIsShow(!isShow)}
            style={{
              padding: 1,
              borderWidth: 1,
              borderColor: colors.primary,
              borderRadius: 100,
            }}
          >
            {isShow ? (
              <ArrowUp2 size={20} color={colors.green} variant="Bold" />
            ) : (
              <ArrowDown2 size={20} color={colors.green} variant="Bold" />
            )}
          </TouchableOpacity>
        </RowComponent>

        {value === card.id && (
          <View
            style={{
              backgroundColor: colors.primaryLight,
              position: 'absolute',
              top: 0,
              left: 0,
              padding: 2,
            }}
          >
            <TextComponent
              text="DEFAULT"
              color={colors.green}
              font={fontFamillies.poppinsMedium}
              size={sizes.smallText}
            />
          </View>
        )}
      </SectionComponent>

      {isShow && (
        <>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: colors.border,
            }}
          />

          <SectionComponent
            styles={{
              backgroundColor: colors.background,
              paddingVertical: 24,
              marginBottom: 0,
            }}
          >
            <RowComponent
              styles={{
                backgroundColor: colors.background1,
                alignItems: 'center',
                padding: 16,
                borderRadius: 5,
                marginBottom: 6,
              }}
            >
              <User size={20} color={colors.text} />
              <SpaceComponent width={16} />
              <TextComponent
                text={card.name}
                font={fontFamillies.poppinsMedium}
                size={sizes.bigText}
                color={colors.text}
              />
            </RowComponent>
            <RowComponent
              styles={{
                backgroundColor: colors.background1,
                alignItems: 'center',
                padding: 16,
                borderRadius: 5,
                marginBottom: 6,
              }}
            >
              <Card size={20} color={colors.text} />
              <SpaceComponent width={16} />
              <TextComponent
                text={card.number}
                font={fontFamillies.poppinsMedium}
                size={sizes.bigText}
                color={colors.text}
              />
            </RowComponent>
            <RowComponent justify="space-between">
              <RowComponent
                styles={{
                  backgroundColor: colors.background1,
                  alignItems: 'center',
                  padding: 16,
                  borderRadius: 5,
                  marginBottom: 6,
                  width: '48%',
                }}
              >
                <Calendar2 size={20} color={colors.text} />
                <SpaceComponent width={16} />
                <TextComponent
                  text={card.exp}
                  font={fontFamillies.poppinsMedium}
                  size={sizes.bigText}
                  color={colors.text}
                />
              </RowComponent>
              <RowComponent
                styles={{
                  backgroundColor: colors.background1,
                  alignItems: 'center',
                  padding: 16,
                  borderRadius: 5,
                  marginBottom: 6,
                  width: '48%',
                }}
              >
                <Calendar2 size={20} color={colors.text} />
                <SpaceComponent width={16} />
                <TextComponent
                  text={card.cvv}
                  font={fontFamillies.poppinsMedium}
                  size={sizes.bigText}
                  color={colors.text}
                />
              </RowComponent>
            </RowComponent>

            <CheckedButtonComponent
              onPress={() => onPress(card.id)}
              title="Make default"
              value={value}
              makeDefault={card.id}
              titleStyles={{
                color: colors.text,
              }}
            />
          </SectionComponent>
        </>
      )}
    </View>
  );
};

export default CardItemComponent;
