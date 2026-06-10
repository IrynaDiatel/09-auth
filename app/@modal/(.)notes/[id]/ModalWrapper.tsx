"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import type { ReactNode } from "react";

export default function ModalWrapper({ children }: { children: ReactNode }) {
  const router = useRouter();

  return <Modal onClose={() => router.back()}>{children}</Modal>;
}
