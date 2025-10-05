import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { RowComponent, TextComponent } from '.';
import { colors } from '../constants/colors';
import { deleteDocData } from '../constants/deleteDocData';
import { fontFamillies } from '../constants/fontFamilies';
import { setDocData } from '../constants/setDocData';
import { sizes } from '../constants/sizes';
import { CartModel } from '../models/CartModel';
import { HeartModel } from '../models/HeartModel';
import { ProductModel } from '../models/ProductModel';
import useCartStore from '../zustand/store/useCartStore';
import useHeartStore from '../zustand/store/useHeartStore';
import { serverTimestamp } from '@react-native-firebase/firestore';

interface Props {
  product: ProductModel;
  cart?: CartModel;
  heart?: HeartModel;
}

const ProductSelectedComponent = (props: Props) => {
  const navigation: any = useNavigation();
  const { product, cart, heart } = props;
  const { carts, editCart, removeCart } = useCartStore();
  const { removeHeart } = useHeartStore();

  const removeProduct = () => {
    let nameCollect: string = '';
    let id: string = '';
    if (cart) {
      nameCollect = 'carts';
      id = cart.id;
      removeCart(cart.id);
    }
    if (heart) {
      nameCollect = 'hearts';
      id = heart.id;
      removeHeart(heart.id);
    }

    deleteDocData({
      nameCollect,
      id,
    });
  };

  const renderRightActions = () => {
    return (
      <TouchableOpacity
        onPress={removeProduct}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.red,
          paddingHorizontal: 28,
        }}
      >
        <FontAwesome5 name="trash-alt" color={colors.background} size={26} />
      </TouchableOpacity>
    );
  };

  const handleChangeQuantity = async (type: string) => {
    if (cart) {
      let quantity = cart.quantity;
      let isDelete = false;

      if (type === 'decrease') {
        if (quantity === 1) {
          isDelete = true;
        }
        quantity = quantity - 1;
      } else {
        quantity = quantity + 1;
      }

      if (isDelete) {
        removeCart(cart.id);
        deleteDocData({
          nameCollect: 'carts',
          id: cart.id,
        });
      } else {
        const index = carts.findIndex(_ => _.id === cart.id);
        editCart(cart.id, { ...carts[index], quantity });
        setDocData({
          nameCollect: 'carts',
          id: cart.id,
          valueUpdate: { quantity, updateAt: serverTimestamp() },
        });
      }
    }
  };

  return (
    <View
      style={{
        marginVertical: 6,
      }}
    >
      <Swipeable renderRightActions={renderRightActions}>
        <RowComponent
          justify="space-between"
          styles={{
            backgroundColor: colors.background,
            padding: 16,
          }}
          onPress={() =>
            navigation.navigate('ProductDetailsScreen', {
              productId: product.id,
            })
          }
        >
          <Image
            source={{ uri: product?.url }}
            resizeMode="contain"
            style={{
              marginRight: 16,
              width: 80,
              height: 80,
            }}
          />
          <RowComponent
            styles={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              flex: 1,
            }}
          >
            <TextComponent
              text={`$${product?.price}`}
              color={colors.primary}
              font={fontFamillies.poppinsMedium}
            />
            <TextComponent
              text={product?.title as string}
              color={colors.text2}
              size={sizes.bigText}
              font={fontFamillies.poppinsSemiBold}
            />
            <TextComponent
              text={product?.quantity as string}
              color={colors.text}
            />
          </RowComponent>

          {cart && (
            <RowComponent
              styles={{
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Entypo
                size={20}
                color={colors.primary}
                name="plus"
                onPress={() => handleChangeQuantity('increase')}
              />
              <TextComponent
                color={colors.text}
                text={`${cart.quantity}`}
                font={fontFamillies.poppinsMedium}
                size={sizes.bigText}
                styles={{
                  paddingVertical: 8,
                }}
              />
              <Entypo
                size={20}
                color={colors.primary}
                name="minus"
                onPress={() => handleChangeQuantity('decrease')}
              />
            </RowComponent>
          )}
        </RowComponent>
      </Swipeable>
    </View>
  );
};

export default ProductSelectedComponent;
