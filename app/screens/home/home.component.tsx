import {
  View,
  Text,
  useColorScheme,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, Items} from '../../store/repository/database';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ScrollView} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Product} from '../../store/repository/product.entity';
import {CatalogCard} from '../../components/catalog-card/catalog-card.component';
import {AccessoriesSection, ProductsSection} from './home.sections';

interface Props {
  // TODO
  navigation: any;
}

export const Home: React.FC<Props> = ({navigation}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [accessory, setAccessory] = useState<Product[]>([]);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const {products, accessories} = getDataFromDB();

      setProducts(products);
      setAccessory(accessories);
    });

    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = () => {
    const products = Items.filter(i => i.category === 'product');
    const accessories = Items.filter(i => i.category === 'accessory');

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
        }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 16,
            }}>
            <TouchableOpacity>
              <Entypo
                name="shopping-bag"
                style={{
                  fontSize: 18,
                  color: COLORS.backgroundMedium,
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: COLORS.backgroundLight,
                }}></Entypo>
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="cart"
                style={{
                  fontSize: 18,
                  color: COLORS.backgroundMedium,
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: COLORS.backgroundLight,
                }}></MaterialCommunityIcons>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 10, padding: 16}}>
            <Text
              style={{
                fontSize: 26,
                color: COLORS.black,
                fontWeight: '500',
                letterSpacing: 1,
                marginBottom: 10,
              }}>
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
              }}>
              Audio shop on 7th Ave 57.
              {'\n'}This shop offers both products and services
            </Text>
          </View>
          <ProductsSection data={products} />
          <AccessoriesSection data={accessory} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
