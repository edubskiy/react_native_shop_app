import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

// import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Cart} from './app/screens/cart/cart.component';
import {Home} from './app/screens/home/home.component';
import {ProductInfo} from './app/screens/product-info/product-info.component';

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  ProductInfo: {productId: number};
};

const App = () => {
  const Stack = createNativeStackNavigator();
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
