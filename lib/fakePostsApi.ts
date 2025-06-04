import { Post, User, Comment } from "@/types/posts";
import axios from "axios";

// 페이지 단위로 게시글 목록 fetch
export const fetchPosts = async ({ pageParam = 1 }): Promise<Post[]> => {
  const res = await axios.get<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`
  );
  return res.data;
};

// 게시글 상세페이지 가져오기
export const fetchPostById = async (id: number): Promise<Post> => {
  const res = await axios.get<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return res.data;
};

// 게시글 상세페이지 댓글 가져오기
export const fetchCommentsByPostId = async (
  postId: number
): Promise<Comment[]> => {
  const res = await axios.get<Comment[]>(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  return res.data;
};

// 사용자 id로 유저 정보 가져오기
export const fetchUserById = async (userId: number): Promise<User> => {
  const res = await axios.get<User>(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  return res.data;
};

// 새 게시글 생성
export const createPost = async (newPost: Omit<Post, "id">): Promise<Post> => {
  const res = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    newPost
  );
  return res.data;
};

// 기존 게시글 수정
export const updatePost = async (updatedPost: Post): Promise<Post> => {
  const res = await axios.put(
    `https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`,
    updatedPost
  );
  return res.data;
};

// 게시글 삭제
export const deletePost = async (postId: number): Promise<void> => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
};
