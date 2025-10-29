import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./contexts/AuthContext.tsx";
import CartProvider from "./contexts/CartContext.tsx";

const root = document.getElementById("root");

createRoot(root!).render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>,
);
