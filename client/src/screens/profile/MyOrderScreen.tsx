import { where } from '@react-native-firebase/firestore';
import { Setting5 } from 'iconsax-react-native';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import {
  Container,
  OrderItemComponent,
  SectionComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { getDocsData } from '../../constants/getDocsData';
import useOrderStore from '../../zustand/store/useOrderStore';
import useUserStore from '../../zustand/store/useUserStore';

const MyOrderScreen = () => {
  const { user } = useUserStore();
  const { orders, setOrders } = useOrderStore();

  useEffect(() => {
    if (user) {
      getDocsData({
        nameCollect: 'orders',
        condition: [where('userId', '==', user.id)],
        setData: setOrders,
      });
    }
  }, [user]);

  return (
    <Container
      bg={colors.background}
      back
      title="My Order"
      right={<Setting5 size={26} color={colors.text2} />}
    >
      <SectionComponent
        styles={{
          backgroundColor: colors.background1,
          flex: 1,
          paddingVertical: 26,
          marginBottom: 0,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {orders.sort((a, b) => (b?.createAt?._seconds as number) - (a?.createAt?._seconds as number))
            .map((order, index) => (
              <OrderItemComponent key={index} order={order} />
            ))}
        </ScrollView>
      </SectionComponent>
    </Container>
  );
};

export default MyOrderScreen;
