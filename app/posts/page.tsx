"use client";

import PostButtonList from "@/components/PostButtonList";
import PostScrollList from "@/components/PostScrollList";
import ToggleButton from "@/components/ToggleButton";
import { useEffect, useState } from "react";

function PostListPage() {
  const [isOnScrollMode, setIsOnScrollMode] = useState(false);
  const [deletedIds, setDeletedIds] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("deletedPostIds");
    if (saved) setDeletedIds(JSON.parse(saved));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold my-4">Posts List</h2>
        <div className="flex justify-center items-center">
          <p className="mr-2 text-sm text-slate-500">
            {isOnScrollMode ? "버튼 모드로 돌아가기" : "스크롤 모드 켜기"}
          </p>
          <ToggleButton value={isOnScrollMode} onToggle={setIsOnScrollMode} />
        </div>
      </div>
      {isOnScrollMode ? (
        <PostScrollList deletedIds={deletedIds} />
      ) : (
        <PostButtonList deletedIds={deletedIds} />
      )}
    </div>
  );
}

export default PostListPage;
