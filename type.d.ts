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
  addToCart: (item: any) => void;
  updateCart: (item: any) => void;
  removeToCart: (item: any) => void;
  emptyCart: () => void;
}