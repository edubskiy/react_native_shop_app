import React from 'react';
import {Text} from 'react-native';
import {Product} from '../../store/repository/product.entity';

interface Props {
  data: Product;
}

export const CatalogCard: React.FC<Props> = ({data}) => {
  return <Text>{data.productName}</Text>;
};
