"use client";

import React from "react";
import { setCookie } from "@/cookies/cookiesService";

export default function Logintest() {
  const handleClick = () => {
    console.log("setting cookie");
    setCookie("testcookie5", "tokenabc");
  };

  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
