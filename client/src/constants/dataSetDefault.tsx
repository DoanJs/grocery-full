import {
  Barcode,
  Box,
  Call,
  Card,
  GlobalSearch,
  Heart,
  Location,
  Logout,
  Message,
  Notification,
  Solana,
  TransactionMinus,
  User,
} from 'iconsax-react-native';

import { colors } from './colors';

export const categories = [
  {
    name: 'Vegetables',
    url: 'https://res.cloudinary.com/filesuploadonserver/image/upload/v1755677589/Grocery/icons/vegetableCate_c2ytzp.png',
    color: colors.vegetable,
  },
  {
    name: 'Fruits',
    url: 'https://res.cloudinary.com/filesuploadonserver/image/upload/v1755677568/Grocery/icons/fruitsCate_odwzfb.png',
    color: colors.fruit,
  },
  {
    name: 'Beverages',
    url: 'https://res.cloudinary.com/filesuploadonserver/image/upload/v1755677546/Grocery/icons/beveragesCate_covud9.png',
    color: colors.beverage,
  },
  {
    name: 'Grocery',
    url: 'https://res.cloudinary.com/filesuploadonserver/image/upload/v1755677580/Grocery/icons/groceryCate_kmgtxc.png',
    color: colors.grocery,
  },
  {
    name: 'Edible oil',
    url: 'https://res.cloudinary.com/filesuploadonserver/image/upload/v1755677560/Grocery/icons/edibleOilCate_vkbxqv.png',
    color: colors.edibleOil,
  },
  {
    name: 'Household',
    url: 'https://res.cloudinary.com/filesuploadonserver/image/upload/v1755677579/Grocery/icons/householdCate_v409jl.png',
    color: colors.household,
  },
];
export const profileItems = [
  {
    icon: <User color={colors.green} size={20} />,
    title: 'About me',
    screen: 'AboutMeScreen',
  },
  {
    icon: <Box color={colors.green} size={20} />,
    title: 'My Orders',
    screen: 'MyOrderScreen',
  },
  {
    icon: <Heart color={colors.green} size={20} />,
    title: 'My Favorites',
    screen: 'HeartScreen',
  },
  {
    icon: <Location color={colors.green} size={20} />,
    title: 'My Address',
    screen: 'AddressScreen',
  },
  {
    icon: <Card color={colors.green} size={20} />,
    title: 'Credit Cards',
    screen: 'MyCardScreen',
  },
  {
    icon: <TransactionMinus color={colors.green} size={20} />,
    title: 'Transactions',
    screen: 'TransactionsScreen',
  },
  {
    icon: <Notification color={colors.green} size={20} />,
    title: 'Notifications',
    screen: 'NotificationsScreen',
  },
  {
    icon: <Logout color={colors.green} size={20} />,
    title: 'Sign out',
    screen: 'LogOutScreen',
  },
];
export const addressItems = [
  {
    icon: <User size={20} color={colors.text} />,
    title: 'Name',
    name: 'name'
  },
  {
    icon: <Message size={20} color={colors.text} />,
    title: 'Email address',
    name: 'email'
  },
  {
    icon: <Call size={20} color={colors.text} />,
    title: 'Phone number',
    name: 'phone'
  },
  {
    icon: <Location size={20} color={colors.text} />,
    title: 'Address',
    name: 'address'
  },
  {
    icon: <Barcode size={20} color={colors.text} />,
    title: 'Zip code',
    name: 'zipCode'
  },
  {
    icon: <Solana size={20} color={colors.text} />,
    title: 'City',
    name: 'city'
  },
  {
    icon: <GlobalSearch size={20} color={colors.text} />,
    title: 'Country',
    name: 'country'
  },
];
export const notificationItems = [
  {
    title: 'Allow Notifcations',
    key: 'allowNotifications',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadi pscing elitr, sed diam nonumym',
    value: true,
  },
  {
    title: 'Email Notifcations',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadi pscing elitr, sed diam nonumym',
    value: false,
    key: 'emailNotifications',
  },
  {
    title: 'Order Notifcations',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadi pscing elitr, sed diam nonumym',
    value: false,
    key: 'orderNotifications',
  },
  {
    title: 'General Notifcations',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadi pscing elitr, sed diam nonumym',
    value: true,
    key: 'generalNotifications',
  },
];