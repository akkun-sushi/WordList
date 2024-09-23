"use client"

import React from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter()
  router.push("/three")
  return (
    <div className="h-screen">
      HELLO WORLD!
    </div>
  );
};

export default Home;
