import axios from "axios";

const useFetch = (url: string) => {
  const getReq = async () => {
    try {
      const resp = await (await axios.get(url)).data;
      if (resp.success == false) {
        return { data: "", error: resp.message };
      } else {
        return { data: resp, error: "" };
      }
    } catch (error) {
      return { data: "", error: "There has been an error" };
    }
  };
  return getReq;
};

export default useFetch;
