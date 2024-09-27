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
  addToCart: (newItem: CartItem, quantity: number) => {
    status: boolean;
    cart?: Cart;
    error?: any;
  };
  updateCart: ({ id, quantity }: CartItem) => {
    status: boolean;
    cart?: Cart;
    error?: any;
  };
  removeToCart: (id: string) => { status: boolean; cart?: Cart; error?: any };
  emptyCart: () => { status: boolean; cart?: Cart; error?: any };
}
