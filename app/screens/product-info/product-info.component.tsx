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
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { RootStackParamList } from '../../../App'
import { COLORS, Products } from '../../store/repository/database'
import { Product } from '../../store/repository/product.entity'
import Entypo from 'react-native-vector-icons/Entypo'
import { Colors } from 'react-native/Libraries/NewAppScreen'

type Props = NativeStackScreenProps<RootStackParamList, 'ProductInfo'>

export const ProductInfo = ({ route, navigation }: Props) => {
  const [product, setProduct] = useState<Product | null>(null)
  const { productId } = route.params

  const windowWidth = Dimensions.get('window').width

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
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
