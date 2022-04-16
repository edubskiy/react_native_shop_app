import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  ListRenderItemInfo,
  ImageSourcePropType,
  Dimensions,
  Animated,
  ToastAndroid,
  Platform,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { RootStackParamList } from '../../../App'
import { COLORS, Products } from '../../store/repository/database'
import { Product } from '../../store/repository/product.entity'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { currencySign } from '../../constants/common'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = NativeStackScreenProps<RootStackParamList, 'ProductInfo'>

export const ProductInfo = ({ route, navigation }: Props) => {
  const [product, setProduct] = useState<Product | null>(null)
  const { productId } = route.params

  const windowWidth = Dimensions.get('window').width
  const scrollX = new Animated.Value(0)
  const position = Animated.divide(scrollX, windowWidth)
  const productTax = product?.productPrice! / 20

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const { foundProduct } = getDataFromDB()

      if (foundProduct) {
        setProduct(foundProduct)
      }
    })

    return unsubscribe
  }, [navigation])

  const getDataFromDB = () => {
    const foundProduct = Products.find((p) => p.id === productId)

    return {
      foundProduct,
    }
  }

  const addToCart = async (productId: Product['id']) => {
    const cartProductIds = JSON.parse(
      (await AsyncStorage.getItem('cartItems')) as string
    )
    const newCartProductIds = []

    try {
      if (cartProductIds) {
        newCartProductIds.push([...cartProductIds])
      }

      newCartProductIds.push(productId)

      await AsyncStorage.setItem('cartItems', JSON.stringify(newCartProductIds))

      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Product has been succcessfully added to cart',
          ToastAndroid.SHORT
        )
      } else {
        // TODO
      }

      navigation.navigate('Home')
    } catch (error) {
      return error
    }

    if (cartProductIds) {
      try {
        await AsyncStorage.setItem(
          'cartItems',
          JSON.stringify([...cartProductIds, productId])
        )

        ToastAndroid.show(
          'Product has been succcessfully added to cart',
          ToastAndroid.SHORT
        )

        navigation.navigate('Home')
      } catch (error) {
        return error
      }
    } else {
    }

    // const foundProduct = Products.find((p) => p.id === productId)
  }

  const renderProduct = (props: ListRenderItemInfo<ImageSourcePropType>) => {
    const { item, index } = props

    console.log(item, props)

    return (
      <View
        style={{
          width: windowWidth,
          height: 240,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={item}
          style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
        />
      </View>
    )
  }

  return (
    <SafeAreaView>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLORS.white,
          position: 'relative',
        }}
      >
        <StatusBar
          backgroundColor={COLORS.backgroundLight}
          barStyle="dark-content"
        />
        <ScrollView>
          <View
            style={{
              width: '100%',
              backgroundColor: COLORS.backgroundLight,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 4,
            }}
          >
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 16,
                paddingLeft: 16,
              }}
            >
              <TouchableOpacity>
                <Entypo
                  name="chevron-left"
                  style={{
                    fontSize: 18,
                    color: COLORS.backgroundDark,
                    padding: 12,
                    backgroundColor: COLORS.white,
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={product?.productImageList ?? null}
              horizontal
              renderItem={renderProduct}
              showsHorizontalScrollIndicator={false}
              decelerationRate={0.8}
              snapToInterval={windowWidth}
              bounces={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
            />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 32,
                marginBottom: 16,
              }}
            >
              {product?.productImageList?.map((product, index) => {
                const opacity = position.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [0.2, 1, 0.2],
                  extrapolate: 'clamp',
                })
                return (
                  <Animated.View
                    key={index}
                    style={{
                      width: '16%',
                      height: 2.4,
                      backgroundColor: COLORS.black,
                      opacity: opacity,
                      marginHorizontal: 4,
                      borderRadius: 100,
                    }}
                  ></Animated.View>
                )
              })}
            </View>
          </View>
          <View style={{ paddingHorizontal: 16, marginTop: 6 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 14,
              }}
            >
              <Entypo
                name="shopping-cart"
                style={{ fontSize: 20, color: COLORS.blue, marginRight: 6 }}
              />
              <Text style={{ fontSize: 12, color: COLORS.black }}>
                Shopping
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 4,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '600',
                  marginVertical: 4,
                  letterSpacing: 0.5,
                  color: COLORS.black,
                  maxWidth: '84%',
                }}
              >
                {product?.productName}
              </Text>
              <View
                style={{
                  borderRadius: 100,
                  marginRight: 6,
                  backgroundColor: COLORS.blue + 10,
                  padding: 8,
                }}
              >
                <Ionicons
                  name="link-outline"
                  style={{ fontSize: 24, color: COLORS.blue }}
                />
              </View>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: COLORS.black,
                fontWeight: '400',
                letterSpacing: 1,
                opacity: 0.5,
                lineHeight: 20,
                maxWidth: '85%',
                maxHeight: 44,
                marginBottom: 18,
              }}
            >
              {product?.description}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 14,
                borderBottomColor: COLORS.backgroundLight,
                borderBottomWidth: 1,
                paddingBottom: 20,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.backgroundLight,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 12,
                    borderRadius: 100,
                    marginRight: 10,
                  }}
                >
                  <Entypo
                    name="location-pin"
                    style={{ fontSize: 16, color: COLORS.blue }}
                  />
                </View>
                <Text>
                  Audio shop on 7th Ave 57.
                  {'\n'}This shop offers products and services
                </Text>
              </View>
              <Entypo
                name="chevron-right"
                style={{ fontSize: 22, color: COLORS.backgroundDark }}
              />
            </View>
            <View style={{ paddingHorizontal: 16 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  maxWidth: '85%',
                  color: COLORS.black,
                  marginBottom: 4,
                }}
              >
                {currencySign} {product?.productPrice}.00
              </Text>
              <Text style={{ opacity: 0.7 }}>
                Tax Rate 2% {currencySign} {productTax} (
                {product?.productPrice! + productTax})
              </Text>
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
            onPress={() =>
              product?.isAvailable ? addToCart(product.id) : null
            }
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
              {product?.isAvailable ? 'Add to cart' : 'Not available'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
