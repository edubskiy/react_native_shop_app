import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Product } from '../../store/repository/product.entity';
import { cart, RootStackParamList } from '../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, Products } from '../../store/repository/database';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
    const productIds = await cart.getIds();

    return Products.filter((p) => productIds.indexOf(p.id) > -1);
  };

  const renderCartItems = (data: Product, index: number) => {
    return (
      <View key={data.id}>
        <Text>{data.productName}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLORS.white,
        }}
      >
        <ScrollView>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingTop: 16,
              paddingHorizontal: 16,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View
                style={{
                  padding: 12,
                  backgroundColor: COLORS.backgroundLight,
                  borderRadius: 12,
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  style={{
                    fontSize: 18,
                    color: COLORS.backgroundDark,
                  }}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{ fontSize: 14, color: COLORS.black, fontWeight: '400' }}
            >
              Order details
            </Text>
            <View></View>
          </View>
          <Text
            style={{
              fontSize: 20,
              color: COLORS.black,
              fontWeight: '500',
              letterSpacing: 1,
              paddingTop: 20,
              paddingLeft: 16,
              marginBottom: 20,
            }}
          >
            My Cart
          </Text>
          <View>
            {cartItems.length ? cartItems.map(renderCartItems) : null}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
