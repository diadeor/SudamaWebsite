import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import usePost from "../hooks/usePost";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [err, setErr] = useState("");
  const [result, setResult] = useState("");
  const [emailField, setEmailField] = useState(user?.email);
  const [nameField, setNameField] = useState(user?.name);
  const URI = `/api/v1/users/update/${user?.id}`;
  const req = usePost(URI);
  const getReq = useFetch("/api/v1/auth/logout");
  const nav = useNavigate();

  useEffect(() => {
    if (!user) nav("/login");
  }, []);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const creds = {
        name: nameField,
        email: emailField,
      };
      const { data, error } = await req(creds);
      data ? setErr("") : setResult("");
      data ? setUser(data.data) : null;
      console.log(data, error);
      setResult(data);
      setErr(error);

      // const { data, error } = usePost(`/api/v1/users/update/${user.id}`);
      // console.log(data, error);
    } catch (error) {
      setErr("Error handling update");
    }
  };

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const { data, error } = await getReq();
      data ? setErr("") : setResult("");
      data ? setUser(null) : null;
      setResult(data);
      setErr(error);
      nav("/login");
    } catch (error) {
      setErr("Error while signing out");
    }
  };

  return (
    <div className="profile-container h-[calc(100vh-70px)] bg-green-950 p-10 tracking-wide flex flex-row justify-center items-center">
      <form
        onSubmit={(e) => handleUpdate(e)}
        className=" bg-black/40 p-10 pt-6 flex flex-col text-white tracking-wider rounded-md font-bold"
      >
        {(err || result) && (
          <p
            className={`error mb-3 bg-${
              err ? "red" : "green"
            }-900 w-[100%] text-center p-1 pl-3 pr-3 rounded-md`}
          >
            {err || result?.message}
          </p>
        )}
        <h2 className="text-center text-white font-bold text-4xl mb-10">
          Welcome,
          <br />
          <span className="text-yellow-600">{user?.name}</span>
        </h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={nameField}
          onChange={(e) => setNameField(e.target.value)}
          className="h-12 text-yellow-600 bg-white/10 border-1 border-white/20 mb-7 pl-4"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={emailField}
          onChange={(e) => setEmailField(e.target.value)}
          className="h-12 text-yellow-600 bg-white/10 border-1 border-white/20 mb-7 pl-4"
        />
        <input
          type="submit"
          value="Save"
          className="bg-yellow-600 p-2.5 rounded-sm cursor-pointer hover:scale-95 transition duration-200"
        />
        <button
          onClick={(e) => handleLogout(e)}
          className="log-out p-2.5 bg-gray-600 mt-5 rounded-sm cursor-pointer hover:scale-95 transition duration-200"
        >
          ⮨ Sign Out
        </button>
      </form>
    </div>
  );
};

export default Profile;
