"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logout as apiLogout } from "@/lib/api/clientApi";

export default function AuthNavigation() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const clear = useAuthStore((s) => s.clearIsAuthenticated);

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      // ignore
    }
    clear();
    router.push("/sign-in");
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <span>{user?.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/sign-in">Login</Link>
          </li>
          <li>
            <Link href="/sign-up">Sign up</Link>
          </li>
        </>
      )}
    </>
  );
}
