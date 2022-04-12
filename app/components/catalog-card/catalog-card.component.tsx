import React from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../../store/repository/database';
import {Product} from '../../store/repository/product.entity';

interface Props {
  data: Product;
}

export const CatalogCard: React.FC<Props> = ({data}) => {
  return (
    <View
      style={{
        width: '47%',
        // flex: 1,
        marginVertical: 14,
      }}>
      <TouchableOpacity>
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
          }}>
          {data.isOff ? (
            <View
              style={{
                position: 'absolute',
                width: '20%',
                height: '24%',
                backgroundColor: COLORS.green,
                top: 0,
                left: 0,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: COLORS.white,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}>
                {data.offPercentage}
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
          }}>
          {data.productName}
        </Text>
        {data.category === 'accessory' ? null : null}
        <Text>&#8377; {data.productPrice}</Text>
      </TouchableOpacity>
    </View>
  );
};
