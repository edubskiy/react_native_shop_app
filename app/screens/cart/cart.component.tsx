import { View, Text, AsyncStorage } from 'react-native';
// import {AsyncStorage  } from 'react-native-com'
import React, { useEffect, useState } from 'react';
import { Product } from '../../store/repository/product.entity';
import { RootStackParamList } from '../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Products } from '../../store/repository/database';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

export const Cart = ({ navigation }: Props) => {
  const [cartItems, setCartItems] = useState<Product[] | []>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const foundCartItems = await getDataFromDB();

      setCartItems(foundCartItems);
      setTotal(foundCartItems.reduce((p, c) => p + c.productPrice, 0));
    });

    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = async (): Promise<Product[]> => {
    const foundCartItems = await AsyncStorage.getItem('cartItems');

    console.log('found cart items');
    console.log(foundCartItems);

    if (!foundCartItems) return [];

    const productIds: Array<Product['id']> = JSON.parse(foundCartItems);

    return Products.filter((p) => productIds.indexOf(p.id) > -1);
  };

  return (
    <SafeAreaView>
      <View>
        {cartItems.length
          ? cartItems.map((product) => {
              return <Text>{product.productName}</Text>;
            })
          : null}
      </View>
    </SafeAreaView>
  );
};
