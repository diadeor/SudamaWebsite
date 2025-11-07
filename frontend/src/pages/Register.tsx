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
  const elseFunc = ({ data }: { data: { user: Object } }) => {
    setUser(data?.user);
  };
  useEffect(() => {
    if (user) nav(user.role == "admin" ? "/admin" : "/");
  }, [user]);
  return (
    <div className="w-full signup-container h-[calc(100svh-70px)] p-5 tracking-wide flex flex-row justify-center items-center">
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
          <p className="pt-3 font-poppins">
            Have an account ?{" "}
            <Link to="/login" className="font-bold text-yellow-500">
              Login
            </Link>
          </p>
        }
      >
        <FormLabel name="name" />
        <FormInput type="text" refer={nameInput} name="name" />
        <FormLabel name="email" />
        <FormInput type="email" refer={emailInput} name="email" />
        <FormLabel name="password" />
        <FormInput type="password" refer={passInput} name="password" />
      </Form>
    </div>
  );
};

export default Register;
