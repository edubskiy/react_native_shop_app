export interface Item {
  id: number;
  category: 'product' | 'accessory';
  productName?: string;
  productPrice?: number;
  description?: string;
  isOff?: boolean;
  offPercentage?: number;
  productImage?: string;
  isAvailable?: boolean;
  productImageList?: Array<string>;
}
