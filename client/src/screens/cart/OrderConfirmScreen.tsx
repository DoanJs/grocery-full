import { serverTimestamp } from '@react-native-firebase/firestore';
import { Location } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import {
  BtnShadowLinearComponent,
  Container,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { addDocData } from '../../constants/addDocData';
import { colors } from '../../constants/colors';
import { deleteDocData } from '../../constants/deleteDocData';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';
import { AddressModel } from '../../models/AddressModel';
import { CardModel } from '../../models/CardModel';
import useAddressStore from '../../zustand/store/useAddressStore';
import useCardStore from '../../zustand/store/useCardStore';
import useCartStore from '../../zustand/store/useCartStore';
import useFulfillmentStore from '../../zustand/store/useFulfillmentStore';
import useOrderStore from '../../zustand/store/useOrderStore';
import useProductStore from '../../zustand/store/useProductStore';
import useShippingSettingStore from '../../zustand/store/useShippingSetting';
import useUserStore from '../../zustand/store/useUserStore';

const OrderConfirmScreen = ({ navigation }: any) => {
  const { shippingSetting, setShippingSetting } = useShippingSettingStore();
  const { user } = useUserStore();
  const { carts, setCarts } = useCartStore();
  const { products } = useProductStore();
  const { addresses } = useAddressStore();
  const { cards } = useCardStore();
  const [address, setAddress] = useState<AddressModel>();
  const [card, setCard] = useState<CardModel>();
  const { addOrder } = useOrderStore();
  const { setFulfillment } = useFulfillmentStore()

  useEffect(() => {
    if (shippingSetting) {
      if (shippingSetting.address) {
        setAddress(shippingSetting.address);
      } else {
        const index = addresses.findIndex(address => address.default);
        setAddress(addresses[index]);
      }

      if (shippingSetting.payment) {
        setCard(shippingSetting.payment);
      } else {
        const index = cards.findIndex(card => card.default);
        setCard(cards[index]);
      }
    }
  }, [shippingSetting]);

  const handleConfirmOrder = async () => {
    if (shippingSetting && address && card) {
      const data = {
        method: shippingSetting.method.title,
        cartIds: carts
          .map(cart => {
            if (cart.quantity > 1) {
              return Array.from({ length: cart.quantity }).map(
                () => cart.productId,
              );
            } else {
              return cart.productId;
            }
          })
          .flat(),
        addressId: address.id,
        cardId: card.id,
        userId: user?.id as string,
      };

      setShippingSetting(null);
      setCarts([]);

      const promiseItems = carts.map(cart =>
        deleteDocData({ nameCollect: 'carts', id: cart.id }),
      );

      await Promise.all(promiseItems);

      addDocData({
        nameCollect: 'orders',
        value: {
          ...data,
          createAt: serverTimestamp(),
          updateAt: serverTimestamp(),
        },
      }).then(result => {
        addOrder({
          ...data,
          id: result.id,
        });
        const fullfilment = {
          orderId: result.id,
          placed: serverTimestamp(),
          confirmed: serverTimestamp(),
          shipped: serverTimestamp(),
          delivery: serverTimestamp(),
          delivered: serverTimestamp(),
        };

        addDocData({
          nameCollect: 'fulfillments',
          value: {
            ...fullfilment,
            createAt: serverTimestamp(),
            updateAt: serverTimestamp(),
          }

        }).then(res => setFulfillment({
          ...fullfilment,
          id: res.id
        }));
      });

      navigation.replace('OrderSuccessScreen');
    }
  };

  const handleCalculate = () => {
    let subTotal: number = 0;
    if (carts.length > 0) {
      carts.map(cart => {
        const index = products.findIndex(
          product => product.id === cart.productId,
        );

        subTotal += Number(products[index].price) * cart.quantity;
      });
    }

    return subTotal;
  };
  return (
    <Container back title="Order Confirm">
      <View
        style={{
          backgroundColor: colors.background1,
          flex: 1,
        }}
      >
        <SectionComponent
          styles={{
            flex: 1,
            paddingVertical: 10,
          }}
        >
          <TextComponent
            text="(*) Carts: "
            font={fontFamillies.poppinsBold}
            size={sizes.bigText}
          />
          <RowComponent
            justify="space-between"
            styles={{
              borderBottomWidth: 1,
              borderBottomColor: colors.background,
            }}
          >
            <TextComponent text="Name" font={fontFamillies.poppinsMedium} />
            <TextComponent text="Quantity" font={fontFamillies.poppinsMedium} />
            <TextComponent text="Price" font={fontFamillies.poppinsMedium} />
          </RowComponent>

          {carts.map((cart, index) => {
            const indexPro = products.findIndex(
              product => product.id === cart.productId,
            );

            return (
              <RowComponent key={index} justify="space-between">
                <TextComponent
                  text={products[indexPro].title}
                  font={fontFamillies.poppinsRegular}
                />
                <TextComponent
                  text={`${cart.quantity}`}
                  font={fontFamillies.poppinsRegular}
                />
                <TextComponent
                  text={`${products[indexPro].price}`}
                  font={fontFamillies.poppinsRegular}
                />
              </RowComponent>
            );
          })}

          <TextComponent
            text="(*) Method: "
            font={fontFamillies.poppinsBold}
            size={sizes.bigText}
          />
          <RowComponent justify="space-between">
            <TextComponent
              text={shippingSetting?.method?.title}
              font={fontFamillies.poppinsRegular}
            />
            <TextComponent
              text={shippingSetting?.method?.price}
              font={fontFamillies.poppinsRegular}
            />
          </RowComponent>

          <TextComponent
            text="(*) Address: "
            font={fontFamillies.poppinsBold}
            size={sizes.bigText}
          />
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
                  text={address?.name as string}
                  font={fontFamillies.poppinsSemiBold}
                  size={sizes.bigText}
                />
                <TextComponent
                  text={`${address?.address}, ${address?.city}, ${address?.country} ${address?.zipCode}`}
                  size={sizes.smallText}
                  styles={{
                    width: '70%',
                  }}
                />
                <TextComponent
                  text={address?.phone as string}
                  size={sizes.smallText}
                  font={fontFamillies.poppinsSemiBold}
                />
              </RowComponent>
            </RowComponent>
          </SectionComponent>

          <TextComponent
            text="(*) Payment: "
            font={fontFamillies.poppinsBold}
            size={sizes.bigText}
          />
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
                  source={{ uri: card?.url }}
                  style={{ height: 40, width: 40, resizeMode: 'contain' }}
                />
              </View>

              <View style={{ flex: 1 }}>
                <TextComponent
                  text={`${card?.type}`}
                  font={fontFamillies.poppinsSemiBold}
                  size={sizes.bigText}
                />
                <TextComponent
                  text={`${card?.number}`}
                  font={fontFamillies.poppinsMedium}
                  color={colors.text}
                />
                <RowComponent>
                  <RowComponent>
                    <TextComponent text="Expiry: " size={sizes.smallText} />
                    <TextComponent
                      text={`${card?.exp}`}
                      font={fontFamillies.poppinsSemiBold}
                      size={sizes.smallText}
                    />
                  </RowComponent>
                  <SpaceComponent width={26} />
                  <RowComponent>
                    <TextComponent text="CVV: " size={sizes.smallText} />
                    <TextComponent
                      text={`${card?.cvv}`}
                      font={fontFamillies.poppinsSemiBold}
                      size={sizes.smallText}
                    />
                  </RowComponent>
                </RowComponent>
              </View>
            </RowComponent>
          </SectionComponent>

          <View
            style={{
              marginTop: 16,
              height: 1,
              width: '100%',
              backgroundColor: colors.background,
            }}
          />

          <RowComponent justify="space-between">
            <TextComponent text="Total: " font={fontFamillies.poppinsBold} />
            <TextComponent
              text={`$${handleCalculate() + shippingSetting?.method.price}`}
              font={fontFamillies.poppinsBold}
            />
          </RowComponent>
        </SectionComponent>

        <SectionComponent>
          <BtnShadowLinearComponent
            title="Confirm"
            onPress={handleConfirmOrder}
          />
        </SectionComponent>
      </View>
    </Container>
  );
};

export default OrderConfirmScreen;
