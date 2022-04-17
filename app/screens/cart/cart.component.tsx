import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Product } from '../../store/repository/product.entity';
import { cart, RootStackParamList } from '../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, Products } from '../../store/repository/database';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { currencySign } from '../../constants/common';

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

  const removeItemFromTheCart = (productId: Product['id']) => {
    const newCartItems = cartItems.filter((i) => i.id !== productId);

    setCartItems(newCartItems);

    cart.setIds(newCartItems.map((i) => i.id));
  };

  const renderCartItems = (data: Product, index: number) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductInfo', {
            productId: data.id,
          })
        }
        style={{
          width: '100%',
          height: 100,
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          key={data.id}
          style={{
            width: '30%',
            height: 100,
            padding: 14,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.backgroundLight,
            borderRadius: 10,
            marginRight: 22,
          }}
        >
          <Image
            source={data.productImage}
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
          />
        </View>
        <View
          style={{ flex: 1, height: '100%', justifyContent: 'space-around' }}
        >
          <View>
            <Text
              style={{
                fontSize: 14,
                maxWidth: '100%',
                color: COLORS.black,
                fontWeight: '600',
                letterSpacing: 1,
              }}
            >
              {data.productName}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.6,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  maxWidth: '85%',
                  marginRight: 4,
                }}
              >
                {currencySign} {data.productPrice}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity>
                <View
                  style={{
                    borderRadius: 100,
                    marginRight: 20,
                    padding: 4,
                    borderWidth: 1,
                    borderColor: COLORS.backgroundMedium,
                    opacity: 0.5,
                  }}
                >
                  <MaterialCommunityIcons
                    name="minus"
                    style={{
                      fontSize: 16,
                      color: COLORS.backgroundDark,
                    }}
                  />
                </View>
              </TouchableOpacity>

              <Text>1</Text>
              <TouchableOpacity>
                <View
                  style={{
                    borderRadius: 100,
                    marginLeft: 20,
                    padding: 4,
                    borderWidth: 1,
                    borderColor: COLORS.backgroundMedium,
                    opacity: 0.5,
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    style={{
                      fontSize: 16,
                      color: COLORS.backgroundDark,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                removeItemFromTheCart(data.id);
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.backgroundLight,
                  borderRadius: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="delete-outline"
                  style={{
                    fontSize: 16,
                    padding: 8,

                    color: COLORS.backgroundDark,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
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
          <View style={{ marginHorizontal: 16 }}>
            {cartItems.length ? cartItems.map(renderCartItems) : null}
          </View>
          <View>
            <View
              style={{
                paddingHorizontal: 16,
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                  marginBottom: 20,
                }}
              >
                Delivery Location
              </Text>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: COLORS.backgroundLight,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 12,
                        borderRadius: 10,
                        marginRight: 18,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="truck-delivery-outline"
                        style={{
                          fontSize: 18,
                          color: COLORS.blue,
                        }}
                      />
                    </View>
                    <View style={{ opacity: 0.7 }}>
                      <Text style={{ fontWeight: '800', fontSize: 14 }}>
                        7th Ave 57
                      </Text>
                      <Text>New York, USA</Text>
                    </View>
                  </View>
                  <View>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      style={{ fontSize: 22, color: COLORS.black }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingHorizontal: 16,
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                  marginBottom: 20,
                }}
              >
                Payment Method
              </Text>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: COLORS.backgroundLight,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 12,
                        borderRadius: 10,
                        marginRight: 18,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '900',
                          color: COLORS.blue,
                          letterSpacing: 1,
                        }}
                      >
                        VISA
                      </Text>
                    </View>
                    <View style={{ opacity: 0.7 }}>
                      <Text style={{ fontWeight: '800', fontSize: 14 }}>
                        Visa Classic
                      </Text>
                      <Text>****5542</Text>
                    </View>
                  </View>
                  <View>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      style={{ fontSize: 22, color: COLORS.black }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingHorizontal: 16,
                marginTop: 40,
                marginBottom: 80,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                  marginBottom: 20,
                }}
              >
                Order Info
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    maxWidth: '80%',
                    color: COLORS.black,
                    opacity: 0.5,
                  }}
                >
                  Subtotal
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: COLORS.black,
                    opacity: 0.8,
                  }}
                >
                  {currencySign} {total}.00
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 22,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    maxWidth: '80%',
                    color: COLORS.black,
                    opacity: 0.5,
                  }}
                >
                  Shipping Tax
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: COLORS.black,
                    opacity: 0.8,
                  }}
                >
                  {currencySign} {total / 20}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    maxWidth: '80%',
                    color: COLORS.black,
                    opacity: 0.5,
                  }}
                >
                  Total
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    color: COLORS.black,
                  }}
                >
                  {currencySign} {total + total / 20}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            height: '8%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              width: '86%',
              height: '90%',
              backgroundColor: COLORS.blue,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                letterSpacing: 1,
                color: COLORS.white,
                textTransform: 'uppercase',
              }}
            >
              {'Checkout'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
