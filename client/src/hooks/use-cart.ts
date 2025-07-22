import { useState, useCallback } from "react";
import type { CarbonCredit } from "@shared/schema";

interface CartItem {
  credit: CarbonCredit;
  quantity: number;
  duration: string;
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((credit: CarbonCredit, quantity: number = 1, duration: string = "immediate") => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.credit.id === credit.id);
      
      if (existingIndex >= 0) {
        // Update existing item
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        // Add new item
        return [...prev, { credit, quantity, duration }];
      }
    });
  }, []);

  const removeFromCart = useCallback((creditId: number) => {
    setCartItems((prev) => prev.filter((item) => item.credit.id !== creditId));
  }, []);

  const updateQuantity = useCallback((creditId: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.credit.id === creditId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  }, []);

  const updateDuration = useCallback((creditId: number, duration: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.credit.id === creditId ? { ...item, duration } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      return total + parseFloat(item.credit.price) * item.quantity;
    }, 0);
  }, [cartItems]);

  const getCartItemCount = useCallback(() => {
    return cartItems.length;
  }, [cartItems]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateDuration,
    clearCart,
    getCartTotal,
    getCartItemCount,
  };
}