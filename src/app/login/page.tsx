"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Loggin successfull", response);
      toast.success(response.data.message);
      router.push("/");
    } catch (error: any) {
      console.log("login failed", error.response);

      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="shadow-md w-[500px] h-[400px] p-4 flex flex-col">
        <h1 className="text-2xl font-semibold mb-4">
          {loading ? "Processing" : "Welcom To WorkFlow!"}
        </h1>

        <label htmlFor="email">Email :</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter Your Email"
        />
        <label htmlFor="password">Password :</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter Your Password"
        />
        <button
          onClick={onLogin}
          className="p-2 border border-gray-300  bg-blue-500 text-white rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          {buttonDisabled ? "No Login" : "Login"}
        </button>
        <span className="mt-4">
          Dont have an Account? Create a{" "}
          <Link className="text-blue-500" href="/signup">
            new account{" "}
          </Link>
        </span>
      </div>
    </div>
  );
}
