//types imports
import { Address } from "../types/Address";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";
import { User } from "../types/User";

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
          mainColor: '#FB9400',
          secondColor: '#FFF9F2'
        }
      case 'b7pizza':
        return {
          slug: 'b7pizza',
          name: 'B7Pizza',
          mainColor: '#6AB70A',
          secondColor: '#E0E0E0'
        }
      default: return false;
    }
  },
  getAllProducts: async () => {
    let products = [];

    for (let q = 0; q < 10; q++) {
      products.push({
        ...TEMPORARYoneProduct,
        id: q + 1
      });
    }

    return products;
  },
  getProduct: async (id: number) => {
    return {...TEMPORARYoneProduct, id};
  },
  authorizeToken: async (token: string): Promise<User | false> => {
    if(!token) return false;

    return {
      name: 'Rafael',
      email: 'rafael@teste.com'
    }
  },
  getCartProducts: async (cartCookie: string) => {
    let cart: CartItem[] = [];

    if(!cartCookie) return cart;

    const cartJson = JSON.parse(cartCookie);

    for(let i in cartJson) {
      if(cartJson[i].id && cartJson[i].qt) {
        const product = {
          ...TEMPORARYoneProduct,
          id: cartJson[i].id
        };
        cart.push({
          qt: cartJson[i].qt,
          product
        });
      }
    }

    return cart;
  },
  getUserAddresses: async (email: string) => {
    const addresses: Address[] = [];

    for(let i = 0; i < 4; i++) {
      addresses.push({
        id: i + 1,
        street: 'Rua das Flores',
        number: `${i +1}00`,
        neighborhood: 'Centro',
        cep: '99999-000',
        city: 'São Paulo', 
        state: 'SP',
      })
    }
 
    return addresses;
  }
});