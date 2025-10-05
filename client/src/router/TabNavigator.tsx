import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Heart, ShoppingBag, User } from 'iconsax-react-native';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/colors';
import CartNavigator from './CartNavigator';
import HeartNavigator from './HeartNavigator';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';

const TabNavigator = ({ navigation }: any) => {
  const Tab = createBottomTabNavigator();

  const tabBarIcon = ({ focused, size, color, route }: any) => {
    color = focused ? colors.text2 : colors.text;
    size = 30;
    let icon = <Ionicons size={size} color={color} name="home-outline" />;
    switch (route.name) {
      case 'Cart':
        icon = <></>;
        break;
      case 'Heart':
        icon = (
          <Heart
            variant="TwoTone"
            color={color}
            size={size}
            onPress={() => navigation.navigate('HeartScreen')}
          />
        );
        break;
      case 'Profile':
        icon = <User color={color} size={size} />;
        break;
      default:
        icon = <Ionicons size={size} color={color} name="home-outline" />;
        break;
    }
    return (
      <View style={localStyle.tabIcon}>
        {route.name === 'Cart' && (
          <TouchableOpacity
            style={localStyle.cartIcon}
            onPress={() => navigation.navigate('CartScreen')}
          >
            <ShoppingBag
              variant="TwoTone"
              color={colors.background}
              size={42}
            />
          </TouchableOpacity>
        )}
        {icon}
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: Platform.OS === 'ios' ? 16 : 10,
        },
        tabBarIcon: ({ focused, size, color }: any) =>
          tabBarIcon({ focused, size, color, route }),
      })}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
      <Tab.Screen name="Heart" component={HeartNavigator} />
      <Tab.Screen name="Cart" component={CartNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
const localStyle = StyleSheet.create({
  tabIcon: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 100,
    top: -16,
  },
});
