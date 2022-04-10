import {
  View,
  Text,
  useColorScheme,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, Items} from '../../database/database';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ScrollView} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Item} from '../../database/item.entity';

interface HomeProps {
  // TODO
  navigation: any;
}

export const Home: React.FC<HomeProps> = ({navigation}) => {
  const [products, setProducts] = useState<Item[]>([]);
  const [accessory, setAccessory] = useState<Item[]>([]);

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
                  // borderWidth: 1,
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
          <View
            style={{
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{fontSize: 18, color: COLORS.black, fontWeight: '500'}}>
                Products
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.black,
                  fontWeight: '400',
                  opacity: 0.5,
                  marginLeft: 10,
                }}>
                41
              </Text>
            </View>
            <Text style={{fontSize: 14, color: COLORS.blue, fontWeight: '400'}}>
              See All
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
