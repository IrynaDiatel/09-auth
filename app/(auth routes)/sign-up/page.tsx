"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignUpPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await register({ email, password });
      setUser(user);
      router.push("/profile");
    } catch (err: any) {
      setError(err?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h1>Sign up</h1>

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

        <button type="submit">Register</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}
export default function SignUpPage() {
  return (
    <main>
      <h1>Sign Up</h1>
      {/* Компонент Sign Up буде реалізований пізніше */}
    </main>
  );
}
