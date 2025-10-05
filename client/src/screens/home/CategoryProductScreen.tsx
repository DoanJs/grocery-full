import { Setting5 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { auth } from '../../../firebase.config';
import {
  Container,
  ProductItemComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { ProductModel } from '../../models/ProductModel';
import useCartStore from '../../zustand/store/useCartStore';
import useHeartStore from '../../zustand/store/useHeartStore';
import useProductStore from '../../zustand/store/useProductStore';

const CategoryProductScreen = ({ navigation, route }: any) => {
  const user = auth.currentUser;
  const { category } = route.params;
  const { products } = useProductStore()
  const { hearts } = useHeartStore()
  const { carts } = useCartStore()
  const [productCates, setProductCates] = useState<ProductModel[]>([]);

  useEffect(() => {
    if (category) {
      const items = products.filter((pro) => pro.category === category)
      setProductCates(items)
    }
  }, [category]);

  return (
    <Container
      bg={colors.background}
      back
      title={category}
      right={<Setting5 onPress={() => { }} size={24} color={colors.text2} />}
    >
      <View style={{
        backgroundColor: colors.background1,
        flex: 1
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionComponent
          styles={{
            paddingVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            flex: 1
          }}
        >
          {productCates.map((_, index) => (
            <ProductItemComponent
              key={index}
              onPress={() =>
                navigation.navigate('ProductDetailsScreen', {
                  productId: _.id,
                })
              }
              product={_}
              carts={carts.filter(pro => pro.productId === _.id)}
              hearts={hearts.filter(pro => pro.productId === _.id)}
            />
          ))}
        </SectionComponent>
      </ScrollView>
      </View>
    </Container>
  );
};

export default CategoryProductScreen;
