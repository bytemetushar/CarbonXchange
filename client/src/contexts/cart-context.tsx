import { createContext, useContext, ReactNode } from "react";
import { useCart } from "@/hooks/use-cart";
import type { CarbonCredit } from "@shared/schema";

interface CartItem {
  credit: CarbonCredit;
  quantity: number;
  duration: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (credit: CarbonCredit, quantity?: number, duration?: string) => void;
  removeFromCart: (creditId: number) => void;
  updateQuantity: (creditId: number, quantity: number) => void;
  updateDuration: (creditId: number, duration: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartHook = useCart();

  return (
    <CartContext.Provider value={cartHook}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}