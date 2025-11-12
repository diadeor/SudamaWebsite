import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./contexts/AuthContext.tsx";
import CartProvider from "./contexts/CartContext.tsx";
import ItemProvider from "./contexts/ItemContext.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = document.getElementById("root");

createRoot(root!).render(
  <GoogleOAuthProvider clientId="25488743017-mvo02kpmbl5rtto3tds3eli6kgv0ga18.apps.googleusercontent.com">
    <AuthProvider>
      <ItemProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ItemProvider>
    </AuthProvider>
  </GoogleOAuthProvider>,
);
