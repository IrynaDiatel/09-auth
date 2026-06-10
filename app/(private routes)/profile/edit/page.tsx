"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";

export default function EditProfilePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const [username, setUsername] = useState(user?.username || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateMe({ username });
      setUser(updated);
      router.push("/profile");
    } catch (err) {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>

      {user && (
        <div>
          <Image src={user.avatar} alt="avatar" width={120} height={120} />

          <div>
            <label>
              Username:
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>

          <p>Email: {user.email}</p>

          <div>
            <button onClick={handleSave} disabled={saving}>
              Save
            </button>
            <button onClick={() => router.push("/profile")}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
