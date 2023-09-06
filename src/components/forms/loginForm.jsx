import React, { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        console.log("User registered successfully");
      } else {
        const data = await response.json();
        console.error("Error registering user:", data.error);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
