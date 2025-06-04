import { createPost, updatePost } from "@/lib/fakePostsApi";
import { Post } from "@/types/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PostEditorProps = {
  initialPost?: Post;
};

function PostEditor({ initialPost }: PostEditorProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const isEdit = !!initialPost;
  const [title, setTitle] = useState(initialPost?.title || "");
  const [body, setBody] = useState(initialPost?.body || "");

  const mutation = useMutation({
    mutationFn: (post: Post | Omit<Post, "id">) =>
      isEdit ? updatePost(post as Post) : createPost(post as Omit<Post, "id">),

    onSuccess: () => {
      alert(isEdit ? "수정 성공" : "작성 성공");
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      // 로컬에 수정된 게시글 저장
      if (isEdit && initialPost) {
        const saved = localStorage.getItem("updatedPosts");
        const parsed: Post[] = saved ? JSON.parse(saved) : [];
        const filtered = parsed.filter((p) => p.id !== initialPost.id);
        const updated = [...filtered, { ...initialPost, title, body }];
        localStorage.setItem("updatedPosts", JSON.stringify(updated));
      }

      router.push("/posts");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit && initialPost) {
      mutation.mutate({
        ...initialPost,
        title,
        body,
      });
    } else {
      mutation.mutate({
        userId: 1,
        title,
        body,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full"
        placeholder="내용"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        {isEdit ? "수정" : "작성"}
      </button>
      {mutation.error && (
        <p className="text-red-500">{(mutation.error as Error).message}</p>
      )}
    </form>
  );
}

export default PostEditor;
