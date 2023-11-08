import { useEffect, useState } from "react";

const GetUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      verifyUser(storedToken).then();
    } else {
      setUser("no");
    }
  }, []);

  const verifyUser = async (token) => {
    try {
      const response = await fetch(`/api/verifyUser?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setUser(await response.json());
      } else {
        localStorage.removeItem("token");
        console.error("Error", await response.json());
      }
    } catch (error) {
      localStorage.removeItem("token");
      console.error("Error logging in:", error);
    }
  };
  return user;
};

export { GetUser };
