import {
  View,
  Text,
  useColorScheme,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, Products } from '../../store/repository/database';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Product } from '../../store/repository/product.entity';
import { AccessoriesSection, ProductsSection } from './home.sections';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const Home: React.FC<Props> = ({ navigation }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);

  const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const { products, accessories } = getDataFromDB();

      setProducts(products);
      setAccessories(accessories);
    });

    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = () => {
    const products = Products.filter((i) => i.category === 'product');
    const accessories = Products.filter((i) => i.category === 'accessory');

    return {
      products,
      accessories,
    };
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
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 16,
            }}
          >
            <TouchableOpacity>
              <Entypo
                name="shopping-bag"
                style={{
                  fontSize: 18,
                  color: COLORS.backgroundMedium,
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: COLORS.backgroundLight,
                }}
              ></Entypo>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <MaterialCommunityIcons
                name="cart"
                style={{
                  fontSize: 18,
                  color: COLORS.backgroundMedium,
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: COLORS.backgroundLight,
                }}
              ></MaterialCommunityIcons>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 10, padding: 16 }}>
            <Text
              style={{
                fontSize: 26,
                color: COLORS.black,
                fontWeight: '500',
                letterSpacing: 1,
                marginBottom: 10,
              }}
            >
              Hi-Fi Shop &amp; Service
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.black,
                fontWeight: '400',
                letterSpacing: 1,
                marginBottom: 10,
                lineHeight: 24,
              }}
            >
              Audio shop on 7th Ave 57.
              {'\n'}This shop offers both products and services
            </Text>
          </View>
          <ProductsSection data={products} />
          <AccessoriesSection data={accessories} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
