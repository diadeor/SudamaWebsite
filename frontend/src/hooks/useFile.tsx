const useFile = (textChange: Function) => {
  const handleFile = (e: any, reference: any) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        reference.current && reference.current.setAttribute("src", e.target.result);
        textChange("");
      };
      reader.readAsDataURL(file);
    }
  };
  return handleFile;
};

export default useFile;
