import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import logo from "../assets/Sudama.png";
import { useAuth } from "../contexts/AuthContext";
import usePost from "../hooks/usePost";
import { FormInput, FormLabel, Form } from "../components/Form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailInput: any = useRef("");
  const passInput: any = useRef("");
  const { user, setUser } = useAuth();
  const req = usePost("/api/v1/auth/login");
  const nav = useNavigate();

  const elseFunc = ({ data }: { data: Object }) => {
    setUser(data?.user);
  };
  const cFunc = () => {
    return { email: emailInput.current.value, pass: passInput.current.value };
  };
  useEffect(() => {
    if (user) {
      nav(user.role == "admin" ? "/admin" : "/profile");
    }
  }, [user]);
  return (
    <div className="login-container h-screen p-5 tracking-wide flex flex-row justify-center items-center w-full">
      <Form
        title="Sign in"
        navTo="/profile"
        subTitle="Sudama Plant Store"
        logo={logo}
        subVal="Sign in"
        request={req}
        elseFunction={elseFunc}
        credFunc={cFunc}
        bottom={
          <>
            <p className="pt-3">
              No account ?{" "}
              <Link to="/register" className="font-bold">
                Create one
              </Link>
            </p>
          </>
        }
      >
        <FormLabel name="email" />
        <FormInput type="email" refer={emailInput} name="email" />
        <FormLabel name="password" />
        <FormInput type="password" refer={passInput} name="pass" />
      </Form>
    </div>
  );
};

export default Login;
