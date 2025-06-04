"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const getUsersFromLocal = () => {
    // 로컬스토리지 'users' 키에 저장된 JSON 문자열을 파싱, 없으면 빈 배열 반환
    const usersJSON = localStorage.getItem("users") || "[]";
    try {
      return JSON.parse(usersJSON) as {
        id: string;
        pw: string;
        name: string;
      }[];
    } catch {
      // 파싱 에러가 나면 빈 배열로 처리
      return [];
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id === "team2" && pw === "1234") {
      login();
      router.push("/");
    } else {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <>
      <div className="max-w-md mt-10  mx-auto p-4 border border-slate-200 rounded shadow-2xl">
        <h2 className="text-2xl font-semibold mb-4">로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="border px-3 py-2 w-full rounded"
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="border px-3 py-2 w-full rounded"
            />
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full cursor-pointer"
          >
            로그인
          </button>
        </form>
        <div className="text-center mt-4">
          <span>계정이 없으신가요? </span>
          <Link
            href="/signup"
            className=" ml-[10px] text-blue-500 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
}
