import { Tenant } from "../types/Tenant";

export const useApi = () => ({
  getTenant: (tenantSlug: string): boolean | Tenant => {
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
  }
});