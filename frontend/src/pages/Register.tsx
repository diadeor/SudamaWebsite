import { useRef, useEffect } from "react";
import usePost from "../hooks/usePost";
import { Form, FormInput, FormLabel } from "../components/Form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/Sudama.png";

const Register = () => {
  const nameInput: any = useRef("");
  const emailInput: any = useRef("");
  const passInput: any = useRef("");
  const nav = useNavigate();
  const { user, setUser } = useAuth();
  const req = usePost("/api/v1/auth/register");

  const cFunc = () => {
    return {
      name: nameInput.current.value,
      email: emailInput.current.value,
      pass: passInput.current.value,
    };
  };
  const elseFunc = ({ data }: { data: Object }) => {
    setUser(data?.user);
  };
  useEffect(() => {
    if (user) nav(user.role == "admin" ? "/admin" : "/");
  }, [user]);
  return (
    <div className="signup-container h-screen p-5 tracking-wide flex flex-row justify-center items-center">
      <Form
        title="Sign Up"
        subTitle="Sudama Plant Store"
        logo={logo}
        subVal="Sign Up"
        request={req}
        navTo="/"
        credFunc={cFunc}
        elseFunction={elseFunc}
        bottom={
          <p className="pt-3">
            Have an account ?{" "}
            <Link to="/login" className="font-bold">
              Login
            </Link>
          </p>
        }
      >
        <FormLabel name="name" />
        <FormInput type="text" refer={nameInput} />
        <FormLabel name="email" />
        <FormInput type="email" refer={emailInput} />
        <FormLabel name="password" />
        <FormInput type="password" refer={passInput} />
      </Form>
    </div>
  );
};

export default Register;
