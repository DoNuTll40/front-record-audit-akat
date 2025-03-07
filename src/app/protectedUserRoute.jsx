"use client"

import AuthHook from "@/hooks/AuthHook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingPage from "./loading";
import ThemeHook from "@/hooks/ThemeHook";

export default function ProtectedUserRoute({ children }) {
  const { user, loading } = AuthHook();
  const { theme } = ThemeHook();
  const router = useRouter();

  useEffect(() => {

    if (!loading && (!user || !user.position)) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingPage />;
  }

  return user ? <>{children} </>: null;
}
