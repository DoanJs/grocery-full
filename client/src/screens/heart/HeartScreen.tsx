import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  Container,
  ProductSelectedComponent,
  SectionComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { ProductModel } from '../../models/ProductModel';
import useHeartStore from '../../zustand/store/useHeartStore';
import useProductStore from '../../zustand/store/useProductStore';

const HeartScreen = () => {
  const { products } = useProductStore();
  const { hearts } = useHeartStore();
  const [proHearts, setProHearts] = useState<any[]>([]);

  useEffect(() => {
    if (hearts && products) {
      let items: any[] = [];

      hearts.map((heart: any) => {
        const index = products.findIndex(
          (product: ProductModel) => product.id === heart.productId,
        );

        items.push({
          heart,
          product: products[index],
        });
      });

      setProHearts(items);
    }
  }, [products, hearts]);

  return (
    <Container bg={colors.background} back title="Favorites">
      <SectionComponent
        styles={{
          backgroundColor: colors.background1,
          flex: 1,
          paddingVertical: 20,
          marginBottom: 0,
        }}
      >
        <GestureHandlerRootView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {proHearts.map((_, index) => (
              <ProductSelectedComponent
                key={index}
                product={_.product}
                heart={_.heart}
              />
            ))}
          </ScrollView>
        </GestureHandlerRootView>
      </SectionComponent>
    </Container>
  );
};

export default HeartScreen;
