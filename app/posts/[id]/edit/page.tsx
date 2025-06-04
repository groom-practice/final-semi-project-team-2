"use client";

import PostEditor from "@/components/PostEditor";
import { fetchPostById } from "@/lib/fakePostsApi";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";

function EditPostPage() {
  const { id } = useParams();
  const postId = Number(id);
  const router = useRouter();

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  if (isLoading) return <p> 로딩중... </p>;
  if (isError) return <p> 에러 : {(error as Error).message} </p>;
  if (!post) return <p>post is undefined</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <button
        onClick={() => router.back()}
        className="underline text-slate-500 text-sm mb-4"
      >
        이전 페이지 돌아가기
      </button>
      <h1 className="text-2xl font-bold mb-4">게시글 수정</h1>
      <PostEditor initialPost={post} />
    </div>
  );
}

export default EditPostPage;
