// linking.ts
const linking = {
  prefixes: ['grocery://'],
  config: {
    screens: {
      // ProductDetailsScreen: 'product/:productId',
      ReviewsScreen: 'product/review/:productId',
    },
  },
};

export default linking;
