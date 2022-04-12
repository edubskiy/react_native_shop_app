import React from 'react';
import {Text, View} from 'react-native';
import {CatalogCard} from '../../components/catalog-card/catalog-card.component';
import {COLORS} from '../../store/repository/database';
import {Product} from '../../store/repository/product.entity';

interface Props {
  data: Product[];
}

export const ProductsSection: React.FC<Props> = ({data}) => {
  return (
    <View
      style={{
        padding: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              color: COLORS.black,
              fontWeight: '500',
              letterSpacing: 1,
            }}>
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
        <Text
          style={{
            fontSize: 14,
            color: COLORS.blue,
            fontWeight: '400',
          }}>
          SeeAll
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}>
        {data.map(product => {
          return <CatalogCard data={product} key={product.id} />;
        })}
      </View>
    </View>
  );
};

export const AccessoriesSection: React.FC<Props> = ({data}) => {
  return (
    <View
      style={{
        padding: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              color: COLORS.black,
              fontWeight: '500',
              letterSpacing: 1,
            }}>
            Accessories
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
        <Text
          style={{
            fontSize: 14,
            color: COLORS.blue,
            fontWeight: '400',
          }}>
          SeeAll
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}>
        {data.map(product => {
          return <CatalogCard data={product} key={product.id} />;
        })}
      </View>
    </View>
  );
};
