"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function NavbarRoutes() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex gap-x-2 ml-auto">
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
