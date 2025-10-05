import { where } from '@react-native-firebase/firestore';
import { ArrowRight2, SearchNormal1, Setting5 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Swiper from 'react-native-swiper';
import { auth } from '../../../firebase.config';
import swiper01Png from '../../assets/images/swiper01.png';
import swiper02Png from '../../assets/images/swiper02.png';
import swiper03Png from '../../assets/images/swiper03.png';
import swiper04Png from '../../assets/images/swiper04.png';
import {
  CategoryItem,
  Container,
  ProductItemComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { categories } from '../../constants/categories';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { getDocData } from '../../constants/getDocData';
import { getDocsData } from '../../constants/getDocsData';
import { sizes } from '../../constants/sizes';
import { ProductModel } from '../../models/ProductModel';
import { globalStyles } from '../../styles/globalStyles';
import useCartStore from '../../zustand/store/useCartStore';
import useHeartStore from '../../zustand/store/useHeartStore';
import useProductStore from '../../zustand/store/useProductStore';
import useUserStore from '../../zustand/store/useUserStore';

const HomeScreen = ({ navigation, route }: any) => {
  const user = auth.currentUser;
  const { params } = route;
  const [index, setIndex] = useState(0);
  const [productsData, setProductsData] = useState<ProductModel[]>([]);
  const { setUser } = useUserStore();
  const { products, setProducts } = useProductStore();
  const { hearts, setHearts } = useHeartStore();
  const { carts, setCarts } = useCartStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      getDocData({
        id: user.uid,
        nameCollect: 'users',
        setData: setUser,
      });
      getDocsData({
        nameCollect: 'products',
        setData: setProductsData,
      });
      getDocsData({
        nameCollect: 'hearts',
        setData: setHearts,
        condition: [where('userId', '==', user.uid)],
      });
      getDocsData({
        nameCollect: 'carts',
        setData: setCarts,
        condition: [where('userId', '==', user.uid)],
      });
    }
  }, [user]);

  useEffect(() => {
    if (productsData) {
      let result = [...productsData];
      if (params && params.valueCondition) {
        const { valueCondition } = params;

        if (valueCondition.min < valueCondition.max) {
          result = result.filter(
            pro =>
              pro.price >= valueCondition.min &&
              pro.price <= valueCondition.max,
          );
        }

        if (valueCondition.starSelected > -1) {
          result = result.filter(
            pro => pro.star === valueCondition.starSelected + 1,
          );
        }
      }

      if (params && params.valueSearch) {
        result = result.filter(
          pro =>
            pro.category
              .toLowerCase()
              .includes(params.valueSearch.search.toLowerCase()) ||
            pro.description
              .toLowerCase()
              .includes(params.valueSearch.search.toLowerCase()) ||
            pro.title
              .toLowerCase()
              .includes(params.valueSearch.search.toLowerCase()),
        );
      }
      setProducts(result);
    }
  }, [productsData, params]);

  return (
    <Container>
      <SectionComponent styles={[globalStyles.header]}>
        <RowComponent
          justify="space-between"
          styles={{
            paddingHorizontal: 20,
            paddingVertical: 16,
            backgroundColor: colors.background1,
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <RowComponent onPress={() => navigation.navigate('SearchScreen')}>
            <SearchNormal1 color={colors.text} size={26} />
            <SpaceComponent width={10} />
            <TextComponent
              text="Search keywords.."
              color={colors.text}
              font={fontFamillies.poppinsMedium}
              size={sizes.bigText}
            />
          </RowComponent>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FilterScreen', {
                valueCondition: params?.valueCondition,
              })
            }
          >
            <Setting5 size={26} color={colors.text} />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>

      {/* <RowComponent onPress={ () => {
        Linking.openURL('grocery://product/6tY45jzpCJqoihWlopR0')
        console.log('linking')
      }}>
        <TextComponent text='linking' />
      </RowComponent> */}

      <SectionComponent
        styles={{
          height: '30%',
        }}
      >
        <Swiper
          autoplay
          autoplayTimeout={10}
          loop={true}
          onIndexChanged={num => setIndex(num)}
          index={index}
          style={{
            backgroundColor: 'coral',
          }}
          showsPagination={false}
        >
          <Image source={swiper01Png} style={localStyle.image} />
          <Image source={swiper02Png} style={localStyle.image} />
          <Image source={swiper03Png} style={localStyle.image} />
          <Image source={swiper04Png} style={localStyle.image} />
        </Swiper>

        <View style={localStyle.swNext}>
          <RowComponent>
            {Array.from({ length: 4 }).map((_, i) => {
              return (
                <View
                  key={i}
                  style={
                    i === index ? localStyle.swActiveDot : localStyle.swDot
                  }
                />
              );
            })}
          </RowComponent>
        </View>
      </SectionComponent>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => console.log('refreshed')}
          />
        }
      >
        <SectionComponent>
          <RowComponent justify="space-between">
            <TextComponent
              text="Categories"
              font={fontFamillies.poppinsBold}
              size={sizes.thinTitle}
            />
            <ArrowRight2
              size={sizes.thinTitle}
              color={colors.text}
              onPress={() => navigation.navigate('CategoriesScreen')}
            />
          </RowComponent>

          <SpaceComponent height={10} />

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((_, ind) => (
              <CategoryItem
                onPress={() =>
                  navigation.navigate('CategoryProductScreen', {
                    category: _.name,
                  })
                }
                key={ind}
                text={_.name}
                bg={_.color}
                uri={_.url}
              />
            ))}
          </ScrollView>
        </SectionComponent>

        <SectionComponent>
          <RowComponent justify="space-between">
            <TextComponent
              text="Featured products"
              font={fontFamillies.poppinsBold}
              size={sizes.thinTitle}
            />
            <TouchableOpacity onPress={() => { }}>
              <ArrowRight2 size={sizes.thinTitle} color={colors.text} />
            </TouchableOpacity>
          </RowComponent>
        </SectionComponent>

        <View
          style={{
            backgroundColor: colors.background1,
            height: sizes.height,
            paddingVertical: 20,
          }}
        >
          <SectionComponent
            styles={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            {products.map((_, index) => (
              <ProductItemComponent
                onPress={() =>
                  navigation.navigate('ProductDetailsScreen', {
                    productId: _.id,
                  })
                }
                key={index}
                product={_}
                carts={carts.filter(pro => pro.productId === _.id)}
                hearts={hearts.filter(pro => pro.productId === _.id)}
              />
            ))}
          </SectionComponent>
        </View>
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;
const localStyle = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  swNext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 10,
  },
  swDot: {
    height: 6,
    width: 6,
    borderRadius: 100,
    backgroundColor: colors.background,
    marginHorizontal: 2,
  },
  swActiveDot: {
    height: 6,
    width: 20,
    borderRadius: 100,
    backgroundColor: colors.primary,
    marginHorizontal: 2,
  },
});
