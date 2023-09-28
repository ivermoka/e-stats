import { useEffect, useState } from "react";

const GetUser = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(localStorage.getItem("username"));
    }
  }, []);

  return user;
};

export { GetUser };
