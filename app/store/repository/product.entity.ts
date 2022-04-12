import {ImageSourcePropType} from 'react-native';

export interface Product {
  id: number;
  category: 'product' | 'accessory';
  productImage: ImageSourcePropType;
  productName: string;
  productPrice: number;
  description?: string;
  isOff?: boolean;
  offPercentage?: number;
  isAvailable?: boolean;
  productImageList?: Array<string>;
}
