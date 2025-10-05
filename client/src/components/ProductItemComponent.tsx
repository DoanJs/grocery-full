import { serverTimestamp } from '@react-native-firebase/firestore';
import { Heart, ShoppingBag } from 'iconsax-react-native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { RowComponent, SpaceComponent, TextComponent } from '.';
import { auth } from '../../firebase.config';
import { addDocData } from '../constants/addDocData';
import { colors } from '../constants/colors';
import { deleteDocData } from '../constants/deleteDocData';
import { fontFamillies } from '../constants/fontFamilies';
import { setDocData } from '../constants/setDocData';
import { sizes } from '../constants/sizes';
import { ProductModel } from '../models/ProductModel';
import useCartStore from '../zustand/store/useCartStore';
import useHeartStore from '../zustand/store/useHeartStore';

interface Props {
  onPress: () => void;
  carts?: any;
  hearts?: any;
  product: ProductModel;
}

const ProductItemComponent = (props: Props) => {
  const user = auth.currentUser;
  const { onPress, carts, hearts, product } = props;
  const { addCart, editCart, removeCart } = useCartStore();
  const { addHeart, removeHeart } = useHeartStore();

  const handleChageQuantity = (type: string) => {
    let quantity = carts && carts[0].quantity;
    let isDelete = false;

    switch (type) {
      case 'decrease':
        if (quantity === 1) {
          isDelete = true;
        }
        quantity = quantity - 1;
        break;
      case 'increase':
        quantity = quantity + 1;
        break;
      default:
        break;
    }

    if (isDelete) {
      removeCart(carts[0].id);
      deleteDocData({
        nameCollect: 'carts',
        id: carts[0].id,
      });
    } else {
      editCart(carts[0].id, { ...carts[0], quantity });
      setDocData({
        nameCollect: 'carts',
        id: carts[0].id,
        valueUpdate: { quantity, updateAt: serverTimestamp() },
      });
    }
  };

  const handleChangeHeart = () => {
    if (hearts[0]) {
      removeHeart(hearts[0].id);
      deleteDocData({
        nameCollect: 'hearts',
        id: hearts[0].id,
      });
    } else {
      addDocData({
        nameCollect: 'hearts',
        value: {
          productId: product.id,
          userId: user?.uid,
          createAt: serverTimestamp(),
          updateAt: serverTimestamp(),
        },
      }).then(result =>
        addHeart({
          productId: product.id,
          userId: user?.uid as string,
          id: result.id,
        }),
      );
    }
  };

  const handleAddCart = () =>
    addDocData({
      nameCollect: 'carts',
      value: {
        productId: product.id,
        userId: user?.uid,
        quantity: 1,
        createAt: serverTimestamp(),
        updateAt: serverTimestamp(),
      },
    }).then(result => {
      addCart({
        productId: product.id,
        userId: user?.uid as string,
        quantity: 1,
        id: result.id,
      });
    });

  return (
    <RowComponent
      onPress={onPress}
      styles={{
        flexDirection: 'column',
        backgroundColor: colors.background,
        width: '48%',
        marginBottom: 16,
      }}
    >
      {product.sale && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            paddingVertical: 2,
            paddingHorizontal: 10,
            backgroundColor: colors.pink2,
            // backgroundColor: isNew ? colors.orange2 : colors.pink2,
          }}
        >
          <TextComponent
            text={`${product.sale ?? 'NEW'}`}
            size={sizes.smallText}
            font={fontFamillies.poppinsMedium}
            color={colors.pink}
            // color={isNew ? colors.orange : colors.pink}
          />
        </View>
      )}

      <TouchableOpacity
        onPress={handleChangeHeart}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
        }}
      >
        <Heart
          color={hearts[0] ? colors.heart : colors.border}
          size={20}
          variant={hearts[0] ? 'Bold' : 'Linear'}
        />
      </TouchableOpacity>

      <RowComponent
        styles={{
          flexDirection: 'column',
        }}
      >
        <SpaceComponent height={24} />
        <Image
          source={{ uri: product.url }}
          style={{
            height: 120,
            width: 120,
            resizeMode: 'contain',
          }}
        />
        <TextComponent
          text={`${product.price}`}
          color={colors.primary}
          font={fontFamillies.poppinsMedium}
        />
        <TextComponent
          text={product.title as string}
          color={colors.text2}
          font={fontFamillies.poppinsSemiBold}
        />
        <TextComponent
          text={product.quantity as string}
          color={colors.text}
          font={fontFamillies.poppinsMedium}
        />
      </RowComponent>

      <RowComponent
        styles={{
          width: '100%',
          justifyContent: carts.length === 0 ? 'center' : 'space-around',
          borderTopWidth: 1,
          borderColor: colors.border,
          paddingVertical: 10,
        }}
      >
        {carts.length > 0 ? (
          <>
            <TouchableOpacity onPress={() => handleChageQuantity('decrease')}>
              <TextComponent
                text="-"
                size={sizes.bigText}
                color={colors.primary}
                font={fontFamillies.poppinsBold}
              />
            </TouchableOpacity>
            <TextComponent
              text={carts[0].quantity}
              size={sizes.bigText}
              color={colors.primary}
              font={fontFamillies.poppinsMedium}
            />
            <TouchableOpacity onPress={() => handleChageQuantity('increase')}>
              <TextComponent
                text="+"
                size={sizes.bigText}
                color={colors.primary}
                font={fontFamillies.poppinsBold}
              />
            </TouchableOpacity>
          </>
        ) : (
          <RowComponent onPress={handleAddCart}>
            <ShoppingBag size={20} color={colors.primary} />
            <SpaceComponent width={6} />
            <TextComponent
              text="Add to cart"
              font={fontFamillies.poppinsMedium}
              color={colors.text2}
            />
          </RowComponent>
        )}
      </RowComponent>
    </RowComponent>
  );
};

export default ProductItemComponent;
