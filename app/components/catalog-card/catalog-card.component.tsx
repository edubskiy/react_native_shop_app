import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../store/repository/database'
import { Product } from '../../store/repository/product.entity'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { currencySign } from '../../constants/common'

interface Props {
  data: Product
}

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Home',
  'ProductInfo'
>

export const CatalogCard: React.FC<Props> = ({ data }) => {
  const navigation = useNavigation<NavigationProps['navigation']>()
  return (
    <View
      style={{
        width: '47%',
        // flex: 1,
        marginVertical: 14,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductInfo', {
            productId: data.id,
          })
        }
      >
        <View
          style={{
            // width: '100%',
            height: 100,
            borderRadius: 10,
            backgroundColor: COLORS.backgroundLight,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          {data.isOff ? (
            <View
              style={{
                position: 'absolute',
                width: '25%',
                height: '24%',
                backgroundColor: COLORS.green,
                top: 0,
                left: 0,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: COLORS.white,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}
              >
                {data.offPercentage}%
              </Text>
            </View>
          ) : null}
          <Image
            source={data.productImage}
            style={{
              width: '100%',
              height: '80%',
              resizeMode: 'contain',
              justifyContent: 'center',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 12,
            color: COLORS.black,
            fontWeight: '600',
            marginBottom: 2,
          }}
        >
          {data.productName}
        </Text>
        {data.category === 'accessory' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome
              name="circle"
              style={{ fontSize: 12, marginRight: 6, color: COLORS.green }}
            />
            <Text style={{ fontSize: 12, color: COLORS.green }}>Available</Text>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome
              name="circle"
              style={{ fontSize: 12, marginRight: 6, color: COLORS.red }}
            />
            <Text style={{ fontSize: 12, color: COLORS.red }}>Unvailable</Text>
          </View>
        )}
        <Text>
          {currencySign} {data.productPrice}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
