import axios from "axios";

const usePost = (url: string) => {
  const postReq = async (body: object) => {
    try {
      // console.log(body);
      const response = await (
        await axios.post(url, body, {
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

  return postReq;
};

export default usePost;
