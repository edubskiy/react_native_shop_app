import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Cart } from './app/screens/cart/cart.component';

// import {Colors} from 'react-native/Libraries/NewAppScreen';
import { Home } from './app/screens/home/home.component';
import { ProductInfo } from './app/screens/product-info/product-info.component';
import { CartEntity } from './app/store/cart/cart.entity';
import { CartServiceImpl } from './app/store/cart/cart.service';

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  ProductInfo: { productId: number };
};

export const cart = new CartEntity({
  service: new CartServiceImpl(),
});

const App = () => {
  const Stack = createNativeStackNavigator();
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
