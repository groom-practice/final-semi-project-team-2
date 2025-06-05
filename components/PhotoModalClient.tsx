"use client";
import Modal from "@/components/Modal";
import PhotoDetail from "@/components/PhotoDetail";
import { ImageProps } from "@/types/photos";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PhotoModalClient({ photo }: { photo: ImageProps }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  // 현재 경로가 /photo가 아니면 전체 페이지로 강제 이동
  useEffect(() => {
    if (from === "home") {
      router.replace(`/photo/${photo.id}`);
    }
  }, [from, photo.id, router]);

  return (
    <Modal>
      <PhotoDetail
        src={photo.download_url}
        alt={photo.author}
        photographer={{
          name: photo.author,
        }}
      />
    </Modal>
  );
}
