import type { ReactNode } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

export const FormInput = ({
  type,
  refer,
  req = true,
  name,
  value,
}: {
  type: string;
  refer?: any;
  req?: boolean;
  name: string;
  value?: any;
}) => {
  return (
    <input
      type={type}
      name={name}
      id={name}
      autoComplete={name}
      ref={refer ? refer : null}
      required={req}
      defaultValue={value ? value : undefined}
      className="font-fauna min-h-12 pl-3 pr-3 border border-white/20 bg-white/10 rounded-md mb-5 outline-0 text-white"
    />
  );
};
export const FormLabel = ({
  labelFor,
  name,
  req = true,
}: {
  name: string;
  req?: boolean;
  labelFor?: string;
}) => {
  return (
    <label
      htmlFor={labelFor ? labelFor : name}
      className="capitalize pb-2 text-white font-lobster tracking-widest font-bold"
    >
      {name}
      <span className="text-red-300">{` ${req ? "*" : ""}`}</span>
    </label>
  );
};
export const Form = ({
  title,
  subTitle,
  children,
  logo,
  subVal,
  bottom,
  request,
  elseFunction,
  credFunc,
  navTo,
}: {
  title?: string;
  subTitle?: string;
  children: ReactNode;
  logo?: string;
  subVal: string;
  bottom?: any;
  request: Function;
  elseFunction?: Function;
  credFunc: Function;
  navTo: string;
}) => {
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const nav = useNavigate();
  const googleLoginUrl = "/api/v1/auth/google";
  const { user, setUser } = useAuth();

  const googleLoginSuccess = async (resp: any) => {
    const token = resp.credential;

    const { data } = await axios.post(
      googleLoginUrl,
      { token },
      {
        withCredentials: true,
        validateStatus: () => true,
      },
    );
    setUser(data.data.user);
  };
  const googleLoginError = async () => {
    console.log("Google login error");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const credentials = credFunc();
    try {
      const { data, error } = await request(credentials);
      // onSub(e);
      if (error) {
        setErr(error);
        setSuccess("");
      } else {
        setErr("");
        setSuccess(data.message);
        elseFunction && elseFunction(data);
        nav(navTo);
      }
    } catch (error) {
      setErr("There has been an error");
    }
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col bg-black/80 text-white p-8 pt-5 rounded-lg w-full max-w-100"
    >
      <div className="site-info flex flex-col items-center">
        {err && (
          <p className="error mb-3 bg-red-900 w-full text-center p-1 pl-3 pr-3 rounded-md">{err}</p>
        )}
        {success && (
          <p className="error mb-3 bg-green-900 w-full text-center p-1 pl-3 pr-3 rounded-md">
            {success}
          </p>
        )}
        {logo && <img src={logo} alt="" className="w-10 mb-5" />}
        {title && (
          <p className="site-name font-medium text-2xl mb-5 text-center font-poppins">
            <span className="font-bold font-lobster tracking-wider text-green-400">{title}</span>{" "}
            {subTitle && (
              <span>
                to
                <br />
                {subTitle}
              </span>
            )}
          </p>
        )}
      </div>
      {children}
      <input
        type="submit"
        value={subVal}
        className="font-lobster font-bold tracking-widest bg-yellow-600 h-12 text-xl mt-2 rounded-lg hover:bg-yellow-800 transition duration-200"
      />
      {bottom}
      <div className="google mt-5">
        <GoogleLogin
          theme="outline"
          size="large"
          shape="circle"
          type="standard"
          text="continue_with"
          onSuccess={googleLoginSuccess}
          onError={googleLoginError}
          useOneTap
        />
      </div>
    </form>
  );
};

// export default Form;
