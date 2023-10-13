import { useEffect, useState } from "react";

const GetUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
    if (storedUsername && storedToken) {
      verifyUser(storedUsername, storedToken).then();
    }
  }, []);

  const verifyUser = async (username, token) => {
    try {
      const response = await fetch(
        `/api/verifyUser?username=${username}&token=${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setUser(await response.json());
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        console.error("Error", await response.json());
      }
    } catch (error) {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      console.error("Error logging in:", error);
    }
  };
  return user;
};
export { GetUser };
