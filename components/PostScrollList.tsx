"use client";

import { fetchPosts } from "@/lib/fakePostsApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type Props = {
  deletedIds: number[];
};

function PostScrollList({ deletedIds }: Props) {
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts-scroll"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= 10 ? nextPage : undefined;
    },
  });

  useEffect(() => {
    if (!bottomRef.current || !hasNextPage) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [bottomRef, hasNextPage, fetchNextPage]);

  if (isLoading) return <p> Loading... </p>;
  if (isError) return <p> Error : {error.message} </p>;

  return (
    <div className="space-y-4">
      {data?.pages
        .flat()
        .filter((post) => !deletedIds.includes(post.id))
        .map((post) => (
          <div key={post.id} className="p-4 border rounded shadow-sm bg-white">
            <button
              className="font-semibold text-lg text-left cursor-pointer text-gray-900 hover:text-blue-600 transition-all duration-200"
              onClick={() => router.push(`/posts/${post.id}`)}
            >
              {post.title}
            </button>
            <p className="text-sm text-gray-600">{post.body}</p>
          </div>
        ))}
      <div ref={bottomRef} className="h-10" />
      {isFetchingNextPage && <p>Loading more...</p>}
      {!hasNextPage && (
        <p className="text-center text-gray-400">No more posts</p>
      )}
    </div>
  );
}

export default PostScrollList;
