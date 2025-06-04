"use client";

import {
  fetchCommentsByPostId,
  fetchPostById,
  fetchUserById,
} from "@/lib/fakePostsApi";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Post } from "@/types/posts";

interface PostDetailProps {
  postId: number;
}

function PostDetail({ postId }: PostDetailProps) {
  const {
    data: fetchedPost,
    isLoading: isPostLoading,
    isError: isPostError,
    error: postError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  // 수정된 게시글 있으면 로컬에서 덮어쓰기
  const post = useMemo(() => {
    if (!fetchedPost) return null;
    const saved = localStorage.getItem("updatedPosts");
    if (!saved) return fetchedPost;

    try {
      const updatedPosts = JSON.parse(saved) as Post[];
      const localUpdate = updatedPosts.find((p) => p.id === postId);
      return localUpdate ?? fetchedPost;
    } catch (e) {
      console.error("로컬 수정 게시글 파싱 오류", e);
      return fetchedPost;
    }
  }, [fetchedPost, postId]);

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ["user", post?.userId],
    queryFn: () => fetchUserById(post!.userId),
    enabled: !!post,
  });

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    error: commentsError,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchCommentsByPostId(postId),
  });

  if (isPostLoading) return <p>게시글을 불러오는 중...</p>;
  if (isPostError) return <p>에러: {postError.message}</p>;

  if (!post || !user) return <p>게시글을 불러오는 중...</p>;

  return (
    <div className="p-4 space-y-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-gray-700">{post.body}</p>

      <div>
        <h2 className="font-semibold mt-4 text-blue-700">작성자</h2>
        {isUserLoading ? (
          <p>작성자 정보를 불러오는 중...</p>
        ) : isUserError ? (
          <p>에러: {userError.message}</p>
        ) : (
          <p>
            {user.name} ({user.email})
          </p>
        )}
      </div>

      <div>
        <h2 className="font-semibold mt-4 text-blue-700">
          댓글 ({comments?.length || 0})
        </h2>
        {isCommentsLoading ? (
          <p>댓글을 불러오는 중...</p>
        ) : isCommentsError ? (
          <p>에러: {commentsError.message}</p>
        ) : (
          <ul className="list-disc ml-4 space-y-2">
            {comments?.map((comment) => (
              <li key={comment.id}>
                <p className="font-medium">
                  {comment.name} ({comment.email})
                </p>
                <p className="text-sm">{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PostDetail;
