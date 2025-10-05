import {
  ArrowDown2,
  ArrowUp2,
  Barcode,
  Call,
  GlobalSearch,
  Location,
  Solana,
  User,
} from 'iconsax-react-native';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
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
import { AddressModel } from '../models/AddressModel';

interface Props {
  address: AddressModel;
  value: string;
  onPress: (val: any) => void;
}

const data = [
  {
    icon: <User size={20} color={colors.text} />,
    title: 'name',
  },
  {
    icon: <Location size={20} color={colors.text} />,
    title: 'address',
  },
  {
    icon: <Solana size={20} color={colors.text} />,
    title: 'city',
  },
  {
    icon: <Barcode size={20} color={colors.text} />,
    title: 'zipCode',
  },
  {
    icon: <GlobalSearch size={20} color={colors.text} />,
    title: 'country',
  },
  {
    icon: <Call size={20} color={colors.text} />,
    title: 'phone',
  },
];

const AddressItemComponent = (props: Props) => {
  const { value, address, onPress } = props;
  const [showMore, setShowMore] = useState(false);

  return (
    <View
      style={{
        marginBottom: !showMore ? 16 : 0,
        position: 'relative',
      }}
    >
      {value === address.id && (
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 0,
            left: 0,
            padding: 2,
            backgroundColor: colors.primaryLight,
          }}
        >
          <TextComponent
            text="DEFAULT"
            font={fontFamillies.poppinsMedium}
            size={sizes.smallText}
            color={colors.primary}
          />
        </View>
      )}
      <SectionComponent
        styles={{
          backgroundColor: colors.background,
          marginBottom: 0,
        }}
      >
        <RowComponent
          justify="space-between"
          styles={{
            paddingVertical: 26,
          }}
        >
          <View
            style={{
              backgroundColor: colors.primaryLight,
              padding: 16,
              borderRadius: 100,
            }}
          >
            <Location size={32} color={colors.primary} />
          </View>
          <SpaceComponent width={16} />
          <RowComponent
            styles={{
              flexDirection: 'column',
              flex: 1,
              alignItems: 'flex-start',
            }}
          >
            <TextComponent
              text={address.name}
              font={fontFamillies.poppinsSemiBold}
              size={sizes.bigText}
            />
            <TextComponent
              text={`${address.address}, ${address.city}, ${address.country} ${address.zipCode}`}
              size={sizes.smallText}
              styles={{
                width: '70%',
              }}
            />
            <TextComponent
              text={address.phone}
              size={sizes.smallText}
              font={fontFamillies.poppinsSemiBold}
            />
          </RowComponent>
          <TouchableOpacity
            onPress={() => setShowMore(!showMore)}
            style={{
              padding: 1,
              borderWidth: 1,
              borderColor: colors.primary,
              borderRadius: 100,
            }}
          >
            {showMore ? (
              <ArrowUp2 variant="Bold" size={20} color={colors.primary} />
            ) : (
              <ArrowDown2 variant="Bold" size={20} color={colors.primary} />
            )}
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
      {showMore && (
        <>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: colors.border,
            }}
          />

          <SectionComponent
            styles={{
              backgroundColor: colors.background,
              paddingVertical: 24,
            }}
          >
            {[data[0], data[1]].map((_, index) => (
              <RowComponent
                key={index}
                styles={{
                  backgroundColor: colors.background1,
                  padding: 16,
                  borderRadius: 5,
                  marginVertical: 4,
                }}
              >
                {_.icon}
                <SpaceComponent width={20} />
                <TextComponent
                  text={`${address[_.title as keyof AddressModel]}`}
                  color={colors.text}
                  font={fontFamillies.poppinsMedium}
                />
              </RowComponent>
            ))}
            <RowComponent justify="space-between">
              {[data[2], data[3]].map((_, index) => (
                <RowComponent
                  key={index}
                  styles={{
                    backgroundColor: colors.background1,
                    padding: 16,
                    borderRadius: 5,
                    marginVertical: 4,
                    width: '48%',
                  }}
                >
                  {_.icon}
                  <SpaceComponent width={20} />
                  <TextComponent
                    text={`${address[_.title as keyof AddressModel]}`}
                    color={colors.text}
                    font={fontFamillies.poppinsMedium}
                  />
                </RowComponent>
              ))}
            </RowComponent>
            {[data[4], data[5]].map((_, index) => (
              <RowComponent
                key={index}
                styles={{
                  backgroundColor: colors.background1,
                  padding: 16,
                  borderRadius: 5,
                  marginVertical: 4,
                }}
              >
                {_.icon}
                <SpaceComponent width={20} />
                <TextComponent
                  text={`${address[_.title as keyof AddressModel]}`}
                  color={colors.text}
                  font={fontFamillies.poppinsMedium}
                />
              </RowComponent>
            ))}

            <SpaceComponent height={16} />

            <CheckedButtonComponent
              value={value}
              makeDefault={address.id}
              title="Make default"
              onPress={() => onPress(address.id)}
            />
          </SectionComponent>
        </>
      )}
    </View>
  );
};

export default AddressItemComponent;
