"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Modal({children}: {children: React.ReactNode}){
  const router = useRouter();
  const close = () => {
    router.back();
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === "Escape")
        close();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return(
    <div onClick={close} className="fixed inset-0 z-999 flex justify-center items-center bg-black/60">
      <div onClick={(e) => e.stopPropagation()}
        className="max-w-xl w-full max-h-[800px] p-6 rounded-2xl overflow-y-scroll bg-white">
        {children}
      </div>
    </div>
  )
}