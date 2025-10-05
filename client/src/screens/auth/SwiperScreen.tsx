import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import appleImg from '../../assets/images/apple.png';
import bigCartImg from '../../assets/images/bigCart.png';
import breadImg from '../../assets/images/bread.png';
import cookImg from '../../assets/images/cook.png';
import eggImg from '../../assets/images/egg.png';
import lemonImg from '../../assets/images/lemon.png';
import milkImg from '../../assets/images/milk.png';
import motobikeImg from '../../assets/images/motobike.png';
import orangeImg from '../../assets/images/orange.png';
import phoneImg from '../../assets/images/phone.png';
import shrimpImg from '../../assets/images/shrimp.png';
import vegetableImg from '../../assets/images/vegetable.png';
import {
  BtnShadowLinearComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../../firebase.config';

const data = [
  'Get Discounts On All Products',
  'Buy Premium Quality Fruits',
  'Buy Quality Dairy Products',
  'Welcome to',
  'Premium Food At Your Doorstep',
  'Buy Premium Quality Fruits',
  'Buy Quality Dairy Products',
  'Get Discounts On All Products',
  'Buy Grocery',
  'Fast Delivery',
  'Enjoy Quality Food',
];

const SwiperScreen = ({ navigation }: any) => {
  const [index, setIndex] = useState(0);
  const user = auth.currentUser

  useEffect(() => {
    AsyncStorage.getItem('user').then(result => {
        if(result!== '' && !user){
            navigation.navigate('AuthHomeScreen')
        }
    })
  },[])

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        loop={false}
        onIndexChanged={num => setIndex(num)}
        index={index}
        showsPagination={false}
      >
        <Image style={localStyle.image} source={appleImg} />
        <Image style={localStyle.image} source={lemonImg} />
        <Image style={localStyle.image} source={eggImg} />
        <Image style={localStyle.image} source={vegetableImg} />
        <Image style={localStyle.image} source={breadImg} />
        <Image style={localStyle.image} source={orangeImg} />
        <Image style={localStyle.image} source={milkImg} />
        <Image style={localStyle.image} source={shrimpImg} />
        <Image style={localStyle.image} source={phoneImg} />
        <Image style={localStyle.image} source={motobikeImg} />
        <Image style={localStyle.image} source={cookImg} />
      </Swiper>

      <RowComponent
        styles={{
          bottom: index < 8 ? '14%' : '6%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {Array.from({ length: index < 8 ? 4 : 3 }).map((_, i) => {
          return (
            <View
              key={i}
              style={[
                localStyle.swDot,
                {
                  backgroundColor:
                    i === index || (i === 3 && index > i) || i + 8 === index
                      ? colors.primary
                      : colors.gray,
                },
              ]}
            />
          );
        })}
      </RowComponent>

      <View
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          top: index < 4 ? '10%' : index < 8 ? '60%' : '75%',
        }}
      >
        <SectionComponent>
          <RowComponent
            styles={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextComponent
              text={data[index]}
              styles={{
                width: index === 4 ? '75%' : '65%',
                textAlign: 'center',
              }}
              font={fontFamillies.poppinsBold}
              size={sizes.bigTitle}
            />
            {index === 3 && <Image source={bigCartImg} />}
            <SpaceComponent height={10} />
            <TextComponent
              text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy"
              styles={{
                width: '85%',
                textAlign: 'center',
              }}
              size={sizes.bigText}
              color={colors.text}
              font={fontFamillies.poppinsMedium}
            />
          </RowComponent>
        </SectionComponent>
      </View>

      <View
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: '3%',
        }}
      >
        <SectionComponent>
          {index < 8 ? (
            <BtnShadowLinearComponent
              onPress={() => navigation.navigate('AuthHomeScreen')}
              title="Get started"
            />
          ) : (
            <RowComponent justify="space-between">
              <TouchableOpacity onPress={() => setIndex(index - 1)}>
                <TextComponent text="Skip" color={colors.primaryDark} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  index < 10
                    ? setIndex(index + 1)
                    : navigation.navigate('AuthHomeScreen');
                }}
              >
                <TextComponent text="Next" color={colors.primaryDark} />
              </TouchableOpacity>
            </RowComponent>
          )}
        </SectionComponent>
      </View>
    </View>
  );
};

export default SwiperScreen;
const localStyle = StyleSheet.create({
  image: {
    flex: 1,
    width: sizes.width,
    height: sizes.height,
    resizeMode: 'cover',
  },
  swDot: {
    height: 8,
    width: 8,
    borderRadius: 100,
    marginHorizontal: 2,
  },
});
