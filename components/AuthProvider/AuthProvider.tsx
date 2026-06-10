"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession, getMe } from "@/lib/api/clientApi";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const clear = useAuthStore((s) => s.clearIsAuthenticated);

  useEffect(() => {
    (async () => {
      try {
        const ok = await checkSession();
        if (ok) {
          const user = await getMe();
          setUser(user);
        } else {
          clear();
        }
      } catch (err) {
        clear();
      }
    })();
  }, [setUser, clear]);

  return <>{children}</>;
}
