import { Product } from "../types/Product";
import { Tenant } from "../types/Tenant";

const TEMPORARYoneProduct: Product = {
  id: 1,
  image: '/tmp/texasBurger.png',
  categoryName: 'Tradicional',
  name: 'B7Burger',
  price: 25.50,
  description: "2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal"
}

export const useApi = (tenantSlug: string) => ({
  getTenant: async () => {
    switch (tenantSlug) {
      case 'b7burger':
        return {
          slug: 'b7burger',
          name: 'B7Burger',
          mainColor: '#F00',
          secondColor: '#0F0'
        }
        break;
      case 'b7pizza':
        return {
          slug: 'b7pizza',
          name: 'B7Pizza',
          mainColor: '#00F',
          secondColor: '#0FA'
        }
        break;
      default: return false;
    }
  },
  getAllProducts: async () => {
    let products = [];

    for (let q = 0; q < 10; q++) {
      products.push(TEMPORARYoneProduct);
    }

    return products;
  },
  getProduct: async (id: String) => {
    return TEMPORARYoneProduct;
  }
});