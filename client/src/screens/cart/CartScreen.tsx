import { ShoppingBag } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BtnShadowLinearComponent,
  Container,
  ProductSelectedComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';
import { CartModel } from '../../models/CartModel';
import { ProductModel } from '../../models/ProductModel';
import useCartStore from '../../zustand/store/useCartStore';
import useProductStore from '../../zustand/store/useProductStore';

const CartScreen = ({ navigation }: any) => {
  const { products } = useProductStore();
  const { carts } = useCartStore();
  const [proCarts, setProCarts] = useState<any[]>([]);

  useEffect(() => {
    if (carts && products) {
      let items: any[] = [];

      carts.map((cart: CartModel) => {
        const index = products.findIndex(
          (product: ProductModel) => product.id === cart.productId,
        );

        items.push({
          cart,
          product: products[index],
        });
      });

      setProCarts(items);
    }
  }, [products, carts]);

  const handleCalculate = () => {
    let subTotal: number = 0;
    if (proCarts.length > 0) {
      proCarts.map(pro => {
        subTotal += Number(pro.product?.price) * pro.cart?.quantity;
      });
    }

    return subTotal
  };

  return (
    <Container bg={colors.background} back title="Shopping Cart">
      <View
        style={{
          backgroundColor: colors.background1,
          flex: 1,
        }}
      >
        <SectionComponent
          styles={{
            flex: 1,
            paddingVertical: 20,
          }}
        >
          {proCarts.length > 0 ? (
            <GestureHandlerRootView>
              <ScrollView showsVerticalScrollIndicator={false}>
                {proCarts.map((_: any, index: number) => (
                  <ProductSelectedComponent
                    key={index}
                    product={_.product}
                    cart={_.cart}
                  />
                ))}
              </ScrollView>
            </GestureHandlerRootView>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <ShoppingBag size={80} color={colors.primary} />
              <TextComponent
                text="Your cart is empty !"
                font={fontFamillies.poppinsSemiBold}
                size={sizes.smallTitle}
              />
              <TextComponent
                text="You will get a response within a few minutes."
                font={fontFamillies.poppinsMedium}
                size={sizes.bigText}
                color={colors.text}
                styles={{ width: '60%', textAlign: 'center' }}
              />
            </View>
          )}
        </SectionComponent>

        {proCarts.length > 0 ? (
          <View>
            <SectionComponent>
              <RowComponent justify="space-between">
                <TextComponent
                  text="Subtotal"
                  color={colors.text}
                  font={fontFamillies.poppinsMedium}
                />
                <TextComponent
                  text={`$${handleCalculate()}`}
                  color={colors.text}
                  font={fontFamillies.poppinsMedium}
                />
              </RowComponent>
              <RowComponent justify="space-between">
                <TextComponent
                  text="Shipping charges"
                  color={colors.text}
                  font={fontFamillies.poppinsMedium}
                />
                <TextComponent
                  text="$1.6"
                  color={colors.text}
                  font={fontFamillies.poppinsMedium}
                />
              </RowComponent>
              <RowComponent
                justify="space-between"
                styles={{
                  borderTopWidth: 1,
                  borderTopColor: colors.border,
                  marginVertical: 10,
                  paddingTop: 10,
                }}
              >
                <TextComponent
                  text="Total"
                  color={colors.text2}
                  font={fontFamillies.poppinsSemiBold}
                  size={sizes.thinTitle}
                />
                <TextComponent
                  text={`$${handleCalculate() + 1.6}`}
                  color={colors.text2}
                  font={fontFamillies.poppinsSemiBold}
                  size={sizes.thinTitle}
                />
              </RowComponent>

              <BtnShadowLinearComponent
                title="Checkout"
                onPress={() => navigation.navigate('ShippingMethodScreen')}
              />
            </SectionComponent>
          </View>
        ) : (
          <SectionComponent>
            <BtnShadowLinearComponent
              title="Start shopping"
              onPress={() => navigation.navigate('Main')}
            />
          </SectionComponent>
        )}
      </View>
    </Container>
  );
};

export default CartScreen;
