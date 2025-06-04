"use client";

import { useParams, useRouter } from "next/navigation";
import PostDetail from "@/components/PostDetail";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";

function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const postId = Number(id);

  if (!id) {
    return (
      <p>
        id를 찾을 수 없습니다.
        <button onClick={() => router.push("/")}> 홈으로 </button>
      </p>
    );
  }

  const handleDelete = (id: number) => {
    const saved = localStorage.getItem("deletedPostIds");
    const parsed = saved ? JSON.parse(saved) : [];
    const updated = [...parsed, id];
    localStorage.setItem("deletedPostIds", JSON.stringify(updated));
  };

  if (isNaN(postId)) return <p> 유효하지 않은 게시글 ID 입니다. </p>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <PostDetail postId={postId} />
      <div className="flex p-4 justify-end">
        <Link
          href={`/posts/${postId}/edit`}
          className="bg-blue-600 text-white text-md px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition-all duration-300 mr-4"
        >
          수정
        </Link>
        <DeleteButton postId={postId} onDeleteSuccess={handleDelete} />
      </div>
    </div>
  );
}

export default PostDetailPage;
