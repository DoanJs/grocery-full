import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { EmptyScreen } from '../screens'

const CartNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='EmptyScreen' component={EmptyScreen} />
        </Stack.Navigator>
    )
}

export default CartNavigator