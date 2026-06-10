import Link from "next/link";
import Image from "next/image";
import { getMe } from "@/lib/api/serverApi";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Profile | NoteHub",
    description: "User profile page",
  };
}

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <main>
      <div>
        <h1>Profile Page</h1>
        <Link href="/profile/edit">Edit Profile</Link>
      </div>

      <div>
        <Image src={user.avatar} alt="User Avatar" width={120} height={120} />
      </div>

      <div>
        <p>
          <strong>Username: </strong>
          {user.username}
        </p>

        <p>
          <strong>Email: </strong>
          {user.email}
        </p>
      </div>
    </main>
  );
}
