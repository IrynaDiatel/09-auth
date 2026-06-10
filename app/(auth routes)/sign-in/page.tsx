"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignInPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await login({ email, password });
      setUser(user);
      router.push("/profile");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    }
  };

  return (
    <div>
      <h1>Sign in</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Log in</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}
export default function SignInPage() {
  return (
    <main>
      <h1>Sign In</h1>
      {/* Компонент Sign In буде реалізований пізніше */}
    </main>
  );
}
