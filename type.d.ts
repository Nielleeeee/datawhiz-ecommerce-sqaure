import { CatalogObject, CatalogItem } from "square";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variantID: string;
}

interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

interface CartContextType {
  cart: Cart | null;
  addToCart: (newItem: CartItem) => {
    status: boolean;
    cart?: Cart;
    error?: any;
  };
  updateCart: (variantID: string, quantity: number) => {
    status: boolean;
    cart?: Cart;
    error?: any;
  };
  removeToCart: (variantID: string) => { status: boolean; cart?: Cart; error?: any };
  emptyCart: () => { status: boolean; cart?: Cart; error?: any };
}

interface InventoryCount {
  [key: string]: number | undefined;
}

interface SubscriptionCatalogObject extends CatalogObject {
  discount?: {
    discountData?: {
      amountMoney?: {
        amount: number;
        currency: string;
      };
      percentage?: number;
    };
  };
}