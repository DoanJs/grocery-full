import React from 'react';
import { ActivityIndicator, View } from 'react-native';
interface Props {
  size: number;
}
const LoadingComponent = (props: Props) => {
  const { size } = props;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size={size} />
    </View>
  );
};

export default LoadingComponent;
