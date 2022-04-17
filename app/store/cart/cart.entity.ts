import { Product } from './../repository/product.entity';
import { CartService } from './cart.service';

export class Cart {
  private service: CartService;

  constructor({ service }: { service: CartService }) {
    this.service = service;
  }

  public async getIds(): Promise<Array<Product['id']>> {
    return await this.service.getIds();
  }

  public async setIds(ids: Array<Product['id']>) {
    return await this.service.setIds(ids);
  }
}
