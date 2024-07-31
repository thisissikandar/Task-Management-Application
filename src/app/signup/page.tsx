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
    fullName: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
      toast.success(response.data.message);
    } catch (error: any) {
      console.log("errmsg", error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.fullName.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="shadow-md w-[500px] h-[400px] p-5 flex flex-col">
        <h1 className="text-2xl font-semibold mb-2">
          {loading ? "Processing" : "Welcome To WorkFlow!"}
        </h1>

        <label htmlFor="fullname">Full Name : </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="fullname"
          type="text"
          value={user.fullName}
          onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          placeholder="FullName"
        />
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
          placeholder="password"
        />
        <button
          onClick={onSignup}
          className="p-2 border font-semibold bg-blue-500 text-white border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          {buttonDisabled ? "No Signup" : "Signup"}
        </button>
        <span>
          Already Have an Account?{" "}
          <Link className="text-blue-500" href="/login">
            Log in
          </Link>
        </span>
      </div>
    </div>
  );
}
