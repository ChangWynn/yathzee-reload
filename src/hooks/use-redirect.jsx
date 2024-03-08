import { useNavigate } from "react-router-dom";

const useRedirect = (path) => {
  const redirect = useNavigate();

  return () => redirect(path);
};

export default useRedirect;
