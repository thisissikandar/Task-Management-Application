"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Logo() {
  const [data, setData] = useState<any>(null);
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data.data);
    setData(res.data.data);
  };
  useEffect(() => {
    getUserDetails()
  }, [])
  
  return (
    <div>
      {/* <Image height={130} width={130} src={data?.avatar?.url} alt="logo" /> */}
      <p>{data?.fullName}</p>
    </div>
  );
}
