import { createContext, useState, useEffect, useContext, type ReactNode } from "react";
import axios from "axios";

export const AuthContext: any = createContext("");

export const useAuth: any = () => useContext(AuthContext);

export const baseUrl = import.meta.env.VITE_API_URL;

/*
const generateRandomCode = () => {
  const lowStr = "abcdefghijklmnopqrstuvwxyz";
  const string = `${lowStr}${lowStr.toUpperCase()}01234567890`;
  let generated = "";
  for (let i = 1; i <= 20; i++) {
    const random = Math.round(Math.random() * 61);
    generated += string[random];
  }
  return generated;
};
*/

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const visitRequest = usePost(`${baseUrl}/visits/update`);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await (
          await axios.get(`${baseUrl}/users/me`, {
            withCredentials: true,
            validateStatus: () => true,
          })
        ).data;

        // const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
        // await sleep(10000);
        if (resp.success) {
          setUser(resp.user);
        } else throw new Error("User not authorized");
        // if (!localStorage.getItem("session")) {
        //   localStorage.setItem("session", generateRandomCode());
        // }
        // await visitRequest({
        //   user: resp.user ? resp.user.id : null,
        //   session: localStorage.getItem("session"),
        // });
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
