import { View, Text, AsyncStorage } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Product } from '../../store/repository/product.entity';
import { RootStackParamList } from '../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Products } from '../../store/repository/database';

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

    if (!foundCartItems) return [];

    const productIds: Array<Product['id']> = JSON.parse(foundCartItems);

    return Products.filter((p) => productIds.indexOf(p.id) > -1);
  };

  return (
    <View>
      <Text>Cart</Text>
    </View>
  );
};
