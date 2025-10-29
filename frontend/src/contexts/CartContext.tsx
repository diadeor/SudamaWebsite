import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import useFetch from "../hooks/useFetch";

export const CartContext: any = createContext("");

export const useCart: any = () => useContext(CartContext);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Array<Object>>();
  const [loading, setLoading] = useState(true);
  const request = useFetch("/api/v1/carts/me");

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await request();
        if (data) {
          setCart(data);
        }
      } catch (error) {
        setCart(undefined);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <CartContext.Provider value={{ cart, setCart, request }}>
      {!loading && children}
    </CartContext.Provider>
  );
};

export default CartProvider;
