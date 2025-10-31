import axios from "axios";

const usePut = (url: string) => {
  const putReq = async (body: object) => {
    try {
      const response = await (
        await axios.put(url, body, {
          withCredentials: true,
          validateStatus: () => true,
        })
      ).data;
      if (response.success == false) {
        return { data: null, error: response.message };
      } else {
        return { data: response, error: null };
      }
    } catch (error) {
      return { data: null, error: "There has been an error" };
    }
  };

  return putReq;
};

export default usePut;
