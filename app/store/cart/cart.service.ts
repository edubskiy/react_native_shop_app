import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../repository/product.entity';

export interface CartService {
  getKey: () => string;

  getIds: () => Promise<Array<Product['id']>>;

  setIds: (ids: Array<Product['id']>) => void;
}

export class CartServiceImpl implements CartService {
  private key = 'cartItems';

  public getKey() {
    return this.key;
  }

  public async getIds(): Promise<Array<Product['id']>> {
    const foundItems = await AsyncStorage.getItem(this.getKey());

    if (!foundItems) return [];

    return JSON.parse(foundItems);
  }

  public async setIds(ids: Array<Product['id']>) {
    await AsyncStorage.setItem(this.getKey(), JSON.stringify(ids));
  }
}
