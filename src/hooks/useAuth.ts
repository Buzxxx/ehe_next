// src/hooks/useAuth.ts
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const  useAuth = function() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/accounts/login"); // Redirect to login if no token is found
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch("/api/accounts/verifyToken", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        localStorage.removeItem("token"); // Remove invalid token
        router.push("/accounts/login"); // Redirect to login on invalid token
      }
    };

    verifyToken();
  }, [router]);

  return isAuthenticated;
};

export default useAuth;
