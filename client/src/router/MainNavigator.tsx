import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  AboutMeScreen,
  AddAdressScreen,
  AddCardScreen,
  AddressScreen,
  CartScreen,
  CategoriesScreen,
  CategoryProductScreen,
  FilterScreen,
  HeartScreen,
  MyCardScreen,
  MyOrderScreen,
  NotificationsScreen,
  OrderConfirmScreen,
  OrderSuccessScreen,
  PaymentMethodScreen,
  ProductDetailsScreen,
  ReviewsScreen,
  ShippingAddressScreen,
  ShippingMethodScreen,
  TrackOrderScreen,
  TransactionsScreen,
  WriteReviewScreen,
} from '../screens';
import SearchScreen from '../screens/home/SearchScreen';
import LogOutScreen from '../screens/profile/LogOutScreen';
import TabNavigator from './TabNavigator';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
      <Stack.Screen
        name="CategoryProductScreen"
        component={CategoryProductScreen}
      />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
      <Stack.Screen name="HeartScreen" component={HeartScreen} />
      <Stack.Screen name="AddressScreen" component={AddressScreen} />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
      <Stack.Screen name="AddAdressScreen" component={AddAdressScreen} />
      <Stack.Screen name="MyOrderScreen" component={MyOrderScreen} />
      <Stack.Screen name="AboutMeScreen" component={AboutMeScreen} />
      <Stack.Screen name="TransactionsScreen" component={TransactionsScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="MyCardScreen" component={MyCardScreen} />
      <Stack.Screen name="AddCardScreen" component={AddCardScreen} />
      <Stack.Screen name="ReviewsScreen" component={ReviewsScreen} />
      <Stack.Screen name="WriteReviewScreen" component={WriteReviewScreen} />
      <Stack.Screen
        name="ShippingMethodScreen"
        component={ShippingMethodScreen}
      />
      <Stack.Screen
        name="ShippingAddressScreen"
        component={ShippingAddressScreen}
      />
      <Stack.Screen
        name="PaymentMethodScreen"
        component={PaymentMethodScreen}
      />
      <Stack.Screen name="OrderSuccessScreen" component={OrderSuccessScreen} />
      <Stack.Screen name="OrderConfirmScreen" component={OrderConfirmScreen} />
      <Stack.Screen name="TrackOrderScreen" component={TrackOrderScreen} />
      <Stack.Screen name="LogOutScreen" component={LogOutScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
