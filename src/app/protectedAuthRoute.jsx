"use client"

import AuthHook from "@/hooks/AuthHook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingPage from "./loading";

export default function ProtectedAuthRoute({ children }) {
  const { loading, user } = AuthHook();
  const router = useRouter();
  
  useEffect(() => {
    if (loading) return;

    if (user?.status) {
      const path = user.status.toLowerCase();
      router.push(`/${path}`);
    }
  }, [loading, router, user]);

  if (loading) {
    return <LoadingPage />;
  }

  return user ? <>{children}</> : <>{children}</>;
}
